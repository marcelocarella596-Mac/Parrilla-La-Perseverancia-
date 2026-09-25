(function(g){
 const {db,auth,config}=g.POS;
 let profile=null;
 async function loadProfile(user){
   if(!user){
     if(config.pilotBypassAuth){profile={uid:'pilot',nombre:'Piloto',rol:'SUPER_ADMIN',localId:config.defaultLocalId,permisos:{'*':true}};return profile;}
     return null;
   }
   const s=await db.ref(`${config.dataRoot}/userProfiles/${user.uid}`).once('value');
   profile=s.val(); if(profile) profile.uid=user.uid; return profile;
 }
 function current(){return profile;}
 async function requireSession(requiredPerm){
   if(config.pilotBypassAuth){await loadProfile(null);return profile;}
   return new Promise((resolve,reject)=>auth.onAuthStateChanged(async u=>{
     if(!u){location.href='../auth/login.html';return reject(new Error('Sin sesión'));}
     const p=await loadProfile(u); if(!p||p.activo===false){await auth.signOut();return reject(new Error('Usuario inactivo'));}
     if(requiredPerm&&!g.POS.permissions.can(p,requiredPerm)){return reject(new Error('Sin permiso: '+requiredPerm));}
     resolve(p);
   }));
 }
 async function login(email,password){return auth.signInWithEmailAndPassword(email,password);}
 async function logout(){if(auth)await auth.signOut();location.href='../auth/login.html';}
 g.POS={...(g.POS||{}),session:{loadProfile,requireSession,current,login,logout}};
})(window);
