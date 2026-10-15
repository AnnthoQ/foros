const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],cv=$('#cv');
let sel=null,live=true,rng=null,tm;
const KF=[{opacity:1,transform:'scale(1)'},{opacity:.25,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}];
const WIN=`<div class="mac-window" data-a="1" data-spd="1500" data-dl="250" style="width:100%;min-height:340px;margin:0;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e9e6f7"><div class="mac-bar" style="padding:12px 18px;border-bottom:1px solid #ececf2;font-size:30px;line-height:16px"><span style="display:inline-block;color:#ff5f57">●</span><span style="display:inline-block;color:#febc2e">●</span><span style="display:inline-block;color:#28c840">●</span></div><div class="mac-body" contenteditable="true" style="padding:24px;margin:0"><br></div></div>`;
const SUB=`<div class="sub" style="background:#f3f0ff;border:1px solid #c9c0f5;border-radius:12px;padding:14px;margin:10px 0;color:#2b2650">Bloque interno</div>`;
const SH={none:'none',soft:'0 4px 14px rgba(120,100,200,.12)',strong:'0 22px 45px rgba(120,100,200,.3)'};
const isW=e=>e&&e.classList.contains('mac-window'),body=e=>e.querySelector('.mac-body'),bar=e=>e.querySelector('.mac-bar'),dot=i=>e=>e.querySelectorAll('.mac-bar span')[i];
const self=e=>e,tb=e=>isW(e)?body(e):e;
const P={bg:[self,'backgroundColor'],tx:[tb,'color'],bc:[self,'borderColor'],bw:[self,'borderWidth','px'],rad:[self,'borderRadius','px'],pad:[tb,'padding','px'],w:[self,'width','%'],mh:[self,'minHeight','px'],bbg:[bar,'backgroundColor'],bbc:[bar,'borderBottomColor'],d0:[dot(0),'color'],d1:[dot(1),'color'],d2:[dot(2),'color']};
const R=[['bg','Fondo','color'],['tx','Color de texto','color'],['bc','Borde','color'],['bw','Grosor borde','range',0,10],['rad','Redondeo','range',0,48],['pad','Relleno','range',0,80],['w','Ancho %','range',20,100],['mh','Alto mínimo','range',0,900],['bbg','Fondo barra','color',0,0,1],['bbc','Línea barra','color',0,0,1],['d0','Punto 1','color',0,0,1],['d1','Punto 2','color',0,0,1],['d2','Punto 3','color',0,0,1]];
$('#rows').innerHTML=R.map(([k,l,t,a,b,w])=>`<label class="${w?'wo':''}">${l}<input data-p="${k}" type="${t}"${t=='range'?` min="${a}" max="${b}"`:''}></label>`).join('');
const hex=c=>{const m=c.match(/[\d.]+/g);if(!m||m[3]==='0')return'#ffffff';return'#'+m.slice(0,3).map(v=>(+v|0).toString(16).padStart(2,'0')).join('')};
const curWin=()=>isW(sel)?sel:sel&&sel.closest('.mac-window');
function save(){hist.push();clearTimeout(tm);tm=setTimeout(()=>{try{localStorage.setItem('macb',cv.innerHTML)}catch(e){}},300)}
function anim(){$$('.mac-window').forEach(w=>w.querySelectorAll('.mac-bar span').forEach((s,i)=>{s.getAnimations().forEach(a=>a.cancel());if(live&&w.dataset.a==='1')s.animate(KF,{duration:+w.dataset.spd||1500,delay:i*(+w.dataset.dl||0),iterations:Infinity,easing:'ease-in-out'})}))}
function select(e){sel&&sel.classList.remove('sel');sel=e;$('#props').hidden=!e;$('#none').hidden=!!e;if(e){e.classList.add('sel');sync()}else $('#ttl').textContent='Propiedades'}
function sync(){const w=isW(sel);$('#ttl').textContent=w?'Ventana':'Bloque interno';$$('.wo').forEach(x=>x.hidden=!w);
 $$('[data-p]').forEach(i=>{const k=i.dataset.p;if(k==='sh'){i.value=sel.dataset.sh||'none';return}const[f,pr,u]=P[k],el=f(sel);if(!el)return;
  if(i.type==='color')i.value=hex(getComputedStyle(el)[pr]);else if(u==='%')i.value=parseFloat(el.style.width)||100;else i.value=parseFloat(getComputedStyle(el)[pr])||0});
 if(w){$('#an').checked=sel.dataset.a==='1';$('#sp').value=sel.dataset.spd;$('#dl').value=sel.dataset.dl;$('#sb').checked=bar(sel).style.display!=='none'}}
