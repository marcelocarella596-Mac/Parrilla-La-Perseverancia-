(function(g){
  const cfg=g.PARRILLA_OS_CONFIG;
  if(!cfg) throw new Error('Falta shared/config.js');
  if(!firebase.apps.length) firebase.initializeApp(cfg.firebase);
  const db=firebase.database();
  const auth=firebase.auth ? firebase.auth() : null;
  const functions=(firebase.functions && !cfg.pilotBypassAuth) ? firebase.functions() : null;
  g.POS={...(g.POS||{}),config:cfg,db,auth,functions};
})(window);
