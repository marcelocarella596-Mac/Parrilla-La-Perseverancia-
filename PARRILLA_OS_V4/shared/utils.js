(function(g){
  const norm=s=>(s||'').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const money=n=>'$'+Number(n||0).toLocaleString('es-AR');
  const todayStart=()=>{const d=new Date();d.setHours(0,0,0,0);return d.getTime();};
  const monthStart=()=>{const d=new Date();d.setDate(1);d.setHours(0,0,0,0);return d.getTime();};
  const yearStart=()=>{const d=new Date();d.setMonth(0,1);d.setHours(0,0,0,0);return d.getTime();};
  const esc=s=>(s??'').toString().replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const id=(prefix='id')=>prefix+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
  g.POS={...(g.POS||{}),utils:{norm,money,todayStart,monthStart,yearStart,esc,id}};
})(window);
