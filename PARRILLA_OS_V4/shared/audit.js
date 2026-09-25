(function(g){
 async function log(localId,accion,modulo,detalle={}){
  const p=g.POS.session?.current?.()||{};
  const row={timestamp:Date.now(),usuarioUid:p.uid||'pilot',usuario:p.nombre||'Piloto',rol:p.rol||'PILOT',localId:localId||p.localId||g.POS.config.defaultLocalId,accion,modulo,detalle};
  await g.POS.db.ref(g.POS.paths.master('audit')).push(row);
  return row;
 }
 g.POS={...(g.POS||{}),audit:{log}};
})(window);