cv.addEventListener('click',e=>select(e.target.closest('.sub')||e.target.closest('.mac-window')));
cv.addEventListener('input',save);
document.addEventListener('input',e=>{const t=e.target,k=t.dataset.p;if(!sel)return;
 if(k){if(k==='sh'){sel.style.boxShadow=SH[t.value];sel.dataset.sh=t.value}else{const[f,pr,u]=P[k],el=f(sel);el.style[pr]=t.value+(u||'');if(k==='bw')el.style.borderStyle='solid'}save();return}
 const w=curWin();if(!w||!isW(sel))return;
 if(t.id==='an')w.dataset.a=t.checked?'1':'0';if(t.id==='sp')w.dataset.spd=t.value;if(t.id==='dl')w.dataset.dl=t.value;if(t.id==='sb')bar(w).style.display=t.checked?'':'none';
 if(['an','sp','dl','sb'].includes(t.id)){anim();save()}});
$('#live').onchange=e=>{live=e.target.checked;anim()};
$('#add').onclick=()=>{cv.insertAdjacentHTML('beforeend',WIN);select(cv.lastElementChild);anim();save()};
$('#dup').onclick=()=>{const w=curWin();if(!w)return;w.classList.remove('sel');const c=w.cloneNode(true);w.after(c);select(c);anim();save()};
$('#del').onclick=()=>{if(!sel)return;const s=sel;select(null);s.remove();save()};
$('#up').onclick=()=>{const w=curWin();if(w&&w.previousElementSibling){w.previousElementSibling.before(w);save()}};
$('#dn').onclick=()=>{const w=curWin();if(w&&w.nextElementSibling){w.nextElementSibling.after(w);save()}};
$('#th').onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=d?'light':'dark'};
/* ---------- texto enriquecido ---------- */
document.addEventListener('selectionchange',()=>{const s=getSelection();if(!s.rangeCount||!s.anchorNode)return;const n=s.anchorNode.nodeType===1?s.anchorNode:s.anchorNode.parentElement;if(n&&cv.contains(n)&&n.closest('.mac-body'))rng=s.getRangeAt(0).cloneRange()});
const rs=()=>{if(rng){const s=getSelection();s.removeAllRanges();s.addRange(rng)}};
const ex=(c,v)=>{rs();document.execCommand('styleWithCSS',false,c!=='fontSize');document.execCommand(c,false,v||null);save()};
$('#fmt').addEventListener('mousedown',e=>{if(e.target.closest('button'))e.preventDefault()});
$$('#fmt [data-c]').forEach(b=>b.onclick=()=>ex(b.dataset.c));
$('#fc').oninput=e=>ex('foreColor',e.target.value);
$('#hc').oninput=e=>ex('hiliteColor',e.target.value);
$('#ff').onchange=e=>{if(e.target.value)ex('fontName',e.target.value);e.target.value=''};
$('#fs').onchange=e=>{const v=e.target.value;if(!v)return;ex('fontSize',7);$$('font[size="7"]').forEach(f=>{const s=document.createElement('span');s.style.fontSize=v+'px';s.innerHTML=f.innerHTML;f.replaceWith(s)});e.target.value='';save()};
$('#lnk').onclick=()=>{const u=prompt('URL del enlace:','https://');if(u)ex('createLink',u)};
$('#sub').onclick=()=>{if(rng&&cv.contains(rng.startContainer)){ex('insertHTML',SUB+'<br>')}else{const w=curWin()||cv.querySelector('.mac-window');if(w){body(w).insertAdjacentHTML('beforeend',SUB);save()}}};
/* ---------- exportar / importar ---------- */
function build(){const w=document.createElement('div');w.innerHTML=cv.innerHTML;const wins=[...w.children];
 const cfg=wins.map(x=>x.dataset.a==='1'?[+x.dataset.spd,+x.dataset.dl]:0);
 wins.forEach((x,i)=>{[x,...x.querySelectorAll('*')].forEach(n=>{n.removeAttribute('contenteditable');n.classList.remove('sel');if(n.classList.contains('sub'))n.classList.remove('sub');['data-a','data-spd','data-dl','data-sh'].forEach(a=>n.removeAttribute(a));if(!n.getAttribute('class'))n.removeAttribute('class')});if(i<wins.length-1)x.style.marginBottom='18px'});
 const js=($('#rm').checked?"if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;":'')+"var c="+JSON.stringify(cfg)+",k="+JSON.stringify(KF).replace(/"/g,"'")+";this.parentNode.querySelectorAll('.mac-window').forEach(function(w,i){if(!c[i])return;w.querySelectorAll('.mac-bar span').forEach(function(s,j){s.animate(k,{duration:c[i][0],delay:j*c[i][1],iterations:Infinity,easing:'ease-in-out'})})})";
 return '<div class="mac-wrapper" style=\'margin:0 -5px;padding:0;font-family:"Segoe UI",system-ui,sans-serif\'>\n'+w.innerHTML+'\n<img alt="" width="0" height="0" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="display:block;width:0;height:0;border:0" onload="'+js+'">\n</div>'}
$('#exp').onclick=()=>{$('#code').value=build();$('#dlg').showModal()};
$('#rm').onchange=()=>$('#code').value=build();
$('#cl').onclick=()=>$('#dlg').close();
$('#cp').onclick=async()=>{const t=$('#code');try{await navigator.clipboard.writeText(t.value)}catch(e){t.select();document.execCommand('copy')}$('#cp').textContent='¡Copiado!';setTimeout(()=>$('#cp').textContent='Copiar',1500)};
$('#ld').onclick=()=>{const d=new DOMParser().parseFromString($('#code').value,'text/html'),ws=d.querySelectorAll('.mac-window');if(!ws.length){alert('No se encontró ningún .mac-window en el código.');return}
 select(null);cv.innerHTML='';ws.forEach(x=>{const n=document.importNode(x,true);n.dataset.a='1';n.dataset.spd='1500';n.dataset.dl='250';n.style.marginBottom='';const b=body(n);if(b){b.contentEditable='true';b.querySelectorAll('div').forEach(s=>s.classList.add('sub'))}cv.append(n)});anim();save();$('#dlg').close()};
$('#rs0').onclick=()=>{if(confirm('¿Vaciar todo el lienzo?')){select(null);cv.innerHTML='';save()}};
/* ---------- inicio ---------- */
try{const s=localStorage.getItem('macb');if(s)cv.innerHTML=s}catch(e){}
$$('.sel').forEach(x=>x.classList.remove('sel'));
if(!cv.children.length&&!localStorage.getItem('macb'))cv.insertAdjacentHTML('beforeend',WIN);
anim();

/* ---------- historial del lienzo ---------- */
const snap=()=>{const d=document.createElement('div');d.innerHTML=cv.innerHTML;d.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));return d.innerHTML};
const hist={s:[snap()],i:0,t:0,push(){clearTimeout(this.t);this.t=setTimeout(()=>{const h=snap();if(h===this.s[this.i])return;this.s=this.s.slice(0,this.i+1);this.s.push(h);if(this.s.length>60)this.s.shift();this.i=this.s.length-1},400)},
 go(d){clearTimeout(this.t);const n=this.i+d;if(n<0||n>=this.s.length)return;this.i=n;select(null);cv.innerHTML=this.s[n];anim();try{localStorage.setItem('macb',cv.innerHTML)}catch(e){}}};
