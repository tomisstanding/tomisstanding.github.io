const clients = [
  {id:'create',name:'Create',category:'Health & wellness',url:'https://trycreate.co/',description:'A creatine-focused wellness brand offering gummies, powders, and electrolyte mixes.',work:null,services:[]},
  {id:'olyra',name:'OLYRA',category:'Food & beverage',url:'https://olyrafoods.com/',description:'Organic breakfast snacks made with ancient Greek grains and a family milling heritage.',work:'I help improve the Shopify storefront through product-page updates, conversion research, and testing ideas that make shopping more intuitive.',services:['Shopify development','CRO','Product experience']},
  {id:'kevins',name:'Kevin’s Natural Foods',category:'Food & beverage',url:'https://www.kevinsnaturalfoods.com/',description:'A food brand making clean eating more convenient with prepared meals, entrées, and sauces.',work:'I support the Shopify experience with product-page development, nutrition information, and Bazaarvoice review integrations.',services:['Shopify development','Product pages','Review integrations']},
  {id:'ctwf',name:'Consider the Wldflwrs',category:'Fine jewelry',url:'https://considerthewldflwrs.com/',description:'A Nashville fine jewelry brand creating pieces for everyday wear and life’s meaningful moments.',work:'I work on Shopify theme improvements, product imagery and variant experiences, and conversion tracking to support a smoother path to purchase.',services:['Shopify development','Product experience','Analytics']},
  {id:'koia',name:'Koia',category:'Food & beverage',url:'https://drinkkoia.com/',description:'A plant-based beverage brand making protein shakes with low sugar and prebiotic fiber.',work:null,services:[]},
  {id:'gigit',name:'gigitAI',category:'Ecommerce technology',url:'https://gigit.ai/',description:'An AI platform for dynamic ecommerce storefronts and personalized product discovery.',work:null,services:[]},
  {id:'jpress',name:'J. Press',category:'Apparel & retail',url:'https://jpress.com/',description:'A heritage American menswear brand known for Ivy League style, tailoring, and classic wardrobe staples.',work:null,services:[]},
  {id:'unbound',name:'Unbound Snacks',category:'Food & beverage',url:'https://unboundsnacks.com/',description:'A family-grown California walnut brand turning roasted and seasoned walnuts into everyday snacks.',work:null,services:[]},
  {id:'somera',name:'SomeraRoad',category:'Real estate',url:'https://someraroadinc.com/',description:'A real estate investment and development firm focused on creating value in properties and communities.',work:null,services:[]},
  {id:'ohana-realty',name:'Ohana Realty',category:'Real estate & hospitality',url:'https://ohanarealty.com/',description:'A real estate brokerage representing homes in resort and residential communities.',work:'I own ongoing site maintenance and optimization for Ohana Realty and its associated property websites, including Panther National, Montage, Twin Dolphin, and Ohana Design & Build.',services:['Site maintenance','Optimization','Website ownership']},
  {id:'lym',name:'Love Your Melon',category:'Apparel & accessories',url:'https://loveyourmelon.com/',description:'A beanie and accessories brand supporting children and families affected by pediatric cancer.',work:null,services:[]},
  {id:'oceanfoam',name:'Oceanfoam',category:'Movement & wellness',url:'https://oceanfoam.com/',description:'A movement and recovery brand creating foam rollers, workout mats, and accessories using algae and recycled materials.',work:null,services:[]},
  {id:'tare',name:'Tare Market',category:'Sustainable retail',url:'https://www.thetaremarket.com/',description:'A sustainability-focused market offering bulk groceries, refillable essentials, and low-waste products for everyday living.',work:null,services:[]},
  {id:'richwife',name:'Rich Wife',category:'Apparel & accessories',url:'https://richwife.com/',description:'An apparel and accessories brand with signature caps, clothing, and a playful approach to personal style.',work:null,services:[]},
  {id:'served',name:'Served',category:'Home & entertaining',url:'https://shopserved.com/',description:'An insulated serveware brand making transportable bowls and pitchers that keep food and drinks hot or cold.',work:null,services:[]}
];

const animals = [
  ['create.png','10%','48%',1.04],['olyra.png','23%','42%',.95],['kevins.png','37%','45%',.98],['ctwf.png','8%','20%',.82],['koia.png','55%','44%',1],
  ['gigit.png','50%','60%',.92],['jpress.png','9%','64%',.94],['unbound.png','23%','58%',.9],['somera.png','38%','61%',1.03],['ohana-realty.png','57%','61%',.91],
  ['lym.png','78%','19%',.88],['oceanfoam.png','18%','76%',.94],['tare.png','33%','75%',.88],['richwife.png','47%','76%',1],['served.png','61%','76%',.9]
];

const field = document.querySelector('#animal-field');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const buttons = [];
let activeIndex = 0;
const pad = number => String(number).padStart(2, '0');

clients.forEach((client,index) => {
  const [art,x,y,scale] = animals[index];
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'animal';
  button.dataset.id = client.id;
  button.setAttribute('aria-label',`Explore ${client.name}`); button.setAttribute('aria-controls','client-name');
  button.style.setProperty('--x',x); button.style.setProperty('--y',y); button.style.setProperty('--scale',scale);
  button.innerHTML = `<span class="animal-shadow" aria-hidden="true"></span><img class="animal-face" src="animals/${art}" alt=""><span class="animal-tag" aria-hidden="true">${client.name}</span>`;
  button.addEventListener('pointerenter',() => { if (finePointer.matches) selectClient(index,true); });
  button.addEventListener('focus',() => selectClient(index,true)); button.addEventListener('click',() => selectClient(index,true));
  button.addEventListener('keydown',event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % clients.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + clients.length) % clients.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = clients.length - 1;
    if (next !== undefined) { event.preventDefault(); selectClient(next,true); buttons[next].focus(); }
  });
  field.append(button); buttons.push(button);
});

function playReaction(button) {
  if (reduceMotion.matches) return;
  button.classList.remove('is-reacting');
  void button.offsetWidth;
  button.classList.add('is-reacting');
}

function selectClient(index, shouldReact = false) {
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
  buttons.forEach((button,i) => button.setAttribute('aria-pressed',String(i === activeIndex)));
  if (shouldReact) playReaction(buttons[activeIndex]);
}

reduceMotion.addEventListener('change',() => {
  if (reduceMotion.matches) buttons.forEach(button => button.classList.remove('is-reacting'));
});
selectClient(0);
