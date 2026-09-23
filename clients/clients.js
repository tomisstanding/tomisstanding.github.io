const clients = [
  {id:'create',name:'Create',category:'Health & wellness',url:'https://trycreate.co/',description:'A creatine-focused wellness brand offering gummies, powders, and electrolyte mixes.',work:"A product page rebuilt around the first purchase. I developed Create’s PDP from scratch, including a custom flavor selector designed for new customers. The CRO-focused rebuild aimed to increase subscriptions, average order value, and customer lifetime value.",services:["PDP development", "Custom flavor selector", "CRO"]},
  {id:'olyra',name:'OLYRA',category:'Food & beverage',url:'https://olyrafoods.com/',description:'Organic breakfast snacks made with ancient Greek grains and a family milling heritage.',work:"From the storefront to the inbox, I help OLYRA turn interest into repeat business. As CRO Manager, I rebuilt the product pages, navigation, homepage, and collection pages, helping lift average order value and conversion rate. Today, I also lead email marketing, including Klaviyo flows and campaigns.",services:["CRO", "Web development", "Klaviyo & email"]},
  {id:'kevins',name:'Kevin’s Natural Foods',category:'Food & beverage',url:'https://www.kevinsnaturalfoods.com/',description:'A food brand making clean eating more convenient with prepared meals, entrées, and sauces.',work:"Connecting the shopping experience with what comes next. I own web development and email marketing for Kevin’s Natural Foods, improving the website and managing email campaigns and automated flows.",services:["Web development", "Email campaigns", "Email flows"]},
  {id:'ctwf',name:'Consider the Wldflwrs',category:'Fine jewelry',url:'https://considerthewldflwrs.com/',description:'A Nashville fine jewelry brand creating pieces for everyday wear and life’s meaningful moments.',work:"Ongoing development for a brand built around meaningful details. I own web development for Consider the Wldflwrs, maintaining and improving its ecommerce website.",services:["Web development", "Site maintenance"]},
  {id:'koia',name:'Koia',category:'Food & beverage',url:'https://drinkkoia.com/',description:'A plant-based beverage brand making protein shakes with low sugar and prebiotic fiber.',work:"A fresh foundation for the product experience. I rebuilt Koia’s product detail page.",services:["PDP development"]},
  {id:'gigit',name:'gigitAI',category:'Ecommerce technology',url:'https://gigit.ai/',description:'An AI platform for dynamic ecommerce storefronts and personalized product discovery.',work:"Designing the app and helping shape what comes next. I redesigned gigitAI and played a key role in its strategic roadmap, identifying opportunities to help merchants increase conversion rate, average order value, and customer lifetime value.",services:["App design", "Product strategy", "Strategic roadmap"]},
  {id:'jpress',name:'J. Press',category:'Apparel & retail',url:'https://jpress.com/',description:'A heritage American menswear brand known for Ivy League style, tailoring, and classic wardrobe staples.',work:"Helping shoppers find their way through a heritage menswear brand. I helped rebuild J. Press’s collection page and navigation, bringing a fresh approach to how customers browse the catalog.",services:["Collection pages", "Navigation"]},
  {id:'unbound',name:'Unbound Snacks',category:'Food & beverage',url:'https://unboundsnacks.com/',description:'A family-grown California walnut brand turning roasted and seasoned walnuts into everyday snacks.',work:"Bringing the product into focus. I built Unbound Snacks’ product detail page, creating the place where shoppers get to know the product and decide to buy.",services:["PDP development"]},
  {id:'somera',name:'SomeraRoad',category:'Real estate',url:'https://someraroadinc.com/',description:'A real estate investment and development firm focused on creating value in properties and communities.',work:"Supporting the digital home of South Paseo Gulch. I help manage ongoing web development for the property’s website.",services:["Web development"]},
  {id:'ohana-realty',name:'Ohana Realty',category:'Real estate & hospitality',url:'https://ohanarealty.com/',description:'A real estate brokerage representing homes in resort and residential communities.',work:"A portfolio of properties, with web development under one roof. I manage ongoing website development, maintenance, and optimization across Ohana brands and properties, including Twin Dolphin, Montage Healdsburg, Ohana Design & Build, and Ohana Realty.",services:["Web development", "Site maintenance", "Optimization"]},
  {id:'lym',name:'Love Your Melon',category:'Apparel & accessories',url:'https://loveyourmelon.com/',description:'A beanie and accessories brand supporting children and families affected by pediatric cancer.',work:"Connecting the storefront and the inbox. I help manage web development and Klaviyo emails for Love Your Melon, supporting the brand across its website and email marketing.",services:["Web development", "Klaviyo emails"]},
  {id:'oceanfoam',name:'Oceanfoam',category:'Movement & wellness',url:'https://oceanfoam.com/',description:'A movement and recovery brand creating foam rollers, workout mats, and accessories using algae and recycled materials.',work:"A hands-on role in bringing Oceanfoam’s website to life. I helped build most of the site, turning the brand’s vision into a working ecommerce experience.",services:["Ecommerce development"]},
  {id:'tare',name:'Tare Market',category:'Sustainable retail',url:'https://www.thetaremarket.com/',description:'A sustainability-focused market offering bulk groceries, refillable essentials, and low-waste products for everyday living.',work:"Bringing low-waste shopping online. I built Tare Market’s Shopify store, giving its sustainable products a dedicated ecommerce home.",services:["Shopify store build"]},
  {id:'richwife',name:'Rich Wife',category:'Apparel & accessories',url:'https://richwife.com/',description:'An apparel and accessories brand with signature caps, clothing, and a playful approach to personal style.',work:"Custom functionality for a brand with its own point of view. I built tailored features for Rich Wife’s collection pages and product detail pages.",services:["Custom functionality", "Collection pages", "PDP development"]},
  {id:'served',name:'Served',category:'Home & entertaining',url:'https://shopserved.com/',description:'An insulated serveware brand making transportable bowls and pitchers that keep food and drinks hot or cold.',work:"Helping bring Served’s products to the table and online. I helped build the brand’s ecommerce store.",services:["Ecommerce development"]}
];

