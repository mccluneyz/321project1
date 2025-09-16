// Tide Together - Static SPA
// Data is persisted in localStorage for demo purposes

const STORAGE_KEYS = {
  USERS: 'tt_users',
  PROVIDERS: 'tt_providers',
  BOOKINGS: 'tt_bookings',
  REVIEWS: 'tt_reviews',
  MESSAGES: 'tt_messages',
  SESSION: 'tt_session'
};

const SERVICES = [
  'Esthetician','Tutor','Barber','Hairstylist','Joyride','Maintenance','Photography','Laundry','Cleaning','Pet Care'
];

function getTodayISO(){
  const d = new Date();
  const tz = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return tz.toISOString().slice(0,10);
}

function getISOAfterDays(days){
  const d = new Date();
  d.setDate(d.getDate() + days);
  const tz = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return tz.toISOString().slice(0,10);
}

function load(key, fallback){
  try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }catch{ return fallback; }
}
function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

function seed(){
  if(!load(STORAGE_KEYS.PROVIDERS)){
    const providers = [
      {
        id:'p1',
        name:'Ava Johnson',
        services:['Esthetician'],
        rating:4.9,
        reviewsCount:18,
        distanceMiles:1.2,
        bio:'Lash and nail specialist with 3+ years of experience and state license.',
        licenses:['State Esthetics License'],
        certifications:['Sanitation Certified'],
        portfolio:['https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop'],
        socials:{ instagram:'@ava.glow' },
        availability:[1,2,4],
        campus:'UA'
      },
      {
        id:'p2',
        name:'Marcus Lee',
        services:['Barber','Hairstylist'],
        rating:4.8,
        reviewsCount:25,
        distanceMiles:0.8,
        bio:'Precision fades and braids. Mobile appointments available on campus.',
        licenses:['Cosmetology License'],
        certifications:[],
        portfolio:['https://images.unsplash.com/photo-1593702275687-c3b6b7f1d1d5?q=80&w=1200&auto=format&fit=crop'],
        socials:{ instagram:'@cutsbyml' },
        availability:[3,5],
        campus:'UA'
      },
      {
        id:'p3',
        name:'Priya Patel',
        services:['Tutor'],
        rating:5.0,
        reviewsCount:12,
        distanceMiles:2.4,
        bio:'MIS/CS tutor for data structures, SQL, and systems. TA experience.',
        licenses:[],
        certifications:['CompTIA A+'],
        portfolio:[],
        socials:{ linkedin:'priya-patel' },
        availability:[1,2,3,4,5],
        campus:'UA'
      },
      {
        id:'p4',
        name:'Diego Ramirez',
        services:['Joyride','Maintenance'],
        rating:4.7,
        reviewsCount:9,
        distanceMiles:1.0,
        bio:'Rides around campus, jump starts, simple plumbing/electrical fixes.',
        licenses:['Valid Driver License'],
        certifications:['Basic Electrical Safety'],
        portfolio:[],
        socials:{ instagram:'@tidefix' },
        availability:[6,0],
        campus:'UA'
      }
    ];
    save(STORAGE_KEYS.PROVIDERS, providers);
  }
  if(!load(STORAGE_KEYS.REVIEWS)){
    save(STORAGE_KEYS.REVIEWS, [
      { id:'r1', providerId:'p1', user:'Sam', rating:5, text:'Great lashes and super professional!', createdAt: Date.now()-86400000*2 },
      { id:'r2', providerId:'p2', user:'Taylor', rating:4, text:'Clean fade and on time.', createdAt: Date.now()-86400000*5 }
    ]);
  }
  if(!load(STORAGE_KEYS.BOOKINGS)){
    save(STORAGE_KEYS.BOOKINGS, []);
  }
  if(!load(STORAGE_KEYS.MESSAGES)){
    save(STORAGE_KEYS.MESSAGES, []);
  }
}

// Simple router
const routes = {
  '#home': renderHome,
  '#browse': renderBrowse,
  '#profile': renderProfile,
  '#messages': renderMessages,
  '#support': renderSupport,
  '#admin': renderAdmin,
  '#auth': renderAuthGate,
  '#create-profile': renderCreateProfile,
  '#choose-service': renderChooseService,
  '#service-calendar': renderServiceCalendar,
  '#privacy': () => renderStatic('Privacy Policy coming soon.'),
  '#terms': () => renderStatic('Terms of Service coming soon.')
};