$('#hu').onclick=()=>hist.go(-1);$('#hr').onclick=()=>hist.go(1);
/* ---------- vista responsive ---------- */
$('#vw').onchange=e=>{cv.style.maxWidth=e.target.value;cv.style.margin=e.target.value?'0 auto':''};
/* ---------- temas rápidos ---------- */
const D=['#ff5f57','#febc2e','#28c840'];
const PRE=[['Lavanda',{bg:'#ffffff',bc:'#e9e6f7',bbg:'#ffffff',bbc:'#ececf2',tx:'#25223d',d:D}],
['Noche',{bg:'#1e1b2e',bc:'#3a3558',bbg:'#17142a',bbc:'#3a3558',tx:'#ece9ff',d:D}],
['Menta',{bg:'#f0fbf6',bc:'#bfe8d4',bbg:'#e1f6ec',bbc:'#bfe8d4',tx:'#17402e',d:['#2fbf8a','#5ad1a6','#8fe3c3']}],
['Atardecer',{bg:'#fff4ec',bc:'#ffd1b3',bbg:'#ffe5d3',bbc:'#ffd1b3',tx:'#5a2a10',d:['#ff7a45','#ffa24d','#ffc94d']}],
['Océano',{bg:'#eef6ff',bc:'#b9d7ff',bbg:'#dcebff',bbc:'#b9d7ff',tx:'#12304f',d:['#3b82f6','#06b6d4','#6366f1']}],
['Mono',{bg:'#ffffff',bc:'#d4d4d8',bbg:'#f4f4f5',bbc:'#d4d4d8',tx:'#18181b',d:['#a1a1aa','#a1a1aa','#a1a1aa']}]];
$('#pre').innerHTML+=PRE.map((p,i)=>`<option value="${i}">${p[0]}</option>`).join('');
const setP=(k,v)=>{const[f,pr,u]=P[k],el=f(sel);if(el)el.style[pr]=v+(u||'')};
$('#pre').onchange=e=>{const p=PRE[e.target.value];e.target.value='';if(!p||!sel)return;const t=p[1];['bg','bc','tx'].forEach(k=>setP(k,t[k]));
 if(isW(sel)){setP('bbg',t.bbg);setP('bbc',t.bbc);t.d.forEach((c,i)=>setP('d'+i,c))}sync();save()};
