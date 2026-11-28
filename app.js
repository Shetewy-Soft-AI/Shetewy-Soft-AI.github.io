/* Shetewy | Soft | AI - static site. No server. Progress and notes live in this browser's localStorage. */
var CHANNEL = "https://www.youtube.com/channel/UCXvUgmgFQgakKkluR7Dvdwg";
var GITHUB = "https://github.com/Shetewy-Soft-AI";
var COURSE_REPO = "https://github.com/Shetewy-Soft-AI/shetewy-programming-course";
var LESSON_DIRS = {1:"01-what-is-programming",2:"02-problem-solving",3:"03-algorithm",4:"04-flowchart",5:"05-pseudocode"};
var SECTIONS = [
  {id:"fund", name:"المرحلة 1", en:"Programming Fundamentals", desc:"10 دروس: إزاي الكمبيوتر بينفذ التعليمات، وإزاي نفكر في حل المشكلات قبل ما نكتب كود."},
  {id:"py", name:"المرحلة 2", en:"Python Basics", desc:"25 درس: أول كود حقيقي، المتغيرات والشروط والتكرار والدوال، وتمارين ومشروع صغير."},
  {id:"adv", name:"ما بعد الأساسيات", desc:"قادم بعد الأساسيات: تنظيم الكود، OOP، وأنماط التصميم (Design Patterns)."}
];
var LESSONS = [
  {n:1, sec:"fund", title:"يعني إيه برمجة؟", sub:"What is Programming", vid:"uh1EDLo8qHg"},
  {n:2, sec:"fund", title:"Problem Solving: إزاي تفكر قبل ما تكتب كود", sub:"Problem Solving", vid:"K6eDdQ-fS_k"},
  {n:3, sec:"fund", title:"الخوارزمية (Algorithm)", sub:"Algorithm", vid:"K-OFADwP4X0"},
  {n:4, sec:"fund", title:"Flowchart", sub:"Flowchart", vid:"K_OvxoXEeGk"},
  {n:5, sec:"fund", title:"Pseudocode", sub:"Pseudocode", vid:"qIZgCwMRMjI"},
  {n:6, sec:"fund", title:"Programming Languages & Source Code", sub:"Programming Languages & Source Code", vid:null},
  {n:7, sec:"fund", title:"Compiler vs Interpreter + Why Python", sub:"Compiler vs Interpreter + Why Python", vid:null},
  {n:8, sec:"fund", title:"Variables & Data Types (Concept)", sub:"Variables & Data Types (Concept)", vid:null},
  {n:9, sec:"fund", title:"Operators & Conditions (Concept)", sub:"Operators & Conditions (Concept)", vid:null},
  {n:10, sec:"fund", title:"Loops & Functions (Concept)", sub:"Loops & Functions (Concept)", vid:null},
  {n:11, sec:"py", title:"Introduction to Python", sub:"", vid:null},
  {n:12, sec:"py", title:"Installing Python & Setting Up the Environment", sub:"", vid:null},
  {n:13, sec:"py", title:"Your First Python Program", sub:"", vid:null},
  {n:14, sec:"py", title:"Python Syntax (Comments, Indentation, Errors)", sub:"", vid:null},
  {n:15, sec:"py", title:"print() بالتفصيل", sub:"", vid:null},
  {n:16, sec:"py", title:"Variables in Python", sub:"", vid:null},
  {n:17, sec:"py", title:"Data Types Overview + type()", sub:"", vid:null},
  {n:18, sec:"py", title:"Strings (1): الأساسيات والـ Indexing", sub:"", vid:null},
  {n:19, sec:"py", title:"Strings (2): Methods و f-strings", sub:"", vid:null},
  {n:20, sec:"py", title:"Integers and Floats", sub:"", vid:null},
  {n:21, sec:"py", title:"Booleans", sub:"", vid:null},
  {n:22, sec:"py", title:"Type Conversion", sub:"", vid:null},
  {n:23, sec:"py", title:"User Input باستخدام input()", sub:"", vid:null},
  {n:24, sec:"py", title:"Arithmetic Operators", sub:"", vid:null},
  {n:25, sec:"py", title:"Comparison Operators", sub:"", vid:null},
  {n:26, sec:"py", title:"Logical Operators", sub:"", vid:null},
  {n:27, sec:"py", title:"Conditional Statements (1): if / else", sub:"", vid:null},
  {n:28, sec:"py", title:"Conditional Statements (2): elif و Nested if", sub:"", vid:null},
  {n:29, sec:"py", title:"for Loop", sub:"", vid:null},
  {n:30, sec:"py", title:"while Loop", sub:"", vid:null},
  {n:31, sec:"py", title:"break and continue", sub:"", vid:null},
  {n:32, sec:"py", title:"Functions (1): Defining & Calling", sub:"", vid:null},
  {n:33, sec:"py", title:"Functions (2): Parameters and Arguments", sub:"", vid:null},
  {n:34, sec:"py", title:"Functions (3): Return Statement + Scope Basics", sub:"", vid:null},
  {n:35, sec:"py", title:"Basic Problem Solving Exercises + Mini Project", sub:"", vid:null}
];
var LS = {
  get:function(k,d){try{var v=localStorage.getItem("ssa:"+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
  set:function(k,v){try{localStorage.setItem("ssa:"+k,JSON.stringify(v));return true}catch(e){return false}}
};
function $(s,r){return (r||document).querySelector(s)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function T(t){var re=/\(?[A-Za-z][A-Za-z0-9&+()\/.\-]*(?:\s+[A-Za-z(&+][A-Za-z0-9&+()\/.\-]*)*/g,out="",i=0,m;t=String(t);while((m=re.exec(t))){out+=esc(t.slice(i,m.index))+'<bdi dir="ltr">'+esc(m[0])+'</bdi>';i=m.index+m[0].length}return out+esc(t.slice(i))}
function secName(x){return esc(x.name)+(x.en?' · <bdi dir="ltr">'+x.en+'</bdi>':'')}
function lesson(n){return LESSONS.filter(function(l){return l.n===n})[0]}
function done(){return LS.get("done",{})}
function nextOf(n){for(var i=0;i<LESSONS.length;i++){if(LESSONS[i].n>n)return LESSONS[i]}return null}
function firstOpen(){var d=done();for(var i=0;i<LESSONS.length;i++){if(LESSONS[i].vid&&!d[LESSONS[i].n])return LESSONS[i]}return LESSONS[0]}

var app = $("#app");
var ytPlayer = null, tick = null, curVid = null;

function tagFor(l){return l.vid?'<span class="tag live">متاح</span>':'<span class="tag soon">قريبًا</span>'}

function home(){
  var last = LS.get("last",null), l = last&&lesson(last.n), d = done();
  var cnt = Object.keys(d).length, avail = LESSONS.filter(function(x){return x.vid}).length;
  var started = cnt>0 || (last && last.t>5);
  var canResume = l && l.vid && started;
  var cta = canResume ? '<a class="btn" href="#/watch/'+l.n+'">تابع من حيث توقفت</a>' : '<a class="btn" href="#/watch/1">ابدأ التعلّم</a>';
  var thumb = 'https://img.youtube.com/vi/'+LESSONS[0].vid+'/hqdefault.jpg';
  var panel = "";
  if(started){
    panel = '<section class="card resume mini"><div><h3>لوحة المتعلم</h3><p>'+cnt+' من '+avail+' دروس متاحة اكتملت'+(canResume?' · آخر درس: '+l.n+'. '+T(l.title)+(last.t>5?' ('+fmt(last.t)+')':''):'')+'</p><div class="bar"><i style="width:'+(avail?cnt/avail*100:0)+'%"></i></div></div>'+(canResume?'<a class="btn" href="#/watch/'+l.n+'">كمّل</a>':'')+'</section>';
  }
  app.innerHTML =
   '<section class="hero2"><div class="h-text"><h1>اتعلّم مهارات تقنية تبني بيها أفكارك</h1><p>كورسات عملية في البرمجة والذكاء الاصطناعي ومجالات تقنية تانية، من الصفر وبخطوات واضحة.</p></div>'+
   '<a class="preview" href="#/watch/1" aria-label="ابدأ الدرس الأول"><img src="'+thumb+'" alt="الدرس الأول: يعني إيه برمجة؟"><span class="pv-meta"><b dir="ltr">Python From Zero</b><small>الدرس 1 · يعني إيه برمجة؟</small></span></a>'+
   '<div class="row h-cta">'+cta+'<a class="btn ghost" href="#courses">استكشف الكورسات</a></div></section>'+
   '<h2 id="courses" class="sh">الكورسات</h2><p class="lead">الكورس الأول متاح الآن، والمزيد قريبًا.</p><div class="courses">'+
   '<article class="card course"><span class="tag live">متاح الآن</span><h3 dir="ltr" style="text-align:right">Python From Zero</h3><p>من أساسيات البرمجة وحل المشكلات لحد أساسيات Python والمشروع الصغير.</p><ul class="meta"><li><b>المستوى:</b> مبتدئ، من الصفر</li><li><b>الدروس:</b> 35 في مرحلتين</li><li><b>الحالة:</b> '+avail+' دروس متاحة، والباقي بيتنزل تباعًا</li></ul><div class="row"><a class="btn" href="#/watch/'+(canResume?l.n:1)+'">'+(canResume?'تابع من حيث توقفت':'ابدأ التعلّم')+'</a><a class="btn ghost" href="#/curriculum">شوف الدروس</a></div></article>'+
   '<article class="card course dim"><span class="tag soon">قادم · مفيش موعد محدد</span><h3>ما بعد الأساسيات</h3><p>OOP وأنماط التصميم. المحتوى لسه مش متاح.</p></article></div>'+
   panel+
   '<div class="feats">'+
   '<div><b>من الصفر</b><span>بنبدأ بالفكرة قبل الكود.</span></div>'+
   '<div><b>عملي</b><span>مثال وتمرين في الدروس.</span></div>'+
   '<div><b>محفوظ</b><span>تقدمك وملاحظاتك على جهازك.</span></div></div>';
}
function about(){
  app.innerHTML='<h1>عن المؤسسة</h1><div class="card"><p>Shetewy | Soft | AI منصة تعليمية لمهارات تقنية، بتبدأ بالبرمجة والذكاء الاصطناعي وبتشرحهم بشكل مبسط وخطوة بخطوة، لأي حد بيبدأ من الصفر.</p><p>بنبدأ بالفكرة قبل الكود: إزاي نفكر ونحل المشكلة، وبعدها نكتب. كل درس فيه مثال وتمرين، والكود بيتنشر مفتوح على GitHub.</p></div>'+
  '<h2>تقنيات بنهتم بيها</h2><p class="small">Python، JavaScript، TypeScript، Java، C++، Go، PHP، Kotlin، React، Node.js، Django، Spring، Laravel، Flutter، TensorFlow، PyTorch، scikit-learn، pandas. دي مجالات اهتمام المؤسسة، مش قائمة بالمحتوى المتاح حاليًا.</p>';
}
function offer(){
  app.innerHTML='<h1>اللي بنقدمه</h1><div class="grid">'+
  '<div class="card"><h3>دروس فيديو</h3><p>شرح مبسط بالمثال، على قناة YouTube.</p></div>'+
  '<div class="card"><h3>تمارين</h3><p>تمرين في آخر كل درس تجرب فيه الفكرة بنفسك.</p></div>'+
  '<div class="card"><h3>كود مفتوح</h3><p>أي كود بيتكتب في الدروس بيتنشر على GitHub.</p></div>'+
  '<div class="card"><h3>متابعة وملاحظات</h3><p>اكتب ملاحظاتك لكل درس، وكمّل من آخر درس وقفت عنده.</p></div></div>'+
  '<div class="row"><a class="btn" href="'+COURSE_REPO+'" target="_blank" rel="noopener">الكود على GitHub</a><a class="btn ghost" href="'+CHANNEL+'" target="_blank" rel="noopener">القناة على YouTube</a></div>';
}
var curSec = "all";
function curriculum(){
  var tabs='<div class="sec-tabs"><button data-s="all" class="'+(curSec==="all"?'on':'')+'">الكل</button>'+SECTIONS.map(function(s){return '<button data-s="'+s.id+'" class="'+(curSec===s.id?'on':'')+'">'+secName(s)+'</button>'}).join("")+'</div>';
  var out='<h1>المناهج</h1><p class="small">ده التقدم الحالي، وبيتزود مع كل درس جديد.</p>'+tabs+'<div class="timeline">';
  SECTIONS.forEach(function(s){
    if(curSec!=="all"&&curSec!==s.id)return;
    out+='<h2>'+secName(s)+'</h2><p class="small">'+s.desc+'</p>';
    var ls=LESSONS.filter(function(l){return l.sec===s.id});
    if(!ls.length)out+='<div class="card"><p>الدروس هتتضاف لاحقًا.</p></div>';
    ls.forEach(function(l){out+='<a class="card item" style="text-decoration:none" href="#/watch/'+l.n+'"><span class="num">'+l.n+'</span><span style="flex:1">'+T(l.title)+'</span>'+tagFor(l)+'</a>'});
  });
  app.innerHTML=out+'</div>';
  Array.prototype.forEach.call(app.querySelectorAll(".sec-tabs button"),function(b){b.onclick=function(){curSec=b.getAttribute("data-s");curriculum()}});
}
function contact(){
  app.innerHTML='<h1>تواصل</h1><div class="grid"><div class="card"><h3>القناة على YouTube</h3><p>التعليقات تحت الدروس هي أسرع طريق للسؤال.</p><div class="row"><a class="btn" href="'+CHANNEL+'" target="_blank" rel="noopener">افتح القناة</a></div></div>'+
  '<div class="card"><h3>GitHub</h3><p>الكود، وأي ملاحظة أو مشكلة تقدر تفتحها كـ Issue.</p><div class="row"><a class="btn ghost" href="'+GITHUB+'" target="_blank" rel="noopener">حساب المؤسسة</a><a class="btn ghost" href="'+COURSE_REPO+'/issues" target="_blank" rel="noopener">فتح Issue</a></div></div></div>';
}

/* ---------- player ---------- */
var apiReady=false, apiQueue=[];
function loadYT(cb){
  if(window.YT&&window.YT.Player){cb();return}
  apiQueue.push(cb);
  if(apiReady)return; apiReady=true;
  var s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";s.onerror=function(){apiQueue=[];apiQueue.fallback&&apiQueue.fallback()};document.head.appendChild(s);
  window.onYouTubeIframeAPIReady=function(){apiQueue.splice(0).forEach(function(f){f()})};
}
function fmt(t){return Math.floor(t/60)+":"+("0"+Math.floor(t%60)).slice(-2)}
function watch(n){
  var cur = n? lesson(n) : (function(){var l=LS.get("last",null);return (l&&lesson(l.n))||firstOpen()})();
  if(!cur){cur=LESSONS[0]}
  var d=done(), notes=LS.get("notes",{}), nx=nextOf(cur.n);
  function itemHtml(l){return '<a class="item '+(l.n===cur.n?'cur ':'')+(d[l.n]?'done ':'')+(l.vid?'':'off')+'" href="#/watch/'+l.n+'"'+(l.n===cur.n?' aria-current="page"':'')+'><span class="num">'+(d[l.n]?'✓':l.n)+'</span><span style="flex:1">'+T(l.title)+'</span></a>'}
  var list=SECTIONS.map(function(sx){var ls=LESSONS.filter(function(l){return l.sec===sx.id});if(!ls.length)return "";
    var open=ls.some(function(l){return l.n===cur.n})||sx.id==="fund";
    return '<details class="grp"'+(open?' open':'')+'><summary>'+secName(sx)+'</summary>'+ls.map(itemHtml).join("")+'</details>'}).join("")+'<p class="small">الدروس الباهتة لسه ما اتنشرتش، وبتتفتح تباعًا.</p>';
  var last=LS.get("last",null), startAt=(last&&last.n===cur.n)?Math.floor(last.t||0):0;
  app.innerHTML='<div class="layout"><aside><div class="list" id="lessonList">'+list+'</div><p class="small" id="resumeNote"></p></aside><section>'+
   '<p class="eyebrow">مساري · الدرس '+cur.n+'</p><h1>'+T(cur.title)+'</h1>'+
   '<div class="player" id="player">'+(cur.vid?'<div id="yt"></div>':'<p>الدرس ده لسه ما اتنشرش. هيظهر هنا أول ما يتنزل.</p>')+'</div>'+
   (cur.vid?'<p class="small"><a href="https://youtu.be/'+cur.vid+'" target="_blank" rel="noopener">افتح على YouTube</a>'+(LESSON_DIRS[cur.n]?' · <a href="'+COURSE_REPO+'/tree/main/lessons/'+LESSON_DIRS[cur.n]+'" target="_blank" rel="noopener">صفحة الدرس على GitHub</a>':'')+'</p>':'')+
   '<div class="row"><button class="btn" id="doneBtn">'+(d[cur.n]?'علّم الدرس إنه لسه ما اكتملش':'علّمت الدرس إنه اكتمل')+'</button>'+
   (nx?'<a class="btn ghost" id="nextBtn" href="#/watch/'+nx.n+'"><span>الدرس التالي: '+T(nx.title)+'</span></a>':'')+'</div>'+
   '<h3>ملاحظاتي</h3><textarea id="notes" placeholder="اكتب ملاحظاتك على الدرس هنا. بتتحفظ تلقائيًا على جهازك."></textarea><div class="saved" id="saved"></div>'+
   '<div class="row"><button class="btn ghost" id="exp">حفظ نسخة احتياطية</button><label class="btn ghost" for="imp">استرجاع نسخة</label><input id="imp" type="file" accept="application/json" hidden></div>'+
   '<p class="small">الملاحظات والتقدم محفوظين على نفس المتصفح والجهاز بس. لو مسحت بيانات المتصفح هتضيع، فاحفظ نسخة احتياطية.</p>'+
   '</section></div>';
  var ta=$("#notes");ta.value=notes[cur.n]||"";
  var to=null;
  ta.oninput=function(){clearTimeout(to);to=setTimeout(function(){var all=LS.get("notes",{});all[cur.n]=ta.value;$("#saved").textContent=LS.set("notes",all)?"اتحفظت ✓":"مقدرناش نحفظ على المتصفح ده"},400)};
  $("#doneBtn").onclick=function(){var dd=done();if(dd[cur.n])delete dd[cur.n];else dd[cur.n]=true;LS.set("done",dd);watch(cur.n)};
  $("#exp").onclick=function(){var data={v:1,notes:LS.get("notes",{}),done:done(),last:LS.get("last",null)};var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(data)],{type:"application/json"}));a.download="shetewy-progress.json";a.click()};
  $("#imp").onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);LS.set("notes",o.notes||{});LS.set("done",o.done||{});if(o.last&&o.last.n)LS.set("last",o.last);var tn=o.last&&o.last.n?o.last.n:cur.n;skipSave=true;if(location.hash==="#/watch/"+tn)watch(tn);else location.hash="#/watch/"+tn}catch(x){$("#saved").textContent="الملف مش صالح"}};r.readAsText(f)};
  if(!cur.vid)return;
  if(!LS.get("last",null)||LS.get("last").n!==cur.n)LS.set("last",{n:cur.n,t:0});
  if(startAt>5)$("#resumeNote").textContent="هنكمّل من "+fmt(startAt);
  if(location.protocol==="file:"){$("#player").innerHTML='<a href="https://youtu.be/'+cur.vid+'" target="_blank" rel="noopener" style="position:relative;display:block;width:100%;height:100%"><img alt="" src="https://img.youtube.com/vi/'+cur.vid+'/hqdefault.jpg" style="width:100%;height:100%;object-fit:cover"><span class="btn" style="position:absolute;inset:auto 0 12px 0;margin:auto;width:max-content">شغّل على YouTube</span></a>';return}
  var fallback=function(){$("#player").innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+cur.vid+'" allowfullscreen allow="fullscreen; picture-in-picture"></iframe>'};
  apiQueue.fallback=fallback;
  loadYT(function(){
    if(ytPlayer&&ytPlayer.destroy){try{ytPlayer.destroy()}catch(e){}}
    ytPlayer=new YT.Player("yt",{videoId:cur.vid,width:"100%",height:"100%",playerVars:{start:startAt,rel:0,playsinline:1,hl:"ar"},events:{onStateChange:function(ev){if(ev.data===0){var dd=done();dd[cur.n]=true;LS.set("done",dd);LS.set("last",{n:nx?nx.n:cur.n,t:0})}}}});
  });
  curVid=cur.n;clearInterval(tick);
  tick=setInterval(function(){try{if(ytPlayer&&ytPlayer.getCurrentTime&&ytPlayer.getPlayerState()===1){LS.set("last",{n:cur.n,t:ytPlayer.getCurrentTime()})}}catch(e){}},5000);
  window.addEventListener("pagehide",function(){try{if(ytPlayer&&ytPlayer.getCurrentTime){var t=ytPlayer.getCurrentTime();if(t>1&&[1,2,3].indexOf(ytPlayer.getPlayerState())>-1)LS.set("last",{n:cur.n,t:t})}}catch(e){}},{once:true});
}