const animals = [
  ['create.png','13%','72%',1,'130px'],['olyra.png','30%','61%',1,'114px'],['kevins.png','45%','64%',1,'124px'],['ctwf.png','9%','23%',1,'62px'],['koia.png','64%','57%',1,'155px'],
  ['create.png','53%','48%',1,'88px'],['jpress.png','72%','30%',1,'70px'],['unbound.png','27%','75%',1,'108px'],['somera.png','41%','46%',1,'72px'],['ohana-realty.png','74%','71%',1,'135px'],
  ['lym.png','83%','18%',1,'78px'],['oceanfoam.png','95%','69%',1,'105px'],['tare.png','36%','78%',1,'148px'],['richwife.png','53%','78%',1,'126px'],['served.png','66%','84%',1,'164px']
];

const field = document.querySelector('#animal-field');
const detail = document.querySelector('.animal-detail');
const guide = document.querySelector('#field-guide');
const guideToggle = document.querySelector('#field-guide-toggle');
const guideClose = document.querySelector('#field-guide-close');
const companyKey = document.querySelector('#company-key');
const detailClose = document.querySelector('#detail-close');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const mobileViewport = window.matchMedia('(max-width: 680px)');
const buttons = [];
const keyButtons = [];
let activeIndex = 0;
let restoringAnimalFocus = false;
const pad = number => String(number).padStart(2, '0');

clients.forEach((client,index) => {
  const [art,x,y,scale,size] = animals[index];
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'animal';
  button.dataset.id = client.id;
  button.setAttribute('aria-label',`Explore ${client.name}`); button.setAttribute('aria-controls','client-name');
  button.style.setProperty('--x',x); button.style.setProperty('--y',y); button.style.setProperty('--scale',scale); button.style.setProperty('--animal-size',size);
  button.innerHTML = `<span class="animal-shadow" aria-hidden="true"></span><span class="animal-halo" aria-hidden="true"></span><img class="animal-face" src="animals/${art}" alt=""><span class="animal-tag" aria-hidden="true">${client.name}</span>`;
  button.addEventListener('pointerenter',() => { if (finePointer.matches) selectClient(index,true); });
  button.addEventListener('focus',() => { if (!restoringAnimalFocus) selectClient(index,true); }); button.addEventListener('click',() => selectClient(index,true));
  button.addEventListener('keydown',event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % clients.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + clients.length) % clients.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = clients.length - 1;
    if (next !== undefined) { event.preventDefault(); selectClient(next,true); buttons[next].focus(); }
  });
  field.append(button); buttons.push(button);
  const keyButton = document.createElement('button');
  keyButton.type = 'button'; keyButton.setAttribute('aria-current','false');
  keyButton.innerHTML = `<span class="company-key-number">${pad(index + 1)}</span><img class="company-key-art" src="animals/${art}" alt="" loading="lazy"><span>${client.name}</span>`;
  keyButton.addEventListener('click',() => { setGuideOpen(false,false); selectClient(index,true); focusAnimal(index); });
  companyKey.append(keyButton); keyButtons.push(keyButton);
});

