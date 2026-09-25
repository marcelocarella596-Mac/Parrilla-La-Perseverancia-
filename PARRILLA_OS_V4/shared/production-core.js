(function(root,factory){
 const api=factory(); if(typeof module==='object'&&module.exports)module.exports=api; if(root)root.POSProduction=api;
})(typeof window!=='undefined'?window:null,function(){
 const norm=s=>(s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const PARRILLA_BASE=['asado','vacio','bife','entrana','bondiola','chorizo','morcilla','chinchulin','molleja','matambre','pollo','costillita','ojo de bife','tira de asado','parrillada','rinon','choripan','morcipan','provoleta'];
 const COCINA_PURA=['milanesa','suprema','pechuga','tortilla','raviol','tallarin','albondiga','hamburguesa','revuelto','gramajo','sandwich de milanesa','sandwich milanesa'];
 function garnish(n){
   if(/(?:c\/|con)\s*(?:papas\s*)?fritas?/.test(n)||n.includes('papas fritas'))return{nombre:'Fritas',clave:'FRITAS'};
   if(/(?:c\/|con)\s*pure/.test(n))return{nombre:'Puré',clave:'PURE'};
   if(/(?:c\/|con)\s*ensalada/.test(n))return{nombre:'Ensalada',clave:'ENSALADA'};
   return null;
 }
 function stripGarnish(name,g){let t=(name||'').trim();if(!g)return t;if(g.clave==='FRITAS')t=t.replace(/\s+(?:c\/|con)\s*(?:papas\s*)?fritas?/i,'').replace(/\s+papas\s+fritas/i,'').trim();if(g.clave==='PURE')t=t.replace(/\s+(?:c\/|con)\s*pur[eé]/i,'').trim();if(g.clave==='ENSALADA')t=t.replace(/\s+(?:c\/|con)\s*ensalada.*$/i,'').trim();return t||name;}
 function resolve(nombre,categoria='',override=''){
   const original=(nombre||'').trim(),n=norm(original),cat=norm(categoria),ov=(override||'').toUpperCase(),g=garnish(n);
   if(ov==='COCINA')return{tipo:'COCINA',sincronizar:false,componentes:[{nombre:original,estacion:'COCINA'}],sectoresRequeridos:['COCINA']};
   if(ov==='PARRILLA')return{tipo:'PARRILLA',sincronizar:false,componentes:[{nombre:original,estacion:'PARRILLA'}],sectoresRequeridos:['PARRILLA']};
   if(COCINA_PURA.some(k=>n.includes(k)))return{tipo:'COCINA',sincronizar:false,componentes:[{nombre:original,estacion:'COCINA'}],sectoresRequeridos:['COCINA']};
   const parr=PARRILLA_BASE.some(k=>n.includes(k))||cat==='parrilla';
   if(parr&&g)return{tipo:'MIXTA',sincronizar:true,componentes:[{nombre:stripGarnish(original,g),estacion:'PARRILLA',rol:'principal'},{nombre:g.nombre,estacion:'COCINA',rol:'guarnicion'}],sectoresRequeridos:['PARRILLA','COCINA']};
   if(parr)return{tipo:'PARRILLA',sincronizar:false,componentes:[{nombre:original,estacion:'PARRILLA'}],sectoresRequeridos:['PARRILLA']};
   return{tipo:'COCINA',sincronizar:false,componentes:[{nombre:original,estacion:'COCINA'}],sectoresRequeridos:['COCINA']};
 }
 function prepare(product,qty=1){const r=resolve(product.nombre||product.n,product.categoria||product.cat,product.estacionOverride);const now=Date.now();const sectores={};if(r.sectoresRequeridos.includes('PARRILLA'))sectores.parrilla={requerido:true,estado:'PENDIENTE'};if(r.sectoresRequeridos.includes('COCINA'))sectores.cocina={requerido:true,estado:'PENDIENTE'};return{itemId:'itm_'+now+'_'+Math.random().toString(36).slice(2,8),nombre:product.nombre||product.n,n:product.nombre||product.n,cantidad:qty,precio:Number(product.precio||product.p||0),p:Number(product.precio||product.p||0),categoria:product.categoria||product.cat||'',cat:product.categoria||product.cat||'',tipoProduccion:r.tipo,sincronizar:r.sincronizar,componentes:r.componentes,sectores,estadoPlato:'PENDIENTE',estadoItem:'PENDIENTE',timestampItem:now};}
 function sectorState(it,sector){sector=sector.toUpperCase();const r=resolve(it.nombre||it.n,it.categoria||it.cat,it.estacionOverride);if(!r.sectoresRequeridos.includes(sector))return'NO_REQUERIDO';const saved=it.sectores?.[sector.toLowerCase()]?.estado;if(saved)return saved.toUpperCase();if((it.estadoItem||'').toUpperCase()==='MANOS_EN_MESA')return'MANOS_EN_MESA';if(!r.sincronizar&&(it.estadoItem||'').toUpperCase()==='ENTREGADO_SECTOR')return'MANOS';return'PENDIENTE';}
 function plateState(it){const r=resolve(it.nombre||it.n,it.categoria||it.cat,it.estacionOverride);if((it.estadoItem||'').toUpperCase()==='MANOS_EN_MESA')return'MANOS_EN_MESA';if(!r.sincronizar){const s=sectorState(it,r.sectoresRequeridos[0]);return['MANOS','MANOS_EN_MESA'].includes(s)?'MANOS':'PENDIENTE';}const p=sectorState(it,'PARRILLA'),c=sectorState(it,'COCINA'),po=['MANOS','MANOS_EN_MESA'].includes(p),co=['MANOS','MANOS_EN_MESA'].includes(c);if(po&&co)return'MANOS';if(po)return'ESPERANDO_COCINA';if(co)return'ESPERANDO_PARRILLA';return'PENDIENTE';}
 return{norm,PARRILLA_BASE,COCINA_PURA,resolve,prepare,sectorState,plateState};
});