/* ---------- insertar (imagen, tabla, bloque) ---------- */
const ins=h=>{if(rng&&cv.contains(rng.startContainer))ex('insertHTML',h);else{const w=curWin()||cv.querySelector('.mac-window');if(w){body(w).insertAdjacentHTML('beforeend',h);save()}}};
$('#sub').onclick=()=>ins(SUB+'<br>');
$('#img').onclick=()=>{const u=prompt('URL de la imagen (https://…):','https://');if(u&&u.length>8)ins('<img src="'+u.replace(/"/g,'%22')+'" alt="" style="max-width:100%;border-radius:8px">')};
$('#tbl').onclick=()=>{const v=(prompt('Tamaño de la tabla (filas x columnas):','3x3')||'').match(/(\d+)\D+(\d+)/);if(!v)return;const r=Math.min(+v[1],20),c=Math.min(+v[2],10),td='<td style="border:1px solid #e3dff5;padding:8px">&nbsp;</td>';
 ins('<table style="border-collapse:collapse;width:100%;margin:10px 0">'+('<tr>'+td.repeat(c)+'</tr>').repeat(r)+'</table><br>')};
/* ---------- descargar / guardar proyecto ---------- */
const dl=(n,t,m)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:m}));a.download=n;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
$('#dh').onclick=()=>dl('bloques.html',$('#code').value,'text/html');
$('#dj').onclick=()=>dl('proyecto-bloques.json',JSON.stringify({app:'mac-block-builder',v:1,html:snap()}),'application/json');
$('#ojb').onclick=()=>$('#oj').click();
$('#oj').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const j=JSON.parse(await f.text());if(j.app!=='mac-block-builder')throw 0;select(null);cv.innerHTML=j.html;anim();save();$('#dlg').close()}catch(x){alert('Archivo de proyecto no válido.')}e.target.value=''};
