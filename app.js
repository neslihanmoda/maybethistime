import { SITE, ARTICLES, CATEGORIES } from './data.js';

const root = document.getElementById('root');
const yearEl = document.getElementById('year');
yearEl.textContent = SITE.year;

function esc(s){return String(s||'')}

// Small router
function navigate(hash){location.hash = hash}

function formatDate(d){
  try{ return new Date(d).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}catch(e){return d}
}

// Components
function renderHome(){
  const lead = ARTICLES[0];
  const latest = ARTICLES.slice(1);
  root.innerHTML = `
    <section class="hero">
      <div class="lead-media"><a href="#/article/${lead.id}"><img loading="lazy" src="${lead.cover}" alt="${esc(lead.title)}"></a></div>
      <div class="lead-copy">
        <div class="label">${lead.category} • ${formatDate(lead.date)}</div>
        <h1 class="lead-title">${esc(lead.title)}</h1>
        <div class="lead-sub">${esc(lead.subtitle)}</div>
        <div class="lead-meta">By ${lead.author} • ${lead.minutes} min read</div>
        <a class="lead-cta" href="#/article/${lead.id}">Read feature →</a>
      </div>
    </section>

    <section class="section">
      <h2>THE LATEST</h2>
      <div class="latest-grid">
        ${latest.map(a=> `
          <article class="card">
            <a href="#/article/${a.id}" class="media"><img loading="lazy" src="${a.cover}" alt="${esc(a.title)}"></a>
            <div class="card-body">
              <div class="cat">${a.category}</div>
              <h3>${esc(a.title)}</h3>
              <p>${esc(a.subtitle||'')}</p>
              <div class="lead-meta">${a.author} • ${formatDate(a.date)}</div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="inframe section" aria-labelledby="inframe">
      <div class="big"><img loading="lazy" src="${ARTICLES[1].cover}" alt="Editorial image"></div>
      <aside class="meta">
        <h3>IN FRAME</h3>
        <h4>${escapeHtml(ARTICLES[1].title)}</h4>
        <p>${escapeHtml(ARTICLES[1].subtitle)}</p>
        <p class="muted">Photograph: ${ARTICLES[1].images[0]?.credit || '—'}</p>
        <a href="#/article/${ARTICLES[1].id}">View editorial →</a>
      </aside>
    </section>

    <section class="cover">
      <div class="cover-media"><a href="#/article/${ARTICLES[2].id}"><img loading="lazy" src="${ARTICLES[2].cover}" alt="Cover story"></a></div>
      <div class="cover-overlay">
        <h2>THE ART OF BECOMING SOMEONE ELSE</h2>
        <p>A short conversation with a performer who remakes identity through costume and persona.</p>
        <a href="#/article/${ARTICLES[2].id}" class="lead-cta">Read the interview →</a>
      </div>
    </section>

    <section class="section categories" aria-label="Discover by category">
      ${CATEGORIES.map(c=>`<a class="cat-pill" href="#/category/${encodeURIComponent(c)}"><h4>${c}</h4><p class="muted">Latest from ${c}</p></a>`).join('')}
    </section>

    <section class="section journal">
      <h2>The Journal</h2>
      <div class="entry"><h3>Dressing for a Life That Doesn’t Exist Yet</h3><p class="muted">An essay on sartorial futurity • Maya Lin</p></div>
      <div class="entry"><h3>The Internet Has a Memory Problem</h3><p class="muted">On archiving images in the digital age • Theo Park</p></div>
    </section>

    <section class="section">
      <h2>Image Archive</h2>
      <div class="grid-archive">
        ${ARTICLES.map(a=>`<a href="#/article/${a.id}"><img loading="lazy" src="${a.cover}" alt="${esc(a.title)}"></a>`).join('')}
      </div>
    </section>
  `;
}

function escapeHtml(s){return s.replace && s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function renderArticle(id){
  const a = ARTICLES.find(x=>x.id===id);
  if(!a){ root.innerHTML = `<p class="empty">Article not found.</p>`; return }
  root.innerHTML = `
    <article class="article-hero">
      <div class="article-header">
        <div>
          <div class="label">${a.category}</div>
          <h1 class="lead-title">${escapeHtml(a.title)}</h1>
          <div class="meta">By ${a.author} • ${formatDate(a.date)} • ${a.minutes} min</div>
        </div>
        <div>
          <img loading="lazy" src="${a.cover}" alt="${escapeHtml(a.title)}">
        </div>
      </div>
    </article>
    <div class="article-content">
      ${a.body.map(block=> renderBlock(block)).join('')}

      <div class="related">
        ${ARTICLES.filter(x=>x.id!==a.id).slice(0,2).map(r=>`<a href="#/article/${r.id}"><img loading="lazy" src="${r.cover}" alt="${escapeHtml(r.title)}" style="width:140px;height:90px;object-fit:cover"><div>${escapeHtml(r.title)}</div></a>`).join('')}
      </div>
    </div>
  `;
}

function renderBlock(b){
  if(b.type==='p') return `<p>${escapeHtml(b.text)}</p>`
  if(b.type==='sub') return `<h3>${escapeHtml(b.text)}</h3>`
  if(b.type==='quote') return `<div class="pull-quote">${escapeHtml(b.text)}</div>`
  return ''
}

function renderCategory(cat){
  const list = ARTICLES.filter(a=>a.category===cat);
  root.innerHTML = `
    <section class="section"><h2>${cat}</h2><p class="muted">A selection of writing and image work from the ${cat} desk.</p>
      <div class="latest-grid">${list.map(a=>`<article class="card"><a href="#/article/${a.id}" class="media"><img loading="lazy" src="${a.cover}" alt="${escapeHtml(a.title)}"></a><div class="card-body"><div class="cat">${a.category}</div><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.subtitle||'')}</p></div></article>`).join('')}</div>
    </section>
  `;
}

function renderAbout(){
  root.innerHTML = `<section class="section"><h2>About AFTERIMAGE</h2><p>AFTERIMAGE is an independent magazine devoted to the image — fashion, art, film and the practices that make them. Edited and art-directed in 2026.</p></section>`
}

function renderIssue(id){
  root.innerHTML = `<section class="section"><h2>ISSUE 001 — THE NEW IMAGE CULTURE</h2><p class="muted">Curated selections, editorials and essays from the issue.</p><div class="latest-grid">${ARTICLES.map(a=>`<article class="card"><a href="#/article/${a.id}" class="media"><img loading="lazy" src="${a.cover}" alt="${escapeHtml(a.title)}"></a><div class="card-body"><div class="cat">${a.category}</div><h3>${escapeHtml(a.title)}</h3></div></article>`).join('')}</div></section>`
}

function renderNotFound(){root.innerHTML = `<section class="section"><h2>Page not found</h2><p class="muted">Try the home page or search.</p></section>`}

// search
function openSearch(){
  const overlay = document.getElementById('search');
  overlay.setAttribute('aria-hidden','false');
  document.getElementById('searchOpen').setAttribute('aria-expanded','true');
  document.getElementById('q').focus();
}
function closeSearch(){
  const overlay = document.getElementById('search');
  overlay.setAttribute('aria-hidden','true');
  document.getElementById('searchOpen').setAttribute('aria-expanded','false');
}

function doSearch(q){
  const s = q.toLowerCase();
  const results = ARTICLES.filter(a=> (a.title+ ' ' + a.subtitle + ' ' + a.category + ' ' + (a.tags||[]).join(' ')).toLowerCase().includes(s));
  const el = document.getElementById('searchResults');
  if(results.length===0) el.innerHTML = `<p class="muted">No results for "${escapeHtml(q)}"</p>`;
  else el.innerHTML = results.map(r=>`<div class="result"><a href="#/article/${r.id}">${escapeHtml(r.title)}</a><div class="muted">${r.category} • ${formatDate(r.date)}</div></div>`).join('');
}

// newsletter demo
function openNewsletter(){
  const panel = document.getElementById('newsletter');
  panel.setAttribute('aria-hidden','false');
}
function closeNewsletter(){
  const panel = document.getElementById('newsletter');
  panel.setAttribute('aria-hidden','true');
}

// router
function handleHash(){
  const h = location.hash.replace(/^#\/?/,'');
  if(!h || h==='') return renderHome();
  const parts = h.split('/');
  if(parts[0]==='article') return renderArticle(parts[1]);
  if(parts[0]==='category') return renderCategory(decodeURIComponent(parts[1]));
  if(parts[0]==='about') return renderAbout();
  if(parts[0]==='issue') return renderIssue(parts[1]);
  renderNotFound();
}

// event bindings
window.addEventListener('hashchange', handleHash);
window.addEventListener('load', ()=>{ handleHash();
  document.getElementById('navToggle').addEventListener('click', ()=>{
    const list = document.getElementById('navList');
    const open = list.style.display === 'flex';
    list.style.display = open ? 'none' : 'flex';
    document.getElementById('navToggle').setAttribute('aria-expanded', String(!open));
  });
  document.getElementById('searchOpen').addEventListener('click', openSearch);
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  document.getElementById('searchForm').addEventListener('submit',(e)=>{e.preventDefault(); const q = document.getElementById('q').value.trim(); if(q) doSearch(q);});
  document.getElementById('newsletterForm').addEventListener('submit',(e)=>{e.preventDefault(); const em=document.getElementById('email'); if(!em.checkValidity()){ em.reportValidity(); return;} alert('Demo: subscription accepted (not stored). To enable real subscriptions, connect a mail provider.'); closeNewsletter();});
  document.getElementById('newsletterClose').addEventListener('click', closeNewsletter);
  document.querySelector('.newsletter-link').addEventListener('click',(e)=>{e.preventDefault(); openNewsletter();});
  document.getElementById('backTop').addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', ()=>{
    const bt=document.getElementById('backTop'); if(window.scrollY>600) bt.classList.add('show'); else bt.classList.remove('show');
  });
});

// share helper
export function shareArticle(title, url){
  if(navigator.share){ navigator.share({title, url}).catch(()=>{}); }
  else{ navigator.clipboard.writeText(url).then(()=> alert('Link copied to clipboard')); }
}
