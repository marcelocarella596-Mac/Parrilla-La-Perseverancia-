(function(g){
 function root(localId){return g.POS.paths.path(localId,'menu');}
 function subscribe(localId,cb){return g.POS.db.ref(root(localId)).on('value',s=>cb(s.val()||{}));}
 async function saveProduct(localId,p){const id=p.id||g.POS.utils.id('prod');const row={id,nombre:p.nombre,precio:Number(p.precio||0),categoria:p.categoria||'otros',subcategoria:p.subcategoria||'',imagen:p.imagen||'',activo:p.activo!==false,orden:Number(p.orden||999),estacionOverride:p.estacionOverride||'',actualizado:Date.now()};await g.POS.db.ref(`${root(localId)}/productos/${id}`).set(row);await g.POS.audit?.log(localId,'GUARDAR_PRODUCTO','MENU',{id,nombre:row.nombre,precio:row.precio});return row;}
 async function setMenuDay(localId,d){return g.POS.db.ref(`${root(localId)}/menu_dia`).set({...d,precio:Number(d.precio||0),activo:d.activo!==false,actualizado:Date.now()});}
 async function setHighlight(localId,id,d){return g.POS.db.ref(`${root(localId)}/destacados/${id}`).set({...d,activo:d.activo!==false,orden:Number(d.orden||0),actualizado:Date.now()});}
 async function toggleExhausted(localId,productName,on){const p=g.POS.paths.path(localId,'exhausted');if(on)return g.POS.db.ref(`${p}/${productName}`).set(true);return g.POS.db.ref(`${p}/${productName}`).remove();}
 g.POS={...(g.POS||{}),menu:{root,subscribe,saveProduct,setMenuDay,setHighlight,toggleExhausted}};
})(window);
