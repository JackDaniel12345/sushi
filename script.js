'use strict';
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
if(toggle&&nav){
 const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.textContent='☰';};
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');toggle.textContent=open?'×':'☰';});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();toggle.focus();}});
 document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))close();});
}
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{
 filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;
 document.querySelectorAll('[data-category]').forEach(dish=>{const show=button.dataset.filter==='all'||dish.dataset.category===button.dataset.filter;dish.hidden=!show;if(show)count++;});
 const status=document.getElementById('filter-status');if(status)status.textContent=`${count} dishes shown`;
}));
const dateField=document.getElementById('date');
if(dateField){const d=new Date();const today=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');dateField.min=today;dateField.addEventListener('input',()=>dateField.setCustomValidity(''));}
document.querySelectorAll('form[data-demo-form]').forEach(form=>{
 form.addEventListener('submit',e=>{
 e.preventDefault();
 if(dateField&&dateField.value<dateField.min){dateField.setCustomValidity('Please choose today or a future date.');}
 if(!form.reportValidity())return;
 const data=new FormData(form);const result=form.querySelector('.success');
 if(!result)return;
 const paragraph=result.querySelector('p');
 if(paragraph){
 if(form.dataset.demoForm==='reservation')paragraph.textContent=`Thank you, ${data.get('name')}. Your sample request is for ${data.get('guests')} guests on ${data.get('date')} at ${data.get('time')}. This is a local preview only: no booking has been sent or confirmed.`;
 else paragraph.textContent=`Thank you, ${data.get('name')}. Your sample message has passed validation. This is a local preview only: no message has been sent.`;
 }
 result.hidden=false;result.focus();result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
 });
 form.addEventListener('input',()=>{const result=form.querySelector('.success');if(result)result.hidden=true;});
});
