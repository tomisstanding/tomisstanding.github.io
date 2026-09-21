// Add clients here. Keep descriptions factual; results and metrics need confirmation.
const clients = [
  {id:'olyra',name:'OLYRA',logo:'olyra.svg',category:'Food & beverage',url:'https://olyrafoods.com/',description:'Organic breakfast snacks made with ancient Greek grains and a family milling heritage.',work:'I help improve the Shopify storefront through product-page updates, conversion research, and testing ideas that make shopping more intuitive.',services:['Shopify development','CRO','Product experience']},
  {id:'kevins',name:'Kevin’s Natural Foods',logo:'kevins.svg',category:'Food & beverage',url:'https://www.kevinsnaturalfoods.com/',description:'A food brand making clean eating more convenient with prepared meals, entrées, and sauces.',work:'I support the Shopify experience with product-page development, nutrition information, and Bazaarvoice review integrations.',services:['Shopify development','Product pages','Review integrations']},
  {id:'ctwf',name:'Consider the Wldflwrs',logo:'ctwf.png',category:'Fine jewelry',url:'https://considerthewldflwrs.com/',description:'A Nashville fine jewelry brand creating pieces for everyday wear and life’s meaningful moments.',work:'I work on Shopify theme improvements, product imagery and variant experiences, and conversion tracking to support a smoother path to purchase.',services:['Shopify development','Product experience','Analytics']},
  {"id": "koia", "name": "Koia", "logo": "koia.png", "category": "Food & beverage", "url": "https://drinkkoia.com/", "description": "A plant-based beverage brand making protein shakes with low sugar and prebiotic fiber.", "work": null, "services": []},
  {"id": "create", "name": "Create", "logo": "create.svg", "category": "Health & wellness", "url": "https://trycreate.co/", "description": "A creatine-focused wellness brand offering gummies, powders, and electrolyte mixes.", "work": null, "services": []},
  {"id": "gigit", "name": "gigitAI", "logo": "gigit.svg", "category": "Ecommerce technology", "url": "https://gigit.ai/", "description": "An AI platform for dynamic ecommerce storefronts and personalized product discovery.", "work": null, "services": []},
  {"id": "jpress", "name": "J. Press", "logo": "jpress.png", "category": "Apparel & retail", "url": "https://jpress.com/", "description": "A heritage American menswear brand known for Ivy League style, tailoring, and classic wardrobe staples.", "work": null, "services": []},
  {"id": "unbound", "name": "Unbound Snacks", "logo": "unbound.png", "category": "Food & beverage", "url": "https://unboundsnacks.com/", "description": "A family-grown California walnut brand turning roasted and seasoned walnuts into everyday snacks.", "work": null, "services": []},
  {"id": "somera", "name": "SomeraRoad", "logo": "somera.svg", "category": "Real estate", "url": "https://someraroadinc.com/", "description": "A real estate investment and development firm focused on creating value in properties and communities.", "work": null, "services": []},
  {"id": "ohana-realty", "name": "Ohana Realty", "logo": "ohana-realty.svg", "category": "Real estate & hospitality", "url": "https://ohanarealty.com/", "description": "A real estate brokerage representing homes in resort and residential communities.", "work": "I own ongoing site maintenance and optimization for Ohana Realty and its associated property websites, including Panther National, Montage, Twin Dolphin, and Ohana Design & Build.", "services": ["Site maintenance", "Optimization", "Website ownership"]}
];

const wheel = document.querySelector('.orbit');
const experience = document.querySelector('.experience');
const logoContainer = document.querySelector('#client-logos');
const list = document.querySelector('#client-list');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const wheelSize = 5;
let wheelPage = -1;
let activeIndex = 0;
let angle = -90;
let radius = 0;
let manualPause = reducedMotion.matches;
let hovered = false;
let focused = false;
let visible = true;
let frame = null;
let previousTime = null;
const logoButtons = [];
const listButtons = [];
const pad = number => String(number).padStart(2, '0');

clients.forEach((client, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'logo-button';
  button.dataset.id = client.id;
  button.setAttribute('aria-label', `Explore ${client.name}`);
  button.setAttribute('aria-controls', 'detail-content');
  const logo = document.createElement('img');
  logo.src = `logos/${client.logo}`;
  logo.alt = '';
  logo.draggable = false;
  logo.addEventListener('error', () => {
    const fallback = document.createElement('span');
    fallback.className = 'logo-fallback';
    fallback.textContent = client.name;
    logo.replaceWith(fallback);
  });
  button.append(logo);
  button.addEventListener('pointerenter', () => { if (finePointer.matches) selectClient(index); });
  button.addEventListener('focus', () => selectClient(index));
  button.addEventListener('click', () => {
    selectClient(index);
    if (!finePointer.matches && window.matchMedia('(max-width: 760px)').matches) {
      document.querySelector('.client-detail').scrollIntoView({behavior:reducedMotion.matches ? 'instant' : 'smooth',block:'start'});
    }
  });
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % clients.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + clients.length) % clients.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = clients.length - 1;
    if (next !== undefined) { event.preventDefault(); selectClient(next); logoButtons[next].focus(); }
  });
  logoContainer.append(button);
  logoButtons.push(button);

  const indexButton = document.createElement('button');
  indexButton.type = 'button';
  indexButton.className = 'index-client';
  indexButton.setAttribute('aria-controls', 'detail-content');
  const number = document.createElement('span');
  number.className = 'index-number';
  number.textContent = pad(index + 1);
  number.setAttribute('aria-hidden', 'true');
  const name = document.createElement('span');
  name.textContent = client.name;
  indexButton.append(number, name);
  indexButton.addEventListener('click', () => {
    selectClient(index);
    if (window.matchMedia('(max-width: 760px)').matches) {
      document.querySelector('.client-detail').scrollIntoView({behavior:reducedMotion.matches ? 'instant' : 'smooth',block:'start'});
    }
  });
  list.append(indexButton);
  listButtons.push(indexButton);
});