function navigate(hash){
  const required = gateIfNeeded(hash);
  const navLinks = document.querySelectorAll('.tt-nav__link');
  navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.route === (required || hash)));
  const route = routes[required || hash] || routes['#home'];
  route();
}

function gateIfNeeded(targetHash){
  const s = getSession();
  if(!s) return '#auth';
  if(!s.profile || !Array.isArray(s.profile.services) || s.profile.services.length === 0){
    return '#create-profile';
  }
  return null;
}

// Auth
function getSession(){ return load(STORAGE_KEYS.SESSION, null); }
function setSession(session){ save(STORAGE_KEYS.SESSION, session); updateAuthUI(); }
function updateAuthUI(){
  const s = getSession();
  const status = document.getElementById('authStatus');
  const loginBtn = document.getElementById('loginBtn');
  if(s){
    status.textContent = `${s.name} (${s.cwid})`;
    loginBtn.textContent = 'Sign out';
  } else {
    status.textContent = 'Guest';
    loginBtn.textContent = 'Sign in';
  }
}

// Render helpers
function h(strings, ...vals){
  return strings.reduce((acc, s, i) => acc + s + (vals[i] ?? ''), '');
}
function mount(html){ document.getElementById('app').innerHTML = html; }

function renderHome(){
  const gate = gateIfNeeded('#home');
  if(gate){ location.hash = gate; return; }
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const top = providers.slice(0,4);
  mount(h`
    <section class="tt-hero">
      <div>
        <h1 class="tt-hero__title">Find student services at student prices.</h1>
        <p class="tt-hero__subtitle">Book licensed and peer-recommended providers for everything from lashes to tutoring, right on campus.</p>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="tt-button" onclick="location.hash='#browse'">Browse Services</button>
          <button class="tt-button tt-button--outline" onclick="location.hash='#support'">Contact Support</button>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
          ${SERVICES.map(s => `<span class="tt-badge">${s}</span>`).join('')}
        </div>
      </div>
      <div class="tt-hero__card">
        <div class="tt-section-title">Trending providers</div>
        <div class="tt-grid">
        ${top.map(cardForProvider).join('')}
        </div>
      </div>
    </section>
  `);
}

function renderBrowse(){
  const gate = gateIfNeeded('#browse');
  if(gate){ location.hash = gate; return; }
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const params = new URLSearchParams(location.search);
  const q = params.get('q')?.toLowerCase() || '';
  const filtered = providers.filter(p => (
    p.name.toLowerCase().includes(q) ||
    p.services.join(',').toLowerCase().includes(q)
  ));

  mount(h`
    <section>
      <h2 class="tt-section-title">Browse services</h2>
      <div class="tt-filters">
        <input id="q" placeholder="Search service, provider..." value="${q}" oninput="onSearch(this.value)" style="flex:1;min-width:220px" />
        ${SERVICES.map(s => `<button class="tt-chip" onclick="toggleServiceFilter('${s}')">${s}</button>`).join('')}
        <button class="tt-chip" onclick="sortBy('rating')">Sort by rating</button>
        <button class="tt-chip" onclick="sortBy('distance')">Sort by distance</button>
        <button class="tt-chip" onclick="sortBy('reviews')">Sort by reviews</button>
      </div>
      <div class="tt-grid" id="results">
        ${filtered.map(cardForProvider).join('')}
      </div>
    </section>
  `);
}

