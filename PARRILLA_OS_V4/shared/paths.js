(function(g){
  const cfg=g.PARRILLA_OS_CONFIG;
  const pilotLegacy={orders:'comandas_activas',exhausted:'platos_agotados',chat:'mensajes_chat',messages:'mensajes'};
  function path(localId,node){
    localId=localId||cfg.defaultLocalId;
    if(cfg.legacyPilot && localId===cfg.defaultLocalId && pilotLegacy[node]) return pilotLegacy[node];
    const map={
      menu:'menu',cash:'caja_central',orders:'pedidos',qr:'qr',settings:'configuracion',tables:'mesas',channels:'canales',users:'usuarios',audit:'auditoria',notifications:'notificaciones',exhausted:'agotados',chat:'chat'
    };
    return `${cfg.dataRoot}/locales/${localId}/${map[node]||node}`;
  }
  const master=node=>`${cfg.dataRoot}/${node}`;
  g.POS={...(g.POS||{}),paths:{path,master}};
})(window);
