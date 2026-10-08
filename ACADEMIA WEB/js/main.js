document.getElementById('year').textContent = new Date().getFullYear();

/* interactive location map */
var academyMapElement = document.getElementById('academy-map');
function initAcademyMap() {
  if (!academyMapElement || academyMapElement.classList.contains('leaflet-container')) {
    return;
  }
  if (typeof L === 'undefined') {
    window.setTimeout(initAcademyMap, 500);
    return;
  }
  var academyMap = L.map(academyMapElement).setView([40.4577206, -3.7010758], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(academyMap);
  L.marker([40.4577206, -3.7010758]).addTo(academyMap)
    .bindPopup('<strong>Yes! La Academia</strong><br>Calle Lazaga, 9 · 28020 Madrid')
    .openPopup();
}
window.addEventListener('load', initAcademyMap);
initAcademyMap();

/* mobile drawer */
var drawer = document.getElementById('drawer');
var menuOpen = document.getElementById('menuOpen');
var menuClose = document.getElementById('menuClose');
var header = document.querySelector('header.nav');
function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 12);
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});
function setDrawerState(isOpen){
  drawer.classList.toggle('open', isOpen);
  drawer.setAttribute('aria-hidden', String(!isOpen));
  menuOpen.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
menuOpen.addEventListener('click', function(){ setDrawerState(true); });
menuClose.addEventListener('click', function(){ setDrawerState(false); });
drawer.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setDrawerState(false); }); });

/* scroll reveal */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.15});
document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

/* frequently asked questions */
document.querySelectorAll('.faq-question').forEach(function(button){
  button.addEventListener('click', function(){
    var answer = document.getElementById(button.getAttribute('aria-controls'));
    var isOpen = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(function(other){
      other.setAttribute('aria-expanded', 'false');
      other.querySelector('span').textContent = '+';
      document.getElementById(other.getAttribute('aria-controls')).hidden = true;
    });
    if(!isOpen){
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span').textContent = '−';
      answer.hidden = false;
    }
  });
});

/* hero chat sequence */
window.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){ document.getElementById('b1').classList.add('show'); }, 300);
  setTimeout(function(){ document.getElementById('t1').classList.add('show'); }, 1000);
  setTimeout(function(){ document.getElementById('t1').classList.remove('show'); document.getElementById('b2').classList.add('show'); }, 1900);
  setTimeout(function(){ document.getElementById('b3').classList.add('show'); }, 2700);
  setTimeout(function(){ document.getElementById('t2').classList.add('show'); }, 3500);
  setTimeout(function(){ document.getElementById('t2').classList.remove('show'); document.getElementById('b4').classList.add('show'); }, 4500);
});

/* marquee content */
var marqueeItems = ["Inglés para niños","Cambridge PET · FCE · CAE · CPE","Business English","Conversación","IELTS","Apoyo escolar","Clases particulares","Francés · Alemán · Italiano · Chino","Inglés online","TOEFL · TOEIC"];
var track = document.getElementById('marqueeTrack');
var html = "";
for(var r=0;r<2;r++){ marqueeItems.forEach(function(t){ html += '<span class="marquee-item"><b>'+t+'</b></span>'; }); }
track.innerHTML = html;