function cardForProvider(p){
  const media = p.portfolio[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop';
  return h`
    <article class="tt-card">
      <div class="tt-card__media" style="background-image:url('${media}')"></div>
      <div class="tt-card__body">
        <div class="tt-card__title">${p.name}</div>
        <div class="tt-card__meta">${p.services.join(', ')} • ${p.distanceMiles} mi • ⭐ ${p.rating}</div>
        <div class="tt-card__actions">
          <button class="tt-button tt-button--ghost" onclick="viewProfile('${p.id}')">View</button>
          <button class="tt-button" onclick="openBooking('${p.id}')">Book</button>
        </div>
      </div>
    </article>
  `;
}

function viewProfile(id){
  location.hash = '#profile';
  history.replaceState(null, '', `#profile?id=${id}`);
  renderProfile();
}

function renderProfile(){
  const gate = gateIfNeeded('#profile');
  if(gate){ location.hash = gate; return; }
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const reviews = load(STORAGE_KEYS.REVIEWS, []);
  const id = new URL(location.href).hash.split('?')[1]?.split('=')[1];
  const p = providers.find(x => x.id === id) || providers[0];
  const pReviews = reviews.filter(r => r.providerId === p.id);

  mount(h`
    <section>
      <button class="tt-chip" onclick="location.hash='#browse'">← Back</button>
      <div class="tt-hero" style="margin-top:12px">
        <div>
          <h2 class="tt-section-title" style="margin:0">${p.name}</h2>
          <div class="tt-card__meta">${p.services.join(', ')} • ${p.distanceMiles} mi • ⭐ ${p.rating} (${p.reviewsCount})</div>
          <p>${p.bio}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0">
            ${p.licenses.map(l => `<span class='tt-badge tt-badge--green'>${l}</span>`).join('')}
            ${p.certifications.map(c => `<span class='tt-badge tt-badge--yellow'>${c}</span>`).join('')}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0">
            ${p.socials.instagram ? `<a class='tt-chip' href='https://instagram.com/${p.socials.instagram.replace('@','')}' target='_blank'>Instagram</a>`:''}
            ${p.socials.linkedin ? `<a class='tt-chip' href='https://www.linkedin.com/in/${p.socials.linkedin}' target='_blank'>LinkedIn</a>`:''}
          </div>
          <div class="tt-card__actions">
            <button class="tt-button" onclick="proposeSwap('${p.id}', '${p.services[0]}', '${getTodayISO()}')">Propose Swap</button>
            <button class="tt-button tt-button--outline" onclick="startDM('${p.id}')">Message</button>
          </div>
        </div>
        <div class="tt-hero__card">
          <div class="tt-section-title">Portfolio</div>
          <div class="tt-grid" style="grid-template-columns:repeat(2,1fr)">
            ${(p.portfolio.length? p.portfolio : [
              'https://images.unsplash.com/photo-1556228578-8fb87677aa6a?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop']
            ).slice(0,4).map(src => `<div class='tt-card__media' style='height:120px;background-image:url(${src})'></div>`).join('')}
          </div>
        </div>
      </div>

      <div style="margin-top:16px" class="tt-hero__card">
        <div class="tt-section-title">Reviews</div>
        ${pReviews.map(r => h`<div style="padding:8px 0;border-bottom:1px solid #eee">⭐ ${r.rating} — ${r.user}<br/>${r.text}</div>`).join('') || '<div>No reviews yet.</div>'}
        <div style="margin-top:8px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <select id="reviewRating">
            ${[5,4,3,2,1].map(v=>`<option value="${v}">${v} stars</option>`).join('')}
          </select>
          <input id="reviewText" placeholder="Write a review..." style="flex:1;min-width:220px" />
          <button class="tt-button tt-button--ghost" onclick="submitReview('${p.id}')">Submit</button>
        </div>
      </div>
    </section>
  `);
}

function renderMessages(){
  const session = getSession();
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threads = groupBy(messages.filter(m => m.to===session?.id || m.from===session?.id), m => m.threadId);
  mount(h`
    <section>
      <h2 class="tt-section-title">Messages</h2>
      ${session ? '' : '<div class="tt-card__meta">Sign in to view messages.</div>'}
      <div class="tt-grid">
        ${Object.values(threads).map(thread => {
          const last = thread[thread.length-1];
          const partner = last.from === session?.id ? last.toName : last.fromName;
          return h`<article class="tt-card"><div class="tt-card__body">
            <div class="tt-card__title">${partner}</div>
            <div class="tt-card__meta">${new Date(last.createdAt).toLocaleString()}</div>
            <div>${last.text}</div>
          </div></article>`
        }).join('') || '<div>No messages yet.</div>'}
      </div>
    </section>
  `);
}

function renderSupport(){
  mount(h`
    <section>
      <h2 class="tt-section-title">Contact Support</h2>
      <div class="tt-hero__card">
        <p>Need help or want to report a user? Send us a message.</p>
        <div class="tt-field"><label for="supEmail">Your Email</label><input id="supEmail" placeholder="you@crimson.ua.edu"></div>
        <div class="tt-field"><label for="supMsg">Message</label><textarea id="supMsg" rows="4" placeholder="Describe the issue..."></textarea></div>
        <button class="tt-button" onclick="alert('Support request submitted!')">Submit</button>
      </div>
    </section>
  `);
}

function renderAdmin(){
  const gate = gateIfNeeded('#admin');
  if(gate){ location.hash = gate; return; }
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  mount(h`
    <section>
      <h2 class="tt-section-title">Admin Dashboard</h2>
      <div class="tt-kpis">
        <div class="tt-kpi"><div class="tt-kpi__value">${providers.length}</div><div>Providers</div></div>
        <div class="tt-kpi"><div class="tt-kpi__value">${load(STORAGE_KEYS.BOOKINGS, []).length}</div><div>Bookings</div></div>
        <div class="tt-kpi"><div class="tt-kpi__value">${load(STORAGE_KEYS.REVIEWS, []).length}</div><div>Reviews</div></div>
        <div class="tt-kpi"><div class="tt-kpi__value">${load(STORAGE_KEYS.MESSAGES, []).length}</div><div>Messages</div></div>
      </div>
      <div class="tt-hero__card" style="margin-top:12px">
        <div class="tt-section-title">Manage Services</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${SERVICES.map(s => `<span class='tt-chip'>${s}</span>`).join('')}
        </div>
      </div>
      <div class="tt-hero__card" style="margin-top:12px">
        <div class="tt-section-title">Providers</div>
        <div class="tt-grid">
          ${providers.map(p => h`<article class='tt-card'><div class='tt-card__body'>
            <div class='tt-card__title'>${p.name}</div>
            <div class='tt-card__meta'>${p.services.join(', ')}</div>
            <div class='tt-card__actions'>
              <button class='tt-button tt-button--ghost' onclick="banProvider('${p.id}')">Remove/Ban</button>
            </div>
          </div></article>`).join('')}
        </div>
      </div>
    </section>
  `);
}

function renderStatic(text){ mount(`<section><p>${text}</p></section>`); }

// New: Auth Gate (full page)
function renderAuthGate(){
  mount(h`
    <section class="tt-hero__card" style="max-width:520px;margin:40px auto;">
      <h2 class="tt-section-title">Sign in to Tide Together</h2>
      <p class="tt-card__meta">Use your CWID and Crimson email to continue.</p>
      <div class="tt-field"><label for="cwid_page">CWID</label><input id="cwid_page" inputmode="numeric" placeholder="e.g., 12345678" /></div>
      <div class="tt-field"><label for="email_page">Crimson Email</label><input id="email_page" type="email" placeholder="first.last@crimson.ua.edu" /></div>
      <div class="tt-actions">
        <button class="tt-button" onclick="submitAuthPage()">Continue</button>
      </div>
    </section>
  `);
}

function submitAuthPage(){
  const cwid = document.getElementById('cwid_page').value.trim();
  const email = document.getElementById('email_page').value.trim();
  if(!/^\d{5,9}$/.test(cwid)){ alert('Enter a valid CWID.'); return; }
  if(!/@crimson\.ua\.edu$/i.test(email)){ alert('Use your Crimson email.'); return; }
  const name = email.split('@')[0].replace('.', ' ');
  setSession({ id:`u_${cwid}`, cwid, email, name, profile:null });
  location.hash = '#create-profile';
}

// New: Create Profile
function renderCreateProfile(){
  const s = getSession();
  if(!s){ location.hash = '#auth'; return; }
  mount(h`
    <section class="tt-hero__card" style="max-width:720px;margin:24px auto;">
      <h2 class="tt-section-title">Create your provider profile</h2>
      <p class="tt-card__meta">Select services you offer and your weekly availability.</p>
      <div class="tt-field">
        <label>Services Offered</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap" id="svcChoices">
          ${SERVICES.map(svc => `<label class='tt-chip'><input type='checkbox' value='${svc}' style='margin-right:6px'>${svc}</label>`).join('')}
        </div>
      </div>
      <div class="tt-field">
        <label>Weekly Availability</label>
        <div style="display:flex;gap:8px;flex-wrap:wrap" id="availChoices">
          ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=>`<label class='tt-chip'><input type='checkbox' value='${i}' style='margin-right:6px'>${d}</label>`).join('')}
        </div>
      </div>
      <div class="tt-field"><label for="bio_page">Short bio</label><textarea id="bio_page" rows="3" placeholder="Tell others about your experience..."></textarea></div>
      <div class="tt-actions">
        <button class="tt-button" onclick="submitProfileCreate()">Save Profile</button>
      </div>
    </section>
  `);
}

function submitProfileCreate(){
  const s = getSession();
  const services = Array.from(document.querySelectorAll('#svcChoices input:checked')).map(i=>i.value);
  const availability = Array.from(document.querySelectorAll('#availChoices input:checked')).map(i=>Number(i.value));
  const bio = document.getElementById('bio_page').value.trim();
  if(services.length===0){ alert('Select at least one service you offer.'); return; }
  const profile = { services, availability, bio, licenses:[], certifications:[], portfolio:[], socials:{} };
  const nextSession = { ...s, profile };
  setSession(nextSession);
  // also add to PROVIDERS list if not present
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  if(!providers.find(p => p.id === s.id)){
    providers.push({ id:s.id, name:s.name, services, rating:5.0, reviewsCount:0, distanceMiles:0.5, bio, licenses:[], certifications:[], portfolio:[], socials:{}, availability, campus:'UA' });
    save(STORAGE_KEYS.PROVIDERS, providers);
  }
  location.hash = '#choose-service';
}

// New: Choose Service then Calendar
function renderChooseService(){
  const gate = gateIfNeeded('#choose-service');
  if(gate){ location.hash = gate; return; }
  mount(h`
    <section class="tt-hero__card" style="max-width:560px;margin:24px auto;">
      <h2 class="tt-section-title">What service are you looking to swap?</h2>
      <div class="tt-field">
        <select id="svcSelect">${SERVICES.map(s=>`<option value='${s}'>${s}</option>`).join('')}</select>
      </div>
      <div class="tt-actions">
        <button class="tt-button" onclick="goToCalendar()">See Availability</button>
      </div>
    </section>
  `);
}

function goToCalendar(){
  const svc = document.getElementById('svcSelect').value;
  history.replaceState(null, '', `#service-calendar?svc=${encodeURIComponent(svc)}`);
  renderServiceCalendar();
}

function renderServiceCalendar(){
  const gate = gateIfNeeded('#service-calendar');
  if(gate){ location.hash = gate; return; }
  const svc = new URL(location.href).hash.split('?')[1]?.split('=')[1];
  const providers = load(STORAGE_KEYS.PROVIDERS, []).filter(p => p.services.includes(decodeURIComponent(svc||'')));
  const days = Array.from({length:14}, (_,i)=>{
    const d = new Date(); d.setDate(d.getDate()+i);
    return { date: getISOAfterDays(i), dow: d.getDay(), label: d.toLocaleDateString(undefined,{weekday:'short', month:'short', day:'numeric'}) };
  });
  mount(h`
    <section>
      <h2 class="tt-section-title">${decodeURIComponent(svc||'Service')} availability (next 14 days)</h2>
      <div class="tt-grid">
        ${days.map(day => {
          const available = providers.filter(p => p.availability?.includes(day.dow));
          return h`<article class='tt-card'>
            <div class='tt-card__body'>
              <div class='tt-card__title'>${day.label}</div>
              <div class='tt-card__meta'>${available.length} providers</div>
              <div style='display:flex;flex-direction:column;gap:8px;margin-top:8px'>
                ${available.slice(0,6).map(p => h`
                  <div style='display:flex;justify-content:space-between;align-items:center;gap:8px'>
                    <div>${p.name} • ⭐ ${p.rating}</div>
                    <div>
                      <button class='tt-button tt-button--ghost' onclick="viewProfile('${p.id}')">View</button>
                      <button class='tt-button' onclick="proposeSwap('${p.id}', '${decodeURIComponent(svc||'')}', '${day.date}')">DM to Swap</button>
                    </div>
                  </div>
                `).join('')}
                ${available.length>6? `<div class='tt-card__meta'>+${available.length-6} more</div>`:''}
              </div>
            </div>
          </article>`
        }).join('')}
      </div>
    </section>
  `);
}

// Interactions
function onSearch(v){
  const url = new URL(location.href);
  url.searchParams.set('q', v);
  history.replaceState(null, '', url.toString());
  renderBrowse();
}

function sortBy(kind){
  // client sort just reorders DOM by re-rendering filtered array with sort
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const q = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
  let arr = providers.filter(p => (
    p.name.toLowerCase().includes(q) || p.services.join(',').toLowerCase().includes(q)
  ));
  if(kind==='rating') arr.sort((a,b)=>b.rating-a.rating);
  if(kind==='distance') arr.sort((a,b)=>a.distanceMiles-b.distanceMiles);
  if(kind==='reviews') arr.sort((a,b)=>b.reviewsCount-a.reviewsCount);
  document.getElementById('results').innerHTML = arr.map(cardForProvider).join('');
}

function toggleServiceFilter(svc){
  const q = new URLSearchParams(location.search).get('q') || '';
  const next = q ? `${q} ${svc}` : svc;
  onSearch(next);
}

// Booking flow
function openBooking(providerId){
  // Deprecated booking flow replaced by swap proposal
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const p = providers.find(x => x.id === providerId);
  proposeSwap(providerId, p.services[0], getTodayISO());
}

function submitBooking(){ /* no-op in swap model */ }

function proposeSwap(providerId, service, date){
  const session = getSession();
  if(!session){ alert('Please sign in.'); location.hash = '#auth'; return; }
  const p = load(STORAGE_KEYS.PROVIDERS, []).find(x=>x.id===providerId);
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadId = `t_${[session.id, providerId].sort().join('_')}`;
  const text = `Hi ${p.name}, would you like to swap services? I can offer ${session.profile?.services?.[0] || 'my service'} for your ${service} on ${date}.`;
  messages.push({ id:`m_${Date.now()}`, threadId, from: session.id, fromName: session.name, to: providerId, toName: p.name, text, createdAt: Date.now() });
  save(STORAGE_KEYS.MESSAGES, messages);
  location.hash = '#messages';
}

function submitReview(providerId){
  const session = getSession();
  if(!session){ alert('Please sign in to review.'); return; }
  const rating = Number(document.getElementById('reviewRating').value);
  const text = document.getElementById('reviewText').value.trim();
  if(!text){ alert('Write something for your review.'); return; }
  const reviews = load(STORAGE_KEYS.REVIEWS, []);
  reviews.push({ id:`r_${Date.now()}`, providerId, user: session.name, rating, text, createdAt: Date.now() });
  save(STORAGE_KEYS.REVIEWS, reviews);
  renderProfile();
}

function startDM(providerId){
  const session = getSession();
  if(!session){ alert('Please sign in to message.'); return; }
  const p = load(STORAGE_KEYS.PROVIDERS, []).find(x=>x.id===providerId);
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadId = `t_${[session.id, providerId].sort().join('_')}`;
  messages.push({ id:`m_${Date.now()}`, threadId, from: session.id, fromName: session.name, to: providerId, toName: p.name, text:'Hi! Is this time available?', createdAt: Date.now() });
  save(STORAGE_KEYS.MESSAGES, messages);
  location.hash = '#messages';
}

function banProvider(id){
  if(!confirm('Remove/ban this provider?')) return;
  let providers = load(STORAGE_KEYS.PROVIDERS, []);
  providers = providers.filter(p => p.id !== id);
  save(STORAGE_KEYS.PROVIDERS, providers);
  renderAdmin();
}

// Auth dialog events
document.getElementById('loginBtn').addEventListener('click', () => {
  const s = getSession();
  if(s){ setSession(null); navigate(location.hash || '#home'); return; }
  document.getElementById('authDialog').showModal();
});

document.getElementById('authSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const cwid = document.getElementById('cwid').value.trim();
  const email = document.getElementById('email').value.trim();
  if(!/^\d{5,9}$/.test(cwid)){ alert('Enter a valid CWID.'); return; }
  if(!/@crimson\.ua\.edu$/i.test(email)){ alert('Use your Crimson email.'); return; }
  const name = email.split('@')[0].replace('.', ' ');
  setSession({ id:`u_${cwid}`, cwid, email, name });
  document.getElementById('authDialog').close();
  navigate('#home');
});

// Utilities
function groupBy(arr, keyFn){
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {});
}

// Init
seed();
updateAuthUI();

window.addEventListener('hashchange', () => navigate(location.hash));
document.querySelectorAll('.tt-nav__link').forEach(btn => btn.addEventListener('click', (e)=>{
  const route = e.currentTarget.getAttribute('data-route');
  location.hash = route;
}));

navigate(location.hash || '#home');


