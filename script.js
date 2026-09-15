const products=[
{id:1,name:"Wave Triptych Tee",color:"Black ↔ White",filter:"black graphic",img:"assets/wave_black.webp",hover:"assets/wave_white.webp",price:2950,old:3500,desc:"Triptych-inspired artwork with a clean NCN front and graphic back.",colors:["Black","White"],sizes:["S","M","L","XL"]},
{id:2,name:"Dragon Tee",color:"Black ↔ White",filter:"black graphic",img:"assets/dragon_black.webp",hover:"assets/dragon_white.webp",price:2950,old:3500,desc:"A bold dragon graphic built for the next generation of NCN.",colors:["Black","White"],sizes:["S","M","L","XL"]},
{id:3,name:"Just Do It Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/just_white.webp",hover:"assets/just_black.webp",price:2950,old:3500,desc:"Minimal front branding with a sharp Japanese-inspired back graphic.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:4,name:"Courage Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/courage_white.webp",hover:"assets/courage_black.webp",price:2950,old:3500,desc:"A statement graphic built around courage, freedom and presence.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:5,name:"Night City Tee",color:"Black",filter:"black graphic",img:"assets/night_black.webp",price:2950,old:3500,desc:"A cinematic night-city graphic on a heavyweight NCN tee.",colors:["Black"],sizes:["S","M","L","XL"]},
{id:6,name:"Samurai Blossom Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/samurai_blossom_white.webp",hover:"assets/samurai_blossom_black.webp",price:2950,old:3500,desc:"Samurai artwork with blossom details and a clean NCN front.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:7,name:"Ronin Tee",color:"Sand ↔ Black",filter:"sand graphic",img:"assets/ronin_sand.webp",hover:"assets/ronin_black_old.webp",price:2950,old:3500,desc:"Ronin-inspired artwork offered in sand and black.",colors:["Sand","Black"],sizes:["S","M","L","XL"]},
{id:8,name:"Minimal NCN Tee",color:"Black",filter:"black",img:"assets/minimal_black.png",price:2950,old:3500,desc:"Clean NCN branding for a quieter streetwear look.",colors:["Black"],sizes:["S","M","L","XL"]},
{id:9,name:"Porsche Heritage Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/porsche_white.webp",hover:"assets/porsche_black.webp",price:2950,old:3500,desc:"Automotive heritage graphic with a clean NCN front.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:10,name:"FOCUS Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/focus_white.png",hover:"assets/focus_black.png",price:2950,old:3500,desc:"A clean NCN front with the FOCUS graphic on the back.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:11,name:"WE ARE WHO WE ARE Tee",color:"Black",filter:"black graphic",img:"assets/we_are_who_we_are_black.png",price:2950,old:3500,desc:"A bold statement graphic with a red accent.",colors:["Black"],sizes:["S","M","L","XL"]},
{id:12,name:"Mustang GT 1969 Tee",color:"Black ↔ White",filter:"black graphic",img:"assets/mustang_black.jpg",hover:"assets/mustang_white.jpg",price:2950,old:3500,desc:"Classic 60s muscle-era artwork featuring the Ford Mustang GT 1969.",colors:["Black","White"],sizes:["S","M","L","XL"]},
{id:13,name:"Anime Eyes Tee",color:"Black ↔ White",filter:"black graphic",img:"assets/anime_eyes_black.png",hover:"assets/anime_eyes_white.png",price:2950,old:3500,desc:"High-contrast manga-style eyes arranged into a graphic back composition.",colors:["Black","White"],sizes:["S","M","L","XL"]},
{id:14,name:"Shadow Warrior Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/shadow_white.jpg",hover:"assets/shadow_black.jpg",price:2950,old:3500,desc:"A monochrome warrior graphic cut through geometric panels.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:15,name:"New Beginnings Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/new_beginnings_white.jpg",hover:"assets/new_beginnings_black.jpg",price:2950,old:3500,desc:"Hana no Ki — a tree graphic representing change, growth and new beginnings.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:16,name:"Never Look Back Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/never_look_back_white.webp",hover:"assets/never_look_back_black.webp",price:2950,old:3500,desc:"Never Look Back graphic with a bold Brooklyn-inspired streetwear composition.",colors:["White","Black"],sizes:["S","M","L","XL"]},
{id:17,name:"Main Character Syndrome Tee",color:"White ↔ Black",filter:"white graphic",img:"assets/main_character_syndrome_white.webp",hover:"assets/main_character_syndrome_black.webp",price:2950,old:3500,desc:"Main Character Syndrome graphic built around perspective, ambition and city life.",colors:["White","Black"],sizes:["S","M","L","XL"]}
];

let cart=JSON.parse(localStorage.getItem("ncn_cart")||"[]");
let wish=JSON.parse(localStorage.getItem("ncn_wish")||"[]");
let currentFilter="all";
let searchTerm="";

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=n=>`Rs. ${Number(n).toLocaleString()}`;

function toast(message){
  const el=$("#toast");
  if(!el)return;
  el.textContent=message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

function persist(){
  localStorage.setItem("ncn_cart",JSON.stringify(cart));
  localStorage.setItem("ncn_wish",JSON.stringify(wish));
  renderCounts();
}

function renderCounts(){
  const cartCount=$("#cartCount"), wishCount=$("#wishCount");
  if(cartCount)cartCount.textContent=cart.reduce((sum,item)=>sum+(Number(item.qty)||0),0);
  if(wishCount)wishCount.textContent=wish.length;
}

function matchesFilter(p){
  if(currentFilter==="all")return true;
  if(currentFilter==="graphic")return p.filter.includes("graphic");
  return p.filter.includes(currentFilter)||p.colors.some(c=>c.toLowerCase()===currentFilter);
}

function matchesSearch(p){
  if(!searchTerm)return true;
  const q=searchTerm.toLowerCase();
  return `${p.name} ${p.color} ${p.desc}`.toLowerCase().includes(q);
}

function productMedia(p){
  if(p.hover){
    return `<div class="variant-pair" data-hover-swap="true">
      <div class="variant-shot"><span>${p.colors[0].toUpperCase()}</span><img src="${p.img}" alt="${p.name} — ${p.colors[0]}" loading="lazy" decoding="async"></div>
      <div class="variant-shot"><span>${p.colors[1].toUpperCase()}</span><img src="${p.hover}" alt="${p.name} — ${p.colors[1]}" loading="lazy" decoding="async"></div>
    </div>`;
  }
  return `<img class="primary-img" src="${p.img}" alt="${p.name}" loading="lazy" decoding="async">`;
}

function productCard(p){
  return `<article class="product" data-filter="${p.filter}" data-product-id="${p.id}">
    <div class="product-img">
      ${p.old?'<span class="sale">SALE</span>':''}
      <button class="wish" type="button" data-action="wish" data-id="${p.id}" aria-label="${wish.includes(p.id)?'Remove':'Add'} ${p.name} ${wish.includes(p.id)?'from':'to'} wishlist">${wish.includes(p.id)?"♥":"♡"}</button>
      ${productMedia(p)}
    </div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <p>${p.color} · 220 GSM · OVERSIZED</p>
      <div class="price"><span class="old">${money(p.old)}</span><span class="new">${money(p.price)}</span></div>
      <div class="product-actions">
        <button type="button" data-action="view" data-id="${p.id}">VIEW</button>
        <button type="button" data-action="add" data-id="${p.id}">ADD TO BAG</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(){
  const grid=$("#productGrid");
  if(!grid)return;
  const list=products.filter(matchesFilter).filter(matchesSearch);
  grid.innerHTML=list.length?list.map(productCard).join(""):`<div class="empty-results">NO PRODUCTS FOUND.</div>`;
}

function toggleWish(id){
  wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];
  persist();
  renderProducts();
  renderWishlist();
  const p=products.find(x=>x.id===id);
  toast(wish.includes(id)?`${p.name} saved to wishlist`:`${p.name} removed from wishlist`);
}

function addCart(id,size="M"){
  const p=products.find(x=>x.id===id);
  if(!p)return;
  const existing=cart.find(x=>x.id===id&&x.size===size&&!x.bundleGroup);
  if(existing)existing.qty=(Number(existing.qty)||0)+1;
  else cart.push({id,size,qty:1});
  persist();
  renderCart();
  toast(`${p.name} added to bag`);
}

function removeCart(index){
  if(index<0||index>=cart.length)return;
  cart.splice(index,1);
  persist();
  renderCart();
}

function changeQty(index,delta){
  const item=cart[index];
  if(!item)return;
  item.qty=(Number(item.qty)||1)+delta;
  if(item.qty<=0)cart.splice(index,1);
  persist();
  renderCart();
}

function cartTotal(){
  const groups={};
  let total=0;
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);
    if(!p)return;
    if(item.bundleGroup)groups[item.bundleGroup]=(groups[item.bundleGroup]||0)+p.price*item.qty;
    else total+=p.price*item.qty;
  });
  Object.values(groups).forEach(v=>total+=Math.min(5500,v));
  return total;
}

function renderCart(){
  const box=$("#cartItems"), total=$("#cartTotal");
  if(!box)return;
  if(!cart.length){box.innerHTML="<p class='empty-drawer'>YOUR BAG IS EMPTY.</p>";if(total)total.textContent=money(0);return;}
  box.innerHTML=cart.map((item,index)=>{
    const p=products.find(x=>x.id===item.id);
    if(!p)return "";
    return `<div class="cart-item">
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-main"><strong>${p.name}</strong><small>${item.size} · Qty ${item.qty}</small><b>${money(p.price*item.qty)}</b>
        <div class="qty-controls"><button type="button" data-action="qty-minus" data-index="${index}">−</button><span>${item.qty}</span><button type="button" data-action="qty-plus" data-index="${index}">+</button></div>
      </div>
      <button class="remove-cart" type="button" data-action="remove-cart" data-index="${index}" aria-label="Remove ${p.name}">×</button>
    </div>`;
  }).join("");
  if(total)total.textContent=money(cartTotal());
}

function renderWishlist(){
  const box=$("#wishlistItems");
  if(!box)return;
  if(!wish.length){box.innerHTML="<p class='empty-drawer'>NO SAVED ITEMS.</p>";return;}
  box.innerHTML=wish.map(id=>{
    const p=products.find(x=>x.id===id);if(!p)return "";
    return `<div class="wishlist-row"><img src="${p.img}" alt="${p.name}"><div><strong>${p.name}</strong><small>${money(p.price)}</small></div><button type="button" data-action="wish-add" data-id="${p.id}">ADD →</button></div>`;
  }).join("");
}

function openDrawer(id){
  closeDrawers();
  const drawer=$(id);if(drawer)drawer.classList.add("open");
  $("#drawerOverlay")?.classList.add("open");
}
function closeDrawers(){$$(".drawer").forEach(x=>x.classList.remove("open"));$("#drawerOverlay")?.classList.remove("open");}

function openSearch(){
  const panel=$("#searchPanel");
  if(!panel)return;
  panel.classList.add("open");
  panel.setAttribute("aria-hidden","false");
  setTimeout(()=>$("#searchInput")?.focus(),30);
}
function closeSearch(){
  const panel=$("#searchPanel");
  if(panel){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");}
}

function openModal(id){
  const modal=$(id);if(!modal)return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function closeModal(){
  $$(".modal").forEach(m=>{m.classList.remove("open");m.setAttribute("aria-hidden","true")});
  document.body.classList.remove("modal-open");
}

function openProduct(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const detail=$("#productDetail");if(!detail)return;
  const paired=Boolean(p.hover);
  detail.innerHTML=`<div class="detail-grid">
    <div class="detail-media">
      ${paired?`<div class="detail-pair">${p.colors.map((c,i)=>`<div><span>${c.toUpperCase()}</span><img src="${i===0?p.img:p.hover}" alt="${p.name} — ${c}"></div>`).join("")}</div>`:`<img id="detailImg" src="${p.img}" alt="${p.name}">`}
      <div class="colour-pills">${p.colors.map((c,i)=>`<button type="button" class="colour-pill ${i===0?'active':''}" data-action="detail-colour" data-id="${p.id}" data-colour-index="${i}">${c}</button>`).join("")}</div>
    </div>
    <div class="detail-info">
      <span class="kicker">${p.color} · DROP 01</span><h2>${p.name}</h2><p>${p.desc}</p>
      <p><b>220 GSM</b> · 100% cotton · heavyweight · oversized fit · DTF graphic.</p>
      <div class="detail-price"><s>${money(p.old)}</s> <b>${money(p.price)}</b></div>
      <label class="size-select-label">SELECT SIZE<select id="detailSize">${p.sizes.map(s=>`<option value="${s}">${s}</option>`).join("")}</select></label>
      <button class="btn light full" type="button" data-action="detail-add" data-id="${p.id}">ADD TO BAG →</button>
    </div>
  </div>`;
  openModal("#productModal");
}

function setDetailColour(id,index){
  const p=products.find(x=>x.id===id);if(!p)return;
  const img=$("#detailImg");
  if(img)img.src=index===0?p.img:(p.hover||p.img);
  $$(".colour-pill").forEach((b,i)=>b.classList.toggle("active",i===index));
}

function whatsappOrder(){
  if(!cart.length){toast("YOUR BAG IS EMPTY");return;}
  const lines=cart.map(item=>{const p=products.find(x=>x.id===item.id);return p?`• ${p.name} — Size ${item.size} × ${item.qty}`:null}).filter(Boolean);
  const message=`Hi NCN! I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${money(cartTotal())}`;
  window.open(`https://wa.me/94702248113?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
}

function closeMobileMenu(){
  const menu=$("#mobileMenu");
  menu?.classList.remove("open");
  menu?.setAttribute("aria-hidden","true");
}

function bindEvents(){
  $("#searchBtn")?.addEventListener("click",openSearch);
  $(".close-panel")?.addEventListener("click",closeSearch);
  $("#searchPanel")?.addEventListener("click",e=>{if(e.target===e.currentTarget)closeSearch()});
  $("#searchInput")?.addEventListener("input",e=>{searchTerm=e.target.value.trim();renderProducts()});

  $$(".filter").forEach(button=>button.addEventListener("click",()=>{
    currentFilter=button.dataset.filter||"all";
    $$(".filter").forEach(b=>b.classList.toggle("active",b===button));
    renderProducts();
  }));

  $("#cartBtn")?.addEventListener("click",()=>{renderCart();openDrawer("#cartDrawer")});
  $("#wishlistBtn")?.addEventListener("click",()=>{renderWishlist();openDrawer("#wishlistDrawer")});
  $(".close-drawer")?.forEach?.(()=>{});
  $$(".close-drawer").forEach(b=>b.addEventListener("click",closeDrawers));
  $("#drawerOverlay")?.addEventListener("click",closeDrawers);
  $("#checkoutBtn")?.addEventListener("click",whatsappOrder);

  $("#sizeBtn")?.addEventListener("click",()=>openModal("#sizeModal"));

  $("#menuBtn")?.addEventListener("click",()=>{
    const menu=$("#mobileMenu");if(!menu)return;
    const open=menu.classList.toggle("open");menu.setAttribute("aria-hidden",open?"false":"true");
  });
  $("#mobileMenuClose")?.addEventListener("click",closeMobileMenu);
  $$("#mobileMenu a").forEach(a=>a.addEventListener("click",closeMobileMenu));

  document.addEventListener("click",e=>{
    const actionEl=e.target.closest("[data-action]");
    if(!actionEl)return;
    const action=actionEl.dataset.action;
    const id=Number(actionEl.dataset.id);
    if(action==="wish")toggleWish(id);
    else if(action==="view")openProduct(id);
    else if(action==="add")addCart(id);
    else if(action==="remove-cart")removeCart(Number(actionEl.dataset.index));
    else if(action==="qty-minus")changeQty(Number(actionEl.dataset.index),-1);
    else if(action==="qty-plus")changeQty(Number(actionEl.dataset.index),1);
    else if(action==="wish-add"){addCart(id);toggleWish(id);}
    else if(action==="detail-colour")setDetailColour(id,Number(actionEl.dataset.colourIndex));
    else if(action==="detail-add"){addCart(id,$("#detailSize")?.value||"M");closeModal();}
  });

  document.addEventListener("click",e=>{
    const close=e.target.closest("[data-close-modal],.modal-close");
    if(close){e.preventDefault();closeModal();return;}
    if(e.target.classList?.contains("modal"))closeModal();
  });

  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape")return;
    closeModal();closeDrawers();closeSearch();closeMobileMenu();
  });

  // Smooth anchor navigation for internal links.
  $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const target=$(a.getAttribute("href"));
    if(!target)return;
    e.preventDefault();
    closeMobileMenu();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  }));
}

function init(){
  bindEvents();
  renderProducts();
  renderCounts();
  renderCart();
  renderWishlist();
  const loader=$("#loader");
  if(loader){setTimeout(()=>loader.style.opacity="0",700);setTimeout(()=>loader.remove(),1200)}
}

document.addEventListener("DOMContentLoaded",init);