function focusAnimal(index) {
  restoringAnimalFocus = true;
  buttons[index].focus({preventScroll:true});
  restoringAnimalFocus = false;
}

function setGuideOpen(isOpen, restoreFocus = true) {
  guide.hidden = !isOpen;
  guideToggle.setAttribute('aria-expanded',String(isOpen));
  if (isOpen) keyButtons[activeIndex].focus();
  else if (restoreFocus) guideToggle.focus({preventScroll:true});
}

function closeDetail(restoreFocus = false) {
  detail.hidden = true;
  buttons.forEach(button => button.setAttribute('aria-pressed','false'));
  keyButtons.forEach(button => button.setAttribute('aria-current','false'));
  if (restoreFocus) focusAnimal(activeIndex);
}

guideToggle.addEventListener('click',() => setGuideOpen(guide.hidden));
guideClose.addEventListener('click',() => setGuideOpen(false));
document.addEventListener('keydown',event => {
  if (event.key !== 'Escape') return;
  if (!guide.hidden) setGuideOpen(false);
  else if (!detail.hidden) closeDetail(true);
});
detailClose.addEventListener('click',() => closeDetail(true));
document.addEventListener('pointerdown',event => {
  if (!guide.hidden && !guide.contains(event.target) && !guideToggle.contains(event.target)) setGuideOpen(false,false);
  if (detail.hidden || detail.contains(event.target) || event.target.closest('.animal, .field-guide, .field-guide-toggle')) return;
  closeDetail();
});

function playReaction(button) {
  if (reduceMotion.matches) return;
  button.classList.remove('is-reacting');
  void button.offsetWidth;
  button.classList.add('is-reacting');
}

function positionDetail(button) {
  if (window.matchMedia('(max-width: 680px)').matches) return;
  const animal = button.getBoundingClientRect();
  const cardWidth = detail.offsetWidth;
  const cardHeight = detail.offsetHeight;
  const gap = 18;
  const inset = 18;
  const center = animal.left + animal.width / 2;
  const left = Math.min(window.innerWidth - cardWidth / 2 - inset,Math.max(cardWidth / 2 + inset,center));
  const roomAbove = animal.top - gap;
  const showsAbove = roomAbove >= cardHeight + inset;
  const footerTop = document.querySelector('.field-footer').getBoundingClientRect().top;
  const top = showsAbove ? roomAbove : Math.max(inset,Math.min(footerTop - inset - cardHeight,animal.bottom + gap));
  detail.style.setProperty('--detail-left',`${left}px`);
  detail.style.setProperty('--detail-top',`${top}px`);
  detail.dataset.placement = showsAbove ? 'above' : 'below';
}

function selectClient(index, shouldReact = false, shouldShowDetail = true) {
  activeIndex = (index + clients.length) % clients.length;
  const client = clients[activeIndex];
  document.querySelector('#client-number').textContent = pad(activeIndex + 1);
  document.querySelector('#client-category').textContent = client.category;
  document.querySelector('#client-name').textContent = client.name;
  document.querySelector('#company-description').textContent = client.description;
  document.querySelector('#client-work').textContent = client.work || '';
  document.querySelector('#contribution').hidden = !client.work;
  const services = document.querySelector('#client-services');
  services.hidden = !client.services.length;
  services.replaceChildren(...client.services.map(service => { const item = document.createElement('li'); item.textContent = service; return item; }));
  const link = document.querySelector('#client-link');
  link.href = client.url; link.setAttribute('aria-label',`Visit ${client.name} website (opens in a new tab)`);
  if (shouldShowDetail) detail.hidden = false;
  buttons.forEach((button,i) => button.setAttribute('aria-pressed',String(!detail.hidden && i === activeIndex)));
  keyButtons.forEach((button,i) => button.setAttribute('aria-current',String(!detail.hidden && i === activeIndex)));
  if (!detail.hidden) positionDetail(buttons[activeIndex]);
  if (shouldReact) playReaction(buttons[activeIndex]);
}

reduceMotion.addEventListener('change',() => {
  if (reduceMotion.matches) buttons.forEach(button => button.classList.remove('is-reacting'));
});
window.addEventListener('resize',() => { if (!detail.hidden) positionDetail(buttons[activeIndex]); });
mobileViewport.addEventListener('change',() => closeDetail());
selectClient(0,false,false);
