// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if(navToggle){
  navToggle.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'block' ? '' : 'block';
  });
}

// Testimonial slider
const slides = Array.from(document.querySelectorAll('.testimonial'));
let idx = 0;
function showTestimonial(i){
  slides.forEach((s,si)=> s.classList.toggle('active', si === i));
}
if(slides.length){showTestimonial(0);}
const nextBtn=document.getElementById('nextTest'), prevBtn=document.getElementById('prevTest');
if(nextBtn) nextBtn.addEventListener('click', ()=>{ idx=(idx+1)%slides.length; showTestimonial(idx); });
if(prevBtn) prevBtn.addEventListener('click', ()=>{ idx=(idx-1+slides.length)%slides.length; showTestimonial(idx); });

// Load more portfolio
const loadMore=document.getElementById('loadMore');
if(loadMore){
  loadMore.addEventListener('click', ()=> {
    const grid = document.getElementById('portfolioGrid');
    for (let i=0;i<3;i++){
      const n = Math.floor(Math.random()*1000);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<img src="https://picsum.photos/seed/p${n}/600/400" alt="">
        <div class="card-body"><h4>Extra Project</h4><p>Design / Marketing</p></div>`;
      grid.appendChild(card);
    }
  });
}

// Contact form demo
const form=document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e)=> {
    e.preventDefault();
    alert('Thanks — message received! (demo only)');
    form.reset();
  });
}

/* --- Interactive Ripple Effect --- */
(function rippleEffect(){
  const img = document.querySelector('.ripple');
  if(!img) return;

  const wrap = img.parentElement;
  const canvas = document.createElement('canvas');
  canvas.className = 'ripple-canvas';
  wrap.insertBefore(canvas, img);

  const ctx = canvas.getContext('2d');
  let w,h;
  function resize(){
    w = canvas.width = wrap.offsetWidth;
    h = canvas.height = wrap.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let ripples = [];
  function draw(){
    ctx.clearRect(0,0,w,h);
    ripples.forEach(r=>{
      r.radius += 1.2;
      r.alpha -= 0.01;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(6,182,212,${r.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
    ripples = ripples.filter(r=> r.alpha > 0);
    requestAnimationFrame(draw);
  }
  draw();

  function addRipple(x,y){
    ripples.push({x,y,radius:20,alpha:0.6});
  }

  canvas.addEventListener('mousemove', e=>{
    const rect = canvas.getBoundingClientRect();
    addRipple(e.clientX-rect.left, e.clientY-rect.top);
  });
  canvas.addEventListener('click', e=>{
    const rect = canvas.getBoundingClientRect();
    addRipple(e.clientX-rect.left, e.clientY-rect.top);
  });
})();