function selectClient(index) {
  activeIndex = (index + clients.length) % clients.length;
  const client = clients[activeIndex];
  const page = Math.floor(activeIndex / wheelSize);
  if (page !== wheelPage) showWheelPage(page);
  document.querySelector('#client-name').textContent = client.name;
  document.querySelector('#client-category').textContent = client.category;
  document.querySelector('#company-description').textContent = client.description;
  document.querySelector('#client-work').textContent = client.work || '';
  document.querySelector('.contribution').hidden = !client.work;
  document.querySelector('#client-services').hidden = !client.services.length;
  document.querySelector('#client-counter').textContent = `${pad(activeIndex + 1)} / ${pad(clients.length)}`;
  document.querySelector('#client-link').href = client.url;
  document.querySelector('#client-link').setAttribute('aria-label', `Visit ${client.name} website (opens in a new tab)`);
  const services = document.querySelector('#client-services');
  services.replaceChildren(...client.services.map(service => {
    const item = document.createElement('li');
    item.textContent = service;
    return item;
  }));
  logoButtons.forEach((button,i) => button.setAttribute('aria-pressed', String(i === activeIndex)));
  listButtons.forEach((button,i) => button.setAttribute('aria-pressed', String(i === activeIndex)));
}

function showWheelPage(page) {
  wheelPage = page;
  const start = page * wheelSize;
  const end = Math.min(start + wheelSize, clients.length);
  logoButtons.forEach((button, index) => { button.hidden = index < start || index >= end; });
  document.querySelector('#wheel-range').textContent = `${pad(start + 1)}–${pad(end)} OF ${pad(clients.length)}`;
  document.querySelector('.wheel-pagination').hidden = clients.length <= wheelSize;
  positionLogos();
}
function positionLogos() {
  const start = wheelPage * wheelSize;
  const count = Math.min(wheelSize, clients.length - start);
  logoButtons.slice(start, start + count).forEach((button, index) => {
    const radians = (angle + index * 360 / count) * Math.PI / 180;
    button.style.transform = `translate(-50%, -50%) translate(${Math.cos(radians) * radius}px, ${Math.sin(radians) * radius}px)`;
  });
}
function animate(time) {
  if (previousTime !== null) angle = (angle + Math.min(time - previousTime, 50) * 0.00225) % 360;
  previousTime = time;
  positionLogos();
  frame = requestAnimationFrame(animate);
}
function syncMotion() {
  const paused = manualPause || hovered || focused || document.hidden || !visible;
  if (paused && frame !== null) { cancelAnimationFrame(frame); frame = null; previousTime = null; }
  if (!paused && frame === null) frame = requestAnimationFrame(animate);
  document.querySelector('#motion-toggle').setAttribute('aria-pressed',String(manualPause));
  document.querySelector('#motion-label').textContent = manualPause ? 'Resume rotation' : 'Pause rotation';
  document.querySelector('#motion-icon').textContent = manualPause ? '▷' : 'Ⅱ';
}
document.querySelector('#previous-group').addEventListener('click', () => selectClient(((wheelPage - 1 + Math.ceil(clients.length / wheelSize)) % Math.ceil(clients.length / wheelSize)) * wheelSize));
document.querySelector('#next-group').addEventListener('click', () => selectClient(((wheelPage + 1) % Math.ceil(clients.length / wheelSize)) * wheelSize));
document.querySelector('#motion-toggle').addEventListener('click', () => { manualPause = !manualPause; syncMotion(); });
document.querySelector('#previous-client').addEventListener('click', () => selectClient(activeIndex - 1));
document.querySelector('#next-client').addEventListener('click', () => selectClient(activeIndex + 1));
experience.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; syncMotion(); } });
experience.addEventListener('pointerleave', () => { hovered = false; syncMotion(); });
experience.addEventListener('focusin', event => { focused = event.target.id !== 'motion-toggle'; syncMotion(); });
experience.addEventListener('focusout', event => { if (!experience.contains(event.relatedTarget)) { focused = false; syncMotion(); } });
document.addEventListener('visibilitychange', syncMotion);
reducedMotion.addEventListener('change', event => { manualPause = event.matches; syncMotion(); });
new ResizeObserver(() => { radius = wheel.clientWidth * .36; positionLogos(); }).observe(wheel);
new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncMotion(); }).observe(wheel);
document.querySelector('#index-count').textContent = `${pad(clients.length)} COLLABORATIONS`;
selectClient(0);
radius = wheel.clientWidth * .36;
positionLogos();
syncMotion();