/* course data */
var courses = {
  ninos:[
    {emoji:"",color:"sky",title:"Peques · 6 a 8 años",desc:"Una hora llena de juego, música y manualidades para que hablen inglés sin darse cuenta.",chips:["210€/trimestre","1h × 2 días"]},
    {emoji:"",color:"yellow",title:"Aventureros · 9 a 11 años",desc:"Gramática y vocabulario más avanzados con role-play, diálogos, pequeñas obras de teatro, karaokes, concursos y dibujos animados.",chips:["210€/trimestre","1h × 2 días"]},
    {emoji:"",color:"navy",title:"Pre-adolescentes · 12 a 14 años",desc:"Hablan de lo que les interesa mientras trabajan gramática, expresión oral y comprensión auditiva, ganando confianza.",chips:["210€/trimestre","1h × 2 días"]},
    {emoji:"",color:"sky",title:"Cómo funcionan los grupos",desc:"Clases 100% en inglés con profes nativos y bilingües. Grupos por nivel real (no por edad) tras una prueba gratuita.",details:[["Días","L–X o M–J · 16:30, 17:30 o 18:30"],["Material","25–30€ al año"],["Hermanos/primos","10% todo el año"],["Traes un amigo","10% el 1.er trimestre"],["Familias","Informe detallado cada 3 meses"]]},
    {emoji:"",color:"yellow",title:"Apoyo escolar",desc:"Deberes, estudio y exámenes en todas las asignaturas (mates, lengua, ciencias, inglés...). Individual o en grupos pequeños con 2–3 profes por aula.",details:[["Solo apoyo","210€/trim. (2h/sem) · 220€ de 3.º ESO a Bachillerato"],["Con curso de inglés","148€/trim. (2h/sem)"],["Horas","2, 3, 4, 5 u 8 a la semana"],["Semana de examen","Asistencia gratis la semana previa"],["Horario","L–J 16:30–19:30"]],schedule:true}
  ],
  adultos:[
    {emoji:"",color:"sky",title:"Inglés para adultos",desc:"Speaking, listening, gramática y lectura en sesiones de 1:30h, sin pasar la clase pegado al libro. Entrevista inicial de objetivos y prueba de nivel gratis.",details:[["Frecuencia","2 clases/semana de 1:30h (L–X o M–J)"],["Precio","270€/trim. · 257€ estudiantes y desempleados"],["Material","35–40€ al año"],["Horario","19:00–20:30 · 20:30–22:00"],["Duración","+100 horas lectivas"]]},
    {emoji:"",color:"yellow",title:"Clases particulares",desc:"A tu ritmo: conversación, preparación de exámenes (con profes que han sido examinadores de Cambridge) o inglés de business.",details:[["Precio","Desde 24€/hora"],["Bonos","6, 8, 10, 15 y 20 horas"],["Validez","1 año desde la compra"],["Clases","1h o 1:30h · cancela con 24h"],["Días","Lunes a viernes"]]},
    {emoji:"",color:"navy",title:"Conversación",desc:"Sin libros ni apuntes: un tema nuevo cada día para debatir con tus compañeros, con énfasis en fonética. Requisito: nivel B1 y ganas de hablar.",details:[["Grupo","Máximo 6 alumnos"],["Frecuencia","3h/semana (L–X o M–J)"],["Precio","290€/trim. · 275€ estudiantes y desempleados"],["Horario","19:00–20:30 · 20:30–22:00"]]},
    {emoji:"",color:"sky",title:"Clases online",desc:"Todos los cursos también online: inglés general, exámenes, one-to-one, niños y conversación. En directo por Zoom, sin grabaciones, con plataforma propia de ejercicios.",details:[["Grupos","Máximo 10 personas"],["Precio","270€/trimestre · material incluido"],["Horarios","Lun 19:00 · Mar 20:30 · Mié 10:30 · Jue 19:30"]]}
  ],
  examenes:[
    {emoji:"",color:"navy",title:"Preparación oficial en grupo",desc:"PET, FCE, CAE, CPE, IELTS, Aptis, TOEFL y TOEIC. Técnica de examen desde el primer día, 2 evaluaciones al mes y el último mes solo con exámenes reales.",details:[["Frecuencia","3h/semana en 2 días"],["Precio","270€/trim. · 257€ estudiantes y desempleados"],["Material","35–40€"],["Horarios","L–J, mañanas y tardes"],["Aprobados","90%"]]},
    {emoji:"",color:"sky",title:"Intensivo Cambridge",desc:"PET, FCE, CAE o CPE en 1 mes: grammar week, writing week, exámenes reales desde el día uno y trucos de control del tiempo.",details:[["Duración","32 horas · 2h diarias L–J"],["Precio","240€ · materiales gratis"],["Grupo","3 a 9 alumnos"],["Modalidad","Presencial u online"],["Inicio","Todos los meses · 95% aprobados"]]},
    {emoji:"",color:"yellow",title:"Cambridge Express",desc:"Para quien ya conoce los exámenes o ya lo intentó: de 1 a 3 meses de práctica de examen real en cada clase, para PET, FCE o CAE.",details:[["Precio","268€/trimestre · sin matrícula ni material"],["Frecuencia","3h/sem: 2×1:30h o 1×3h"],["Grupo","Máximo 10 alumnos"],["Horario","19:30–21:00 o 10:00–11:30"]]}
  ],
  empresas:[
    {emoji:"",color:"navy",title:"Inglés para empresas",desc:"Nos desplazamos a tu oficina (o clases en nuestra sede), en grupo o individual: reuniones, conference calls y entorno laboral. Metodologías English for specific purposes e inglés académico, con evaluaciones y control de asistencia.",details:[["Precio","Desde 36€/hora"],["Horario","A demanda"],["Bonificación","Fundación Tripartita"],["Test","Online gratuito"]]},
    {emoji:"",color:"yellow",title:"Business English Bootcamp",desc:"Reuniones, presentaciones y negociaciones con simulaciones prácticas, con profes expertos en Business English.",details:[["Precio","160€ · plazas limitadas"],["Duración","4 sábados intensivos"],["Grupo","Máximo 6 alumnos"],["Incluye","Material exclusivo y desayuno"]]}
  ],
  idiomas:[
    {emoji:"",color:"sky",title:"Francés",desc:"Más de 300 millones de hablantes y un idioma clave en la ONU, la UE o el FMI. Muy asequible si hablas español.",details:[["Frecuencia","2 días · 3h/semana"],["Niveles","A1 a C1"]]},
    {emoji:"",color:"yellow",title:"Alemán",desc:"La puerta a trabajar en Alemania, Austria o Suiza y a empresas con lazos comerciales con países germanohablantes.",details:[["Frecuencia","2 días · 3h/semana"],["Niveles","A1 a C1"]]},
    {emoji:"",color:"navy",title:"Italiano",desc:"Más de 60 millones de hablantes nativos, en el top 20 mundial, y atractivo para tu perfil profesional y de estudios.",details:[["Frecuencia","2 días · 3h/semana"],["Niveles","A1 a C1"]]},
    {emoji:"",color:"sky",title:"Chino",desc:"Más de 1.200 millones de hablantes y cada vez más oportunidades laborales, también en España.",details:[["Frecuencia","2 días · 3h/semana"],["Niveles","A1 a C1"]]},
    {emoji:"",color:"yellow",title:"Grupo exclusivo",desc:"Profes expertos, muchos nativos. Si tienes amigos o familia interesados en el mismo idioma, pídenos un grupo solo para vosotros.",chips:["Consulta precios"]}
  ]
};
var tabLabels={ninos:"Niños y adolescentes",adultos:"Adultos",examenes:"Exámenes",empresas:"Empresas",idiomas:"Otros idiomas"};
var tabsEl=document.getElementById('tabs'), gridEl=document.getElementById('courseGrid'), anims=['up','left','right','scale'];
var courseImages={
  "Peques · 6 a 8 años":'assets/images/kids-play.jpg',
  "Aventureros · 9 a 11 años":'assets/images/kids-class.jpg',
  "Pre-adolescentes · 12 a 14 años":'assets/images/teens-study.jpg',
  "Cómo funcionan los grupos":'assets/images/academy-study.jpg',
  "Apoyo escolar":'assets/images/support-study.jpg',
  "Inglés para adultos":'assets/images/adults-class.jpg',
  "Clases particulares":'assets/images/private-tutoring.jpg',
  "Conversación":'assets/images/adults-speaking.jpg',
  "Clases online":'assets/images/online-class.jpg',
  "Preparación oficial en grupo":'assets/images/exam-prep.jpg',
  "Intensivo Cambridge":'assets/images/cambridge-books.jpg',
  "Cambridge Express":'assets/images/hero-learning.jpg',
  "Inglés para empresas":'assets/images/business-class.jpg',
  "Business English Bootcamp":'assets/images/business-team.jpg',
  "Francés":'assets/images/flag-france.svg',
  "Alemán":'assets/images/flag-germany.svg',
  "Italiano":'assets/images/flag-italy.svg',
  "Chino":'assets/images/flag-china.svg',
  "Grupo exclusivo":'assets/images/german-study.jpg'
};
function renderCourses(cat){
  gridEl.innerHTML="";
  courses[cat].forEach(function(c,i){
    var card=document.createElement('div');
    card.className='ccard reveal'; card.setAttribute('data-anim',anims[i%anims.length]);
    var det=c.details?'<dl>'+c.details.map(function(d){return '<div><dt>'+d[0]+'</dt><dd>'+d[1]+'</dd></div>';}).join('')+'</dl>':'';
    var chips=c.chips?'<div class="chips">'+c.chips.map(function(ch){return '<span class="chip">'+ch+'</span>';}).join('')+'</div>':'';
    var schedule=c.schedule?'<a class="btn btn-ghost schedule-button" href="#horarios">Horario</a>':'';
    card.innerHTML='<img class="course-image" src="'+courseImages[c.title]+'" alt="'+c.title+'" loading="lazy">'+(c.emoji?'<div class="emoji" style="background:var(--'+c.color+'-wash);">'+c.emoji+'</div>':'')+'<h4>'+c.title+'</h4><p>'+c.desc+'</p>'+det+schedule+chips;
    gridEl.appendChild(card); io.observe(card);
    setTimeout(function(){card.classList.add('in');},60*i+30);
  });
}
Object.keys(tabLabels).forEach(function(key){
  var btn=document.createElement('button'); btn.className='tab-btn'+(key==='ninos'?' active':''); btn.textContent=tabLabels[key];
  btn.addEventListener('click',function(){tabsEl.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');renderCourses(key);});
  tabsEl.appendChild(btn);
});
renderCourses('ninos');

/* exams */
var exams={
 PET:{l:"B1",n:"PET · B1 Preliminary",t:"Certifica un nivel B1: entiendes lo esencial de textos claros sobre temas conocidos, te manejas de viaje y escribes textos sencillos. Sigue siendo válido en másters y universidades.",p:["Reading: 45 min · 6 partes · 32 preguntas","Writing: 45 min · 2 partes","Listening: ~30 min · 4 partes · 25 preguntas","Speaking: hasta 12 min, con otro candidato"]},
 FCE:{l:"B2",n:"FCE · B2 First",t:"Nivel B2 (intermedio-alto): te desenvuelves en casi cualquier situación diaria y puedes estudiar o trabajar en inglés. Muy prestigioso y reconocido por universidades.",p:["Reading and Use of English: 1h15 · 40%","Writing: 1h20 · 2 textos de 140–190 palabras · 20%","Listening: 40 min · 20%","Speaking: hasta 14 min · 20%"]},
 CAE:{l:"C1",n:"CAE · C1 Advanced",t:"Nivel C1: comprendes textos extensos y exigentes, captas sentidos implícitos y te expresas con fluidez. Un salto importante respecto al First.",p:["Reading and Use of English: 1h30 · 8 partes · 56 preguntas · 40%","Writing: 1h30 · 2 textos de 220–260 palabras · 20%","Listening: 40 min · 30 preguntas · 20%","Speaking: hasta 15 min · 20%"]},
 CPE:{l:"C2",n:"CPE · C2 Proficiency",t:"El nivel más alto de Cambridge: dominio casi nativo. Apto o no apto, con un certificado que no caduca. Unos 236 minutos en total.",p:["Parte 1 · 90 min: lectura, gramática y vocabulario","Parte 2 · 90 min: expresión escrita (2 tareas)","Parte 3 · 40 min: comprensión oral","Parte 4 · 16 min: expresión oral, por parejas"]},
 IELTS:{l:"A2–C2",n:"IELTS",t:"Aceptado por más de 9.000 organizaciones en 140 países para estudiar, trabajar o emigrar. Cubre del A2 al C2 con nota de 1 a 9. Convocatorias del British Council (conviene reservar con ~2 meses).",p:["Simulacros escritos y orales","Diagnóstico inicial de puntos fuertes y débiles","Grupal (3h/semana), online o individual","Trabajo para casa y compromiso del alumno"]},
 Aptis:{l:"A1–C",n:"Aptis",t:"Examen multinivel del British Council para mayores de 16 años. Todo por ordenador, incluido el speaking, y resultados en 72 horas. Lo habitual es Aptis General.",p:["4 destrezas + gramática y vocabulario (obligatorio)","Versiones: General, Teens, Teachers, Tourism y Advanced"]},
 TOEFL:{l:"iBT",n:"TOEFL iBT",t:"El examen americano por excelencia, aceptado por más de 11.500 universidades e instituciones en más de 160 países. En centro, Home Edition o Paper Edition.",p:["Reading: 3–4 textos académicos","Listening: clases y conversaciones universitarias","Speaking: 6 tareas grabadas","Writing: 2 ensayos de ~300 palabras"]},
 TOEIC:{l:"ETS",n:"TOEIC",t:"De ETS (como el TOEFL): reconocido por universidades, becas Erasmus+, oposiciones y grandes empresas del Ibex35. Multinivel, así que siempre recibes certificado. Speaking por ordenador, con día y hora a tu elección.",p:["Listening & Reading","Speaking & Writing (mínimo 3 evaluadores)","Puedes repetir solo la parte que no alcances"]}
};
var examBtns=document.getElementById('examBtns'), examPanel=document.getElementById('examPanel'), bcol=['--sky','--yellow','--navy'];
function showExam(k,btn){
  var e=exams[k];
  examBtns.querySelectorAll('.seal').forEach(function(b){b.classList.remove('active');}); btn.classList.add('active');
  examPanel.innerHTML='<h4>'+e.n+'</h4><p>'+e.t+'</p><ul>'+e.p.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
  examPanel.classList.remove('swap'); void examPanel.offsetWidth; examPanel.classList.add('swap');
}
Object.keys(exams).forEach(function(k,i){
  var b=document.createElement('button'); b.className='seal'; b.style.borderColor='var('+bcol[i%3]+')';
  b.innerHTML='<b>'+k+'</b><small>'+exams[k].l+'</small>';
  b.addEventListener('click',function(){showExam(k,b);}); examBtns.appendChild(b);
  if(i===1){showExam(k,b);}
});

/* testimonials */
var testimonials=[
  {name:"Marcos Batista",tag:"Alumno A2–B1, 2024–25",body:"Destaca a Yogesh por hacerle hablar sin darse cuenta y a Pooja por su paciencia y sus juegos para afianzar la gramática."},
  {name:"Laura Gutiérrez",tag:"One to one, 2023–25",body:"Su madre, con 62 años y sin base, lleva tres años aprendiendo con un trato cercano desde el primer día."},
  {name:"David Nogales",tag:"Alumno B2, 2024–25",body:"Una academia profesional, con clases dinámicas adaptadas al alumnado y un ambiente muy agradable."},
  {name:"Victoria Hernández",tag:"Alumna FCE, 2015–16",body:"Destaca el precio ajustado, el aula equipada y la práctica de examen desde el primer día."},
  {name:"Sofía Herranz",tag:"Alumna FCE, 2014–15",body:"Valora a unos profesores muy implicados y actividades que van más allá de la gramática, como juegos y listenings de series."},
  {name:"Miren Díaz",tag:"Alumna FCE, 2015–16",body:"Para ella fue su mejor curso de First, con clases llevaderas y mucho sentido del humor."},
  {name:"Laura Torres",tag:"Alumna FCE, 2014–15",body:"Elogia una enseñanza amena, muy buena preparación de exámenes y grupos reducidos con seguimiento personal."},
  {name:"Cristina Fernández",tag:"Alumna Intermedio, 2014–15",body:"Aprendió a soltarse y hablar, en un ambiente estupendo y con profesores muy amables."},
  {name:"Laureano Martínez",tag:"Pre-Intermedio, 2015–16",body:"Ir a clase deja de ser un esfuerzo y se convierte en un placer: perseverancia con una sonrisa."},
  {name:"Elisa Doncel",tag:"Alumna CAE, 2013–14",body:"No solo aprendes inglés: te diviertes y recibes un trato muy especializado."},
  {name:"María José Capelastegui",tag:"Niños y apoyo escolar, 2014–16",body:"Resalta la gran profesionalidad y las clases de refuerzo, que captan el interés de los alumnos."},
  {name:"Pablo Garrido",tag:"Conversación, 2018–19",body:"Clases amenas, buenos recursos y muy buen precio: merece la pena."}
];
var testGrid=document.getElementById('testGrid');
testimonials.forEach(function(t,i){
  var ini=t.name.split(' ').map(function(w){return w[0];}).slice(0,2).join('');
  var d=document.createElement('div'); d.className='tcard reveal'; d.setAttribute('data-anim',anims[i%anims.length]);
  d.innerHTML='<p class="body">'+t.body+'</p><div class="who"><span class="dot2">'+ini+'</span><div><b>'+t.name+'</b><span>'+t.tag+'</span></div></div>';
  testGrid.appendChild(d); io.observe(d);
});

/* lead form -> whatsapp */
document.getElementById('leadForm').addEventListener('submit', function(e){
  e.preventDefault();
  var nombre = document.getElementById('f-nombre').value.trim();
  var tel = document.getElementById('f-tel').value.trim();
  var curso = document.getElementById('f-curso').value;
  if(!nombre || !tel){ return; }
  var msg = 'Hola, soy ' + nombre + ' (tel. ' + tel + '). Quiero reservar una prueba de nivel gratuita. Me interesa: ' + curso + '.';
  var url = 'https://wa.me/34692175578?text=' + encodeURIComponent(msg);
  document.getElementById('formOk').classList.add('show');
  window.open(url, '_blank', 'noopener');
});
