document.addEventListener('DOMContentLoaded', ()=>{
  const $ = s=>document.querySelector(s), $$ = s=>Array.from(document.querySelectorAll(s));
  
  // Hero welcome
let userName = sessionStorage.getItem('user_name') || '';
if(!userName){
  setTimeout(()=>{
    Swal.fire({
      title:'Hi! What is your name?',
      input:'text', inputPlaceholder:'Type your name', showCancelButton:true,
      confirmButtonText:'Save', allowOutsideClick:false
    }).then(res=>{
      if(res.isConfirmed && res.value.trim()!==''){
        userName = res.value.trim();
        sessionStorage.setItem('nikk_name', userName);
        $('#user-name').textContent = userName;
        showToast(`Nice to meet you, ${userName}!`);
      } else showToast('Welcome visitor!');
    });
  },600);
} else {
  $('#user-name').textContent = userName;
}

// navbar animations
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("topnav");
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-shrink");
    } else {
        navbar.classList.remove("navbar-shrink");
    }
});



  // Typed.js
  new Typed('#typed',{strings:userName? [`Welcome`,`Hello ${userName},`,`Glad you are here.`]:['Welcome','Hello','Hi there, I am Nikk'], typeSpeed:60, backSpeed:35, backDelay:2400, loop:true});

  // Smooth scroll
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click', e=>{e.preventDefault(); const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth', block:'start'});}));

  // Header scrolled effect
  const header = $('#topnav');
  window.addEventListener('scroll', ()=>{ if(window.scrollY>20) header.classList.add('scrolled','shadow-lg'); else header.classList.remove('scrolled','shadow-lg');});

  // GSAP stats
  gsap.from('#stat-projects',{innerText:0,duration:1.6,snap:{innerText:1},delay:0.6,innerText:24,ease:'power1.inOut'});
  gsap.from('#stat-clients',{innerText:0,duration:1.6,snap:{innerText:1},delay:0.9,innerText:12,ease:'power1.inOut'});
  gsap.from('#stat-awards',{innerText:0,duration:1.6,snap:{innerText:1},delay:1.2,innerText:5,ease:'power1.inOut'});

  // ScrollReveal
  ScrollReveal().reveal('[data-sr]', {distance:'3px', duration:4000, easing:'cubic-bezier(.2,.8,.2,1)', origin:'bottom', interval:520, reset:true});

  // Parallax
  const l1 = document.querySelector('.hero-parallax-layer.l1');
  window.addEventListener('scroll', ()=>{ const y=window.scrollY; if(l1) l1.style.transform=`translateY(${y*0.12}px)`; });

  // Buttons
  $('#btn-explore').addEventListener('click', ()=>$('#works').scrollIntoView({behavior:'smooth'}));
  $('#btn-contact').addEventListener('click', ()=>$('#contact').scrollIntoView({behavior:'smooth'}));
  $('#btn-hire').addEventListener('click', ()=>showToast('Thanks! Reach me via Contact section.'));
  
  // Download CV with jsPDF
  $('#btn-resume').addEventListener('click', ()=>{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18); doc.text("Nikk — CV",20,20);
    doc.setFontSize(12);
    doc.text("Web Developer & Designer\nEmail: nikkkdevvv@gmail.com\nPortfolio: www.nikkkdevvv.com",20,40);
    doc.text("Skills:\n• Web Development\n• Frontend Development\n• JavaScript & Frameworks\n• Creative Direction",20,60);
    doc.save("NikkkDevvvCV.pdf");
  });

  // Projects lightbox
  $$('.proj').forEach(p=>p.addEventListener('click', ()=>{
    Swal.fire({
      title:p.dataset.project||'Project', text:p.dataset.desc||'',
      imageUrl:p.dataset.img||'img/nikk.jpg', imageAlt:p.dataset.project||'Project',
      showCloseButton:true, confirmButtonText:'View details'
    });
  }));

  // Contact form
$('#contact-form').addEventListener('submit', e => {
  e.preventDefault();

  const name = $('#c-name').value.trim();
  const gender = $('#c-gender').value.trim();
  const dob = $('#c-dob').value;
  const msg = $('#c-message').value.trim();

  if (!name || !gender || !dob || !msg) {
    showToast('Please complete the form.', true);
    return;
  }

  // Ambil waktu sekarang
  const now = new Date();
  const timeString = now.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });

  // Tampilkan pop-up
  alert(
    `Current Time: ${timeString}\n\n` +
    `Name: ${name}\n` +
    `Date of Birth: ${dob}\n` +
    `Gender: ${gender}\n` +
    `Message: ${msg}`
  );

  showToast('Message sent — thank you!');

  // Kosongkan form
  $('#c-name').value = '';
  $('#c-gender').value = '';
  $('#c-dob').value = '';
  $('#c-message').value = '';
});


  // Toast system
  const toastContainer = $('#toast');
  function showToast(text, isError=false, ttl=3200){
    const div = document.createElement('div');
    div.className = 'toast-item ' + (isError ? 'bg-red-600' : 'bg-green-600');
    div.textContent=text; toastContainer.appendChild(div);
    gsap.fromTo(div,{x:60, opacity:0, scale:0.95},{x:0, opacity:1, scale:1, duration:0.45, ease:'power2.out'});
    setTimeout(()=>{ gsap.to(div,{x:60,opacity:0,duration:0.45,ease:'power2.in',onComplete:()=>div.remove()}); },ttl);
  }

  // About Me interactive skills
  const skills = [
    {name:"Web Development", desc:"Building modern websites with HTML, CSS, JS, and frameworks."},
    {name:"Frontend Development", desc:"Creating responsive and user-friendly interfaces."},
    {name:"JavaScript & Frameworks", desc:"Proficient in JS, React, Vue, and TailwindCSS."},
    {name:"Creative Direction", desc:"Managing creative concepts for digital products."}
  ];
  const skillEls = document.querySelectorAll('#profile ul li');
  const skillDesc = $('#skill-desc');
  skillEls.forEach((el,i)=>{
    el.addEventListener('mouseenter', ()=> skillDesc.textContent=skills[i].desc);
    el.addEventListener('mouseleave', ()=> skillDesc.textContent='Hover a skill to see description.');
  });

  // Accessibility: allow sections to be focused
  document.querySelectorAll('section').forEach(s=> s.setAttribute('tabindex','-1'));
});