/* ---------- router ---------- */
var skipSave=false;
function saveNow(){if(skipSave){skipSave=false;return}try{if(ytPlayer&&ytPlayer.getCurrentTime&&curVid!=null&&[1,2,3].indexOf(ytPlayer.getPlayerState())>-1){var t=ytPlayer.getCurrentTime();if(t>1)LS.set("last",{n:curVid,t:t})}}catch(e){}}
function route(){
  saveNow();curVid=null;clearInterval(tick);
  var h=(location.hash||"#/").replace(/^#\/?/,""), p=h.split("/"), r=p[0]||"home";
  var map={home:home,about:about,offer:offer,curriculum:curriculum,contact:contact};
  if(r==="watch"){watch(p[1]?parseInt(p[1],10):null)}
  else (map[r]||home)();
  Array.prototype.forEach.call(document.querySelectorAll("nav a"),function(a){a.classList.toggle("on",a.getAttribute("data-r")===(map[r]||r==="watch"?r:"home"))});
  $("#nav").classList.remove("open");$("#menuBtn").setAttribute("aria-expanded","false");
  if(location.hash!=="#courses")window.scrollTo(0,0);
}
$("#menuBtn").onclick=function(){var o=$("#nav").classList.toggle("open");this.setAttribute("aria-expanded",o)};
window.addEventListener("hashchange",route);
route();
