(function(g){
 const rolePermissions={
   SUPER_ADMIN:['*'],
   ADMIN_LOCAL:['usuarios.ver','usuarios.editar','menu.ver','menu.editar','caja.ver','caja.movimientos','reportes.ver','qr.gestion','config.editar'],
   MOZO:['pedidos.ver','pedidos.crear','pedidos.entregar','mesas.ver','chat.usar'],
   COCINA:['pedidos.ver','produccion.cocina','agotados.editar','chat.usar','caja.ver','caja.movimientos'],
   PARRILLA:['pedidos.ver','produccion.parrilla','canales.liberar','agotados.editar','chat.usar','caja.ver','caja.cobrar','caja.movimientos'],
   CAJA:['caja.ver','caja.cobrar','caja.movimientos','cierre_z.editar'],
   CONTADOR:['caja.ver','reportes.ver','contable.ver','cierre_z.ver'],
   DELIVERY:['pedidos.ver','delivery.ver']
 };
 function permissionsFor(role,extra={}){const base=rolePermissions[role]||[];const out={};base.forEach(p=>out[p]=true);Object.assign(out,extra||{});return out;}
 function can(profile,perm){if(!profile)return false;if(profile.rol==='SUPER_ADMIN')return true;return profile.permisos?.['*']===true||profile.permisos?.[perm]===true||(rolePermissions[profile.rol]||[]).includes(perm);}
 g.POS={...(g.POS||{}),permissions:{rolePermissions,permissionsFor,can}};
})(window);
