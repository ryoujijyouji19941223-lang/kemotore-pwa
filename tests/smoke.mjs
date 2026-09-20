import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const serviceWorker=fs.readFileSync(new URL('../service-worker.js',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'inline script should exist');

for(const name of ['shadow','run','gou']){
  const imageUrl=new URL(`../assets/trainers/${name}.webp`,import.meta.url);
  assert.ok(fs.existsSync(imageUrl),`${name} trainer image should exist`);
  assert.ok(fs.statSync(imageUrl).size>10_000,`${name} trainer image should not be empty`);
  assert.match(serviceWorker,new RegExp(`assets/trainers/${name}\\.webp`),`${name} image should be cached offline`);
}

class ClassList{
  constructor(){this.values=new Set();}
  add(...v){v.forEach(x=>this.values.add(x));}
  remove(...v){v.forEach(x=>this.values.delete(x));}
  toggle(v,on){if(on===undefined)on=!this.values.has(v);on?this.values.add(v):this.values.delete(v);return on;}
  contains(v){return this.values.has(v);}
}
class Element{
  constructor(id=''){this.id=id;this.classList=new ClassList();this.style={setProperty(k,v){this[k]=v;}};this.dataset={};this.attributes={};this.children=[];this.disabled=false;this._html='';this.textContent='';}
  set innerHTML(v){this._html=String(v);}
  get innerHTML(){return this._html;}
  appendChild(v){this.children.push(v);return v;}
  addEventListener(){}
  setAttribute(k,v){this.attributes[k]=String(v);}
  hasAttribute(k){return Object.hasOwn(this.attributes,k);}
  querySelectorAll(){return [];}
}

const elements=new Map();
for(const id of html.matchAll(/\bid="([^"]+)"/g))elements.set(id[1],new Element(id[1]));
const get=id=>{if(!elements.has(id))elements.set(id,new Element(id));return elements.get(id);};
const dynamic=new Map();
function dataButtons(attr){
  const sources=[...elements.values()].map(e=>e.innerHTML).join('\n');
  const key=attr+'|'+sources;
  if(dynamic.has(key))return dynamic.get(key);
  const out=[];
  const re=new RegExp('<button[^>]*'+attr+'="([^"]+)"[^>]*>','g');
  for(const m of sources.matchAll(re)){
    const el=new Element();
    const prop=attr.replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
    el.dataset[prop]=m[1];out.push(el);
  }
  dynamic.clear();dynamic.set(key,out);return out;
}
const document={
  body:new Element('body'),
  createElement:()=>new Element(),
  querySelector:s=>s.startsWith('#')?get(s.slice(1)):new Element(),
  querySelectorAll:s=>{
    if(s==='[data-effort]')return dataButtons('data-effort');
    return [];
  }
};
const saved=new Map([['kemotore_v1',JSON.stringify({
  level:2,exp:5,totalWorkouts:1,totalReps:10,streak:1,bestStreak:1,lastDate:null,
  affinity:{cat:4,dog:0,bear:0},trainer:'cat',badges:[],tipsSeen:[],customLegacyField:'keep-me',
  settings:{voice:false,sound:false,rest:5,ttsFallback:false,fontScale:'m'}
})]]);
const localStorage={getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,String(v)),removeItem:k=>saved.delete(k)};
const speechSynthesis={getVoices:()=>[],addEventListener(){},cancel(){},speak(){}};
const context={
  console,document,localStorage,speechSynthesis,
  navigator:{serviceWorker:{register:async()=>{}}},window:{addEventListener(){}},location:{reload(){}},
  setTimeout:()=>0,clearTimeout(){},setInterval:()=>1,clearInterval(){},
  AudioContext:class{},webkitAudioContext:class{},SpeechSynthesisUtterance:class{},FileReader:class{},Image:class{},
  Date,Math,JSON,Object,Array,String,Number,Boolean,RegExp,Map,Set,Promise
};
vm.createContext(context);
vm.runInContext(script,context,{filename:'index.html'});

assert.equal(vm.runInContext('state.customLegacyField',context),'keep-me','legacy state fields should survive migration');
assert.match(vm.runInContext("avatarMarkup('cat',false)",context),/assets\/trainers\/shadow\.webp/,'Shadow should use bundled artwork by default');
assert.match(vm.runInContext("avatarMarkup('dog',false)",context),/assets\/trainers\/run\.webp/,'Run should use bundled artwork by default');
assert.match(vm.runInContext("avatarMarkup('bear',true)",context),/assets\/trainers\/gou\.webp/,'Gou should use bundled artwork by default');
vm.runInContext("state.customImg.cat='data:image/png;base64,custom';",context);
assert.match(vm.runInContext("avatarMarkup('cat',false)",context),/data:image\/png;base64,custom/,'custom artwork should still override bundled artwork');
assert.match(get('core3-plan').innerHTML,/腕立て伏せ/);
assert.match(get('core3-plan').innerHTML,/スクワット/);
assert.match(get('core3-plan').innerHTML,/腹筋（クランチ）/);
assert.doesNotMatch(html,/どこを大きく育てたい/,'Core 3 should not ask for a redundant body-part focus');

const core3=vm.runInContext("buildPlan('core3',{})",context);
assert.equal(core3.length,3);
assert.deepEqual([...core3.map(x=>x.key)],['pushup','squat','crunch']);
assert.deepEqual([...core3.map(x=>x.coreArea)],['chest','glutes','core']);

vm.runInContext("startWorkout('core3',{},'基本3種'); showPreparation(true);",context);
assert.equal(vm.runInContext('WO.phase',context),'prepare');
assert.match(get('wo-exname').textContent,/最初は.*腕立て伏せ/);
assert.match(get('wo-focus').textContent,/意識/);
assert.match(get('wo-actions').innerHTML,/この種目をスタート/);
assert.equal(typeof get('wo-start-ex').onclick,'function');
get('wo-start-ex').onclick();
assert.equal(vm.runInContext('WO.phase',context),'exercise');
assert.doesNotMatch(get('wo-actions').innerHTML,/詳しいフォーム/,'form button should live in the top bar');
vm.runInContext('afterExercise(WO.plan[0])',context);
assert.equal(vm.runInContext('WO.phase',context),'prepare','Core 3 should use a self-paced next-exercise screen instead of a forced rest timer');
assert.match(get('wo-exname').textContent,/次は.*スクワット/);

vm.runInContext("startWorkout('hiit',{rounds:2},'HIIT rest test'); WO.idx=1; showRest();",context);
assert.equal(vm.runInContext('WO.timeLeft',context),10,'HIIT rest should be fixed at 10 seconds');
assert.match(get('wo-bubble').textContent,/次は/,'rest screen should explain the next exercise');

vm.runInContext("startWorkout('core3',{},'test'); finishWorkout();",context);
assert.equal(vm.runInContext('state.core3.weekly.glutes',context),1);
assert.equal(vm.runInContext('state.core3.weekly.core',context),1);
assert.equal(vm.runInContext('state.core3.weekly.chest',context),1);
assert.equal(JSON.parse(saved.get('kemotore_v1')).customLegacyField,'keep-me');

vm.runInContext('sheetFree()',context);
assert.match(get('sheet-inner').innerHTML,/ホームへ戻る/,'free menu should have an explicit cancel button');

console.log('PASS: syntax, trainer artwork, offline cache, custom override, legacy storage, fixed Core 3, preparation flow, HIIT rest, free-menu cancel, weekly tracking');
