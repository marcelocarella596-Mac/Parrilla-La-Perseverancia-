let localId,profile;const base=location.href.replace(/\/qr\/qr-admin\.html.*$/,'/cliente/menu.html');
(async()=>{try{profile=await POS.session.requireSession('qr.gestion');localId=profile.localId||POS.config.defaultLocalId;}catch(e){alert(e.message);}})();
function urlMesa(i){if(localId===POS.config.defaultLocalId)return base+`?mesa=Salon_Mesa_${i}`;return base+`?local=${encodeURIComponent(localId)}&tipo=SALON&id=${i}`;}
function draw(title,url){const d=document.createElement('div');d.className='card';d.innerHTML=`<h3>${title}</h3><div class="q"></div><small>${url}</small>`;list.appendChild(d);new QRCode(d.querySelector('.q'),{text:url,width:150,height:150});}
function renderQR(){list.innerHTML='';for(let i=1;i<=Number(count.value||1);i++)draw('Mesa '+i,urlMesa(i));}
function renderChannels(){list.innerHTML='';['DELIVERY','PICKUP','MOSTRADOR'].forEach(c=>draw(c,base+`?local=${encodeURIComponent(localId)}&tipo=${c}&id=${c}`));}
