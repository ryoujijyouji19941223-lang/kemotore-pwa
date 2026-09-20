const CACHE="kemotore-v8-guided-core-three";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-180.png","./assets/trainers/shadow.webp","./assets/trainers/run.webp","./assets/trainers/gou.webp"];
const VOICES=["./voices/cat_greet_0.wav","./voices/cat_greet_1.wav","./voices/cat_greet_2.wav","./voices/cat_greet_3.wav","./voices/cat_greet_4.wav","./voices/cat_greet_5.wav","./voices/cat_greet_6.wav","./voices/cat_greet_7.wav","./voices/cat_greet_8.wav","./voices/cat_greet_9.wav","./voices/cat_greet_10.wav","./voices/cat_greet_11.wav","./voices/cat_greet_12.wav","./voices/cat_greet_13.wav","./voices/cat_greet_14.wav","./voices/cat_greet_15.wav","./voices/cat_start_0.wav","./voices/cat_start_1.wav","./voices/cat_start_2.wav","./voices/cat_start_3.wav","./voices/cat_start_4.wav","./voices/cat_start_5.wav","./voices/cat_start_6.wav","./voices/cat_start_7.wav","./voices/cat_start_8.wav","./voices/cat_during_0.wav","./voices/cat_during_1.wav","./voices/cat_during_2.wav","./voices/cat_during_3.wav","./voices/cat_during_4.wav","./voices/cat_during_5.wav","./voices/cat_during_6.wav","./voices/cat_during_7.wav","./voices/cat_during_8.wav","./voices/cat_finishSet_0.wav","./voices/cat_finishSet_1.wav","./voices/cat_finishSet_2.wav","./voices/cat_finishSet_3.wav","./voices/cat_finishSet_4.wav","./voices/cat_finishSet_5.wav","./voices/cat_finishSet_6.wav","./voices/cat_finishSet_7.wav","./voices/cat_finishSet_8.wav","./voices/cat_finishWorkout_0.wav","./voices/cat_finishWorkout_1.wav","./voices/cat_finishWorkout_2.wav","./voices/cat_finishWorkout_3.wav","./voices/cat_finishWorkout_4.wav","./voices/cat_finishWorkout_5.wav","./voices/cat_finishWorkout_6.wav","./voices/cat_finishWorkout_7.wav","./voices/cat_finishWorkout_8.wav","./voices/cat_finishWorkout_9.wav","./voices/cat_finishWorkout_10.wav","./voices/cat_finishWorkout_11.wav","./voices/cat_rankUp_1.wav","./voices/cat_rankUp_2.wav","./voices/cat_rankUp_3.wav","./voices/cat_rankUp_4.wav","./voices/cat_rankUp_5.wav","./voices/dog_greet_0.wav","./voices/dog_greet_1.wav","./voices/dog_greet_2.wav","./voices/dog_greet_3.wav","./voices/dog_greet_4.wav","./voices/dog_greet_5.wav","./voices/dog_greet_6.wav","./voices/dog_greet_7.wav","./voices/dog_greet_8.wav","./voices/dog_greet_9.wav","./voices/dog_greet_10.wav","./voices/dog_greet_11.wav","./voices/dog_greet_12.wav","./voices/dog_greet_13.wav","./voices/dog_greet_14.wav","./voices/dog_greet_15.wav","./voices/dog_start_0.wav","./voices/dog_start_1.wav","./voices/dog_start_2.wav","./voices/dog_start_3.wav","./voices/dog_start_4.wav","./voices/dog_start_5.wav","./voices/dog_start_6.wav","./voices/dog_start_7.wav","./voices/dog_start_8.wav","./voices/dog_during_0.wav","./voices/dog_during_1.wav","./voices/dog_during_2.wav","./voices/dog_during_3.wav","./voices/dog_during_4.wav","./voices/dog_during_5.wav","./voices/dog_during_6.wav","./voices/dog_during_7.wav","./voices/dog_during_8.wav","./voices/dog_finishSet_0.wav","./voices/dog_finishSet_1.wav","./voices/dog_finishSet_2.wav","./voices/dog_finishSet_3.wav","./voices/dog_finishSet_4.wav","./voices/dog_finishSet_5.wav","./voices/dog_finishSet_6.wav","./voices/dog_finishSet_7.wav","./voices/dog_finishSet_8.wav","./voices/dog_finishWorkout_0.wav","./voices/dog_finishWorkout_1.wav","./voices/dog_finishWorkout_2.wav","./voices/dog_finishWorkout_3.wav","./voices/dog_finishWorkout_4.wav","./voices/dog_finishWorkout_5.wav","./voices/dog_finishWorkout_6.wav","./voices/dog_finishWorkout_7.wav","./voices/dog_finishWorkout_8.wav","./voices/dog_finishWorkout_9.wav","./voices/dog_finishWorkout_10.wav","./voices/dog_finishWorkout_11.wav","./voices/dog_rankUp_1.wav","./voices/dog_rankUp_2.wav","./voices/dog_rankUp_3.wav","./voices/dog_rankUp_4.wav","./voices/dog_rankUp_5.wav","./voices/bear_greet_0.wav","./voices/bear_greet_1.wav","./voices/bear_greet_2.wav","./voices/bear_greet_3.wav","./voices/bear_greet_4.wav","./voices/bear_greet_5.wav","./voices/bear_greet_6.wav","./voices/bear_greet_7.wav","./voices/bear_greet_8.wav","./voices/bear_greet_9.wav","./voices/bear_greet_10.wav","./voices/bear_greet_11.wav","./voices/bear_greet_12.wav","./voices/bear_greet_13.wav","./voices/bear_greet_14.wav","./voices/bear_greet_15.wav","./voices/bear_start_0.wav","./voices/bear_start_1.wav","./voices/bear_start_2.wav","./voices/bear_start_3.wav","./voices/bear_start_4.wav","./voices/bear_start_5.wav","./voices/bear_start_6.wav","./voices/bear_start_7.wav","./voices/bear_start_8.wav","./voices/bear_during_0.wav","./voices/bear_during_1.wav","./voices/bear_during_2.wav","./voices/bear_during_3.wav","./voices/bear_during_4.wav","./voices/bear_during_5.wav","./voices/bear_during_6.wav","./voices/bear_during_7.wav","./voices/bear_during_8.wav","./voices/bear_finishSet_0.wav","./voices/bear_finishSet_1.wav","./voices/bear_finishSet_2.wav","./voices/bear_finishSet_3.wav","./voices/bear_finishSet_4.wav","./voices/bear_finishSet_5.wav","./voices/bear_finishSet_6.wav","./voices/bear_finishSet_7.wav","./voices/bear_finishSet_8.wav","./voices/bear_finishWorkout_0.wav","./voices/bear_finishWorkout_1.wav","./voices/bear_finishWorkout_2.wav","./voices/bear_finishWorkout_3.wav","./voices/bear_finishWorkout_4.wav","./voices/bear_finishWorkout_5.wav","./voices/bear_finishWorkout_6.wav","./voices/bear_finishWorkout_7.wav","./voices/bear_finishWorkout_8.wav","./voices/bear_finishWorkout_9.wav","./voices/bear_finishWorkout_10.wav","./voices/bear_finishWorkout_11.wav","./voices/bear_rankUp_1.wav","./voices/bear_rankUp_2.wav","./voices/bear_rankUp_3.wav","./voices/bear_rankUp_4.wav","./voices/bear_rankUp_5.wav"];
self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    await Promise.allSettled(CORE.map(u=>c.add(u)));
    // 音声は存在するものだけ先読み(60個でも180個でも失敗を無視)
    await Promise.allSettled(VOICES.map(u=>c.add(u)));
  })());
});
self.addEventListener("activate",e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",e=>{
  const req=e.request;
  if(req.method!=="GET")return;
  e.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached)return cached;
    try{
      const res=await fetch(req);
      if(res&&res.status===200&&new URL(req.url).origin===location.origin){
        const c=await caches.open(CACHE); c.put(req,res.clone());
      }
      return res;
    }catch(err){
      if(req.mode==="navigate"){const idx=await caches.match("./index.html"); if(idx)return idx;}
      throw err;
    }
  })());
});
