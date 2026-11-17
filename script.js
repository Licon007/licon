function start(D){
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function skFix(a){return Array.isArray(a)&&a.length?a.map(function(r){return [esc(r[0]),esc(r[1]),Math.max(0,Math.min(100,+r[2]||0)),r[3]==='learn'?'learn':'']}):null}

document.getElementById('root').appendChild(document.getElementById('shell').content.cloneNode(true));
// Nome com entrada letra a letra (uma única animação de abertura)
(function(){var parts=['Licon Abrão','Nhatave'],i=0;
document.querySelectorAll('h1 span').forEach(function(s,k){
parts[k].split('').forEach(function(ch){var b=document.createElement('b');b.textContent=ch===' '?'\u00a0':ch;b.style.setProperty('--i',i++);s.appendChild(b)})})})();
// Faixa de áreas
var areas=['Identidade visual','Design gráfico','Modelação 3D','UI / UX','HTML · CSS · JavaScript','Design editorial'];
document.getElementById('tk').innerHTML=areas.concat(areas).concat(areas).concat(areas).map(function(a){return '<span>'+a+'</span>'}).join('');
// Habilidades (CV) + web
var sk=skFix(D.sk)||[['Photoshop','Ps',92,''],['Illustrator','Ai',85,''],['InDesign','Id',85,''],['After Effects','Ae',15,'learn'],['Figma','UI/UX',50,'learn'],['Blender','3D',70,''],['HTML','estrutura',80,''],['CSS','estilo',75,''],['JavaScript','interação',55,'learn']];
var cols=document.getElementById('cols');
sk.forEach(function(s){var d=document.createElement('div');d.className='col '+s[3];
d.innerHTML='<div class="bar" role="img" aria-label="'+s[0]+' '+s[2]+'%"><i style="--v:'+s[2]+'%"></i></div><b>'+s[0]+'</b><span>'+s[1]+'</span>';cols.appendChild(d)});
var cs=cols.children,io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Array.prototype.forEach.call(cs,function(c,i){setTimeout(function(){c.classList.add('on')},i*90)});io.disconnect()}})},{threshold:.3});
io.observe(cols);
// Código a ser escrito (uma vez)
var src='<span class="c">/* a ideia ganha vida no navegador */</span>\n<span class="k">const</span> ideia = <span class="s">"a tua marca"</span>;\n<span class="k">const</span> resultado = design(ideia)\n  .com(<span class="s">"HTML"</span>, <span class="s">"CSS"</span>, <span class="s">"JavaScript"</span>)\n  .e(<span class="s">"cuidado em cada detalhe"</span>);';
var pre=document.getElementById('code'),plain=src.replace(/<[^>]+>/g,'');
function typeIn(){var n=0,t=setInterval(function(){n+=2;
var shown=plain.slice(0,n),out='',pos=0,tagRe=/<[^>]+>/g,m,idx=0;
// reconstruir o HTML colorido até n caracteres visíveis
var vis=0,html='',re=/(<[^>]+>)|([^<])/g;
while((m=re.exec(src))&&vis<n){if(m[1])html+=m[1];else{html+=m[2];vis++}}
var open=(html.match(/<span/g)||[]).length-(html.match(/<\/span>/g)||[]).length;
for(var i=0;i<open;i++)html+='</span>';
pre.innerHTML=html+'<span class="caret"></span>';
if(n>=plain.length){clearInterval(t)}},28)}
var cio=new IntersectionObserver(function(es){if(es[0].isIntersecting){if(matchMedia('(prefers-reduced-motion: reduce)').matches){pre.innerHTML=src}else typeIn();cio.disconnect()}},{threshold:.5});
cio.observe(pre);
// Slots de foto: troca src pelo caminho da tua imagem no projecto final (data-src)
function slotHTML(l){return '<label class="slot" data-src=""><input type="file" accept="image/*" aria-label="Adicionar foto: '+l+'"><span>+ Adicionar foto<small>'+l+'</small></span></label>'}
function fill(s,url,is3d){s.classList.add('has');s.querySelector('span')&&s.querySelector('span').remove();var o=s.querySelector('img,model-viewer,video');o&&o.remove();
if(is3d===2){var v=document.createElement('video');v.src=url;v.autoplay=v.loop=v.muted=v.playsInline=true;v.setAttribute('muted','');s.appendChild(v)}else if(is3d){if(!window.mvLoaded){var sc=document.createElement('script');sc.type='module';sc.src='https://cdn.jsdelivr.net/npm/@google/model-viewer@3.5.0/dist/model-viewer.min.js';document.head.appendChild(sc);window.mvLoaded=1}
var m=document.createElement('model-viewer');m.setAttribute('src',url);m.setAttribute('camera-controls','');m.setAttribute('auto-rotate','');m.setAttribute('shadow-intensity','1');m.setAttribute('camera-orbit','0deg 80deg auto');m.setAttribute('interaction-prompt','none');m.setAttribute('disable-zoom','');m.setAttribute('loading','eager');m.setAttribute('alt','Modelo 3D');s.appendChild(m)}
else{var i=document.createElement('img');i.alt='';i.src=url;s.appendChild(i)}}
document.addEventListener('change',function(e){var inp=e.target,s=inp.closest&&inp.closest('.slot');if(!s||!inp.files[0])return;var f=inp.files[0];if(window.upl){window.upl(s,f);return}
if(/\.(glb|gltf)$/i.test(f.name)){fill(s,URL.createObjectURL(f),true)}else{var r=new FileReader();r.onload=function(){fill(s,r.result,false)};r.readAsDataURL(f)}});
document.querySelectorAll('.slot[data-src]').forEach(function(s){var a=s.dataset.src,b=s.dataset['3d'];if(b)fill(s,b,true);else if(a)fill(s,a,false)});
// Páginas de projecto (rotas por #projeto-nome)
var P=[{id:'app',t:'App de Roupas e Acessórios',c:'UI / UX · Comércio de moda',d:'Design de interface (UI/UX) para um aplicativo de e-commerce de moda. Foco numa jornada do cliente intuitiva, com estética moderna e navegação fluida.',o:'Explorar uma experiência de compra digital para moda, tornando a descoberta de peças e o acesso à informação do produto simples e directos.',a:'A interface organiza-se em torno de uma peça em destaque, informação essencial de produto e uma chamada de descoberta.',r:'Escreve aqui o resultado ou o que aprendeste com este projecto.'},
{id:'cafe',t:'Identidade Visual para Café',c:'Identidade · Café artesanal',d:'Desenvolvimento de marca para um café artesanal: logotipo, aplicação em embalagens, roupas de trabalho e papelaria.',o:'Investigar uma linguagem visual para café artesanal, com uma embalagem que comunica origem, cuidado e carácter.',a:'Tipografia de presença, tons naturais e aplicações em embalagem e chávena.',r:'Escreve aqui o resultado ou o que aprendeste com este projecto.'},
{id:'livro',t:'Livro de Apresentação',c:'Editorial · Publicação institucional',d:'Material institucional que une fotografia industrial e textos técnicos, com uma hierarquia visual clara e vibrante.',o:'Dar forma a uma publicação que equilibre conteúdo técnico e imagem, guiando a leitura com clareza.',a:'Capas, contraste tipográfico e blocos de imagem como ponto de partida editorial.',r:'Escreve aqui o resultado ou o que aprendeste com este projecto.'}];
P.forEach(function(p){var o=(D.pj||{})[p.id];if(o)for(var k in o)if(k.length===1&&'tcdoar'.indexOf(k)>-1)p[k]=esc(o[k])});
document.querySelectorAll('.proj a').forEach(function(a,i){var p=P[i],b=(D.pj||{})[p.id];a.querySelector('h3').innerHTML=p.t;if(b&&b.b)a.querySelector('p').textContent=b.b});
document.getElementById('pages').innerHTML=P.map(function(p,i){var n=P[(i+1)%P.length];return '<article class="wrap pg" id="projeto-'+p.id+'" hidden><a class="back" href="#projetos">← Todos os projectos</a><div class="tag">'+p.c+'</div><h1>'+p.t+'</h1><p class="sub" contenteditable="true" spellcheck="false">'+p.d+'</p>'+
'<div class="meta"><div><h4>Objectivo</h4><p>'+p.o+'</p></div><div><h4>Abordagem</h4><p>'+p.a+'</p></div>'+(p.r&&p.r.indexOf('Escreve aqui')<0?'<div><h4>Resultado</h4><p>'+p.r+'</p></div>':'')+'</div>'+
'<div class="gal">'+slotHTML('Imagem principal')+slotHTML('Detalhe 1')+slotHTML('Detalhe 2')+slotHTML('Detalhe 3')+slotHTML('Detalhe 4')+'</div>'+
'<p class="hint">Clica num espaço para pré-visualizar uma foto. No site final, coloca o caminho da imagem em data-src de cada espaço.</p>'+
'<div class="next"><a href="#projetos">← Voltar</a><a href="#projeto-'+n.id+'">Próximo: '+n.t+' →</a></div></article>'}).join('');
function route(){var h=location.hash.slice(1),p=h&&document.getElementById(h),isP=!!(p&&h.indexOf('projeto-')==0);
document.querySelector('main').hidden=isP;document.querySelectorAll('.pg').forEach(function(x){x.hidden=!(isP&&x===p)});
if(isP)window.scrollTo(0,0);else if(p)p.scrollIntoView()}
addEventListener('hashchange',route);route();
var TXT={'Frase de abertura':'.lead','Título do percurso':'#sobre h2','Texto do percurso':'#sobre .sub','Título das habilidades':'#habilidades h2','Texto das habilidades':'#habilidades .sub','Frase sobre código':'.note','Título dos projectos':'#projetos h2','Título do contacto':'#contacto h2','Texto do contacto':'#contacto .sub'};
function em(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/\*([^*]+)\*/g,'<em>$1</em>')}
function setTxt(k,v){var e=document.querySelector(TXT[k]);if(!e)return;if(k==='Frase de abertura')e.innerHTML=em(v);else e.textContent=v}
Object.keys(D.txt||{}).forEach(function(k){setTxt(k,D.txt[k])});
document.getElementById('fig').dataset.key='hero';
document.querySelectorAll('.pg').forEach(function(a){a.querySelectorAll('.slot').forEach(function(s,i){s.dataset.key='p:'+a.id+':'+i})});
document.querySelectorAll('[contenteditable]').forEach(function(e){e.removeAttribute('contenteditable')});
document.querySelectorAll('.slot[data-key]').forEach(function(s){var o=(D.img||{})[s.dataset.key];if(o&&/^uploads\/[\w.-]+$/.test(o.u)){fill(s,o.u,o.m);if(s.id==='fig')document.querySelector('.hero').classList.add('pic')}});
var mb=document.querySelector('.menu'),nv=document.querySelector('header nav');
mb.onclick=function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'Fechar':'Menu'};
nv.addEventListener('click',function(e){if(e.target.tagName==='A'){nv.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.textContent='Menu'}});
// Contacto
document.getElementById('y').textContent=new Date().getFullYear();
document.getElementById('f').addEventListener('submit',function(e){e.preventDefault();
var n=document.getElementById('n').value.trim(),m=document.getElementById('m').value.trim(),fb=document.getElementById('fb');
if(!n||!m){fb.textContent='Escreve o teu nome e uma breve mensagem para continuar.';return}
window.open('https://api.whatsapp.com/send?phone='+String(D.wa||'258871867072').replace(/\D/g,'')+'&text='+encodeURIComponent('Olá! Chamo-me '+n+', '+m),'_blank','noopener,noreferrer');
fb.textContent='A tua mensagem está pronta no WhatsApp.'});

}
fetch('content.json?v='+Date.now()).then(function(r){return r.ok?r.json():{}}).catch(function(){return {}}).then(start);
