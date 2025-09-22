// Tide Together - Static SPA
// Data is persisted in localStorage for demo purposes

const STORAGE_KEYS = {
  USERS: 'tt_users',
  PROVIDERS: 'tt_providers',
  BOOKINGS: 'tt_bookings',
  REVIEWS: 'tt_reviews',
  MESSAGES: 'tt_messages',
  SESSION: 'tt_session',
  SUPPORT_REQUESTS: 'tt_support_requests'
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
  // Clear existing data to ensure fresh start with updated provider info
  localStorage.removeItem(STORAGE_KEYS.PROVIDERS);
  if(!load(STORAGE_KEYS.PROVIDERS)){
    const providers = [
      {
        id:'p1',
        name:'Ava Johnson',
        services:['Esthetician'],
        rating:4.9,
        reviewsCount:18,
        distanceMiles:1.2,
        bio:'Professional esthetician specializing in eyelash extensions, eyebrow shaping, and nail art. Licensed with 3+ years of experience. I provide mobile services on campus and maintain the highest standards of hygiene and safety.',
        licenses:['State Esthetics License', 'Mobile Service Permit'],
        certifications:['Sanitation Certified', 'Advanced Lash Extension Training', 'Nail Art Specialist'],
        portfolio:[
          'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1570172619644-dfd03ed5f881?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200&auto=format&fit=crop'
        ],
        socials:{ instagram:'@ava.glow', tiktok:'@avabeauty' },
        availability:[1,2,4],
        campus:'UA',
        cwid:'12345678',
        email:'ava.johnson@crimson.ua.edu'
      },
      {
        id:'p2',
        name:'Marcus Lee',
        services:['Barber','Hairstylist'],
        rating:4.8,
        reviewsCount:25,
        distanceMiles:0.8,
        bio:'Master barber specializing in precision fades, braids, and modern cuts. 4+ years experience with mobile appointments available on campus. I stay updated with the latest trends and techniques in men\'s and women\'s hair styling.',
        licenses:['Cosmetology License', 'Barber License'],
        certifications:['Master Barber Certification', 'Braiding Specialist', 'Color Theory Certified'],
        portfolio:[
          'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop'
        ],
        socials:{ instagram:'@cutsbyml', tiktok:'@marcuscuts' },
        availability:[3,5],
        campus:'UA',
        cwid:'23456789',
        email:'marcus.lee@crimson.ua.edu'
      },
      {
        id:'p3',
        name:'Priya Patel',
        services:['Tutor'],
        rating:5.0,
        reviewsCount:12,
        distanceMiles:2.4,
        bio:'Senior Computer Science student and Teaching Assistant specializing in MIS/CS courses. Expert in data structures, algorithms, SQL, and systems programming. Available for one-on-one tutoring and group study sessions.',
        licenses:[],
        certifications:['CompTIA A+', 'Teaching Assistant Certification', 'AWS Cloud Practitioner', 'Google Data Analytics'],
        portfolio:[
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop'
        ],
        socials:{ linkedin:'priya-patel-cs', github:'priyapatel' },
        availability:[1,2,3,4,5],
        campus:'UA',
        cwid:'34567890',
        email:'priya.patel@crimson.ua.edu'
      },
      {
        id:'p4',
        name:'Diego Ramirez',
        services:['Joyride','Maintenance'],
        rating:4.7,
        reviewsCount:9,
        distanceMiles:1.0,
        bio:'Reliable transportation and handyman services around campus. I provide rides, jump starts, and basic maintenance including plumbing and electrical fixes. CPR certified with a clean driving record.',
        licenses:['Valid Driver License', 'Commercial Vehicle Permit'],
        certifications:['Basic Electrical Safety', 'CPR Certified', 'First Aid Certified', 'Automotive Repair Basics'],
        portfolio:[
          'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop'
        ],
        socials:{ instagram:'@tidefix', facebook:'DiegoRamirezServices' },
        availability:[6,0],
        campus:'UA',
        cwid:'45678901',
        email:'diego.ramirez@crimson.ua.edu'
      },
      {
        id:'p5',
        name:'Sophia Chen',
        services:['Photography'],
        rating:4.9,
        reviewsCount:15,
        distanceMiles:1.5,
        bio:'Professional photographer specializing in portraits, events, and lifestyle photography. Available for graduation photos, parties, and special events on campus. High-quality equipment and quick turnaround times.',
        licenses:['Business Photography License'],
        certifications:['Adobe Certified Professional', 'Wedding Photography Specialist', 'Portrait Photography Master'],
        portfolio:[
          'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1554048612-b6a4bc4ff292?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'
        ],
        socials:{ instagram:'@sophia.captures', portfolio:'sophiachenphoto.com' },
        availability:[1,2,3,4,5,6],
        campus:'UA',
        cwid:'56789012',
        email:'sophia.chen@crimson.ua.edu'
      },
      {
        id:'p6',
        name:'Jake Thompson',
        services:['Pet Care'],
        rating:4.8,
        reviewsCount:22,
        distanceMiles:0.5,
        bio:'Animal lover and experienced pet sitter. I provide dog walking, pet sitting, and basic grooming services. Available for overnight care and have experience with various breeds and special needs pets.',
        licenses:['Pet Care Business License'],
        certifications:['Pet First Aid Certified', 'Dog Training Basics', 'Animal Behavior Specialist'],
        portfolio:[
          'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop'
        ],
        socials:{ instagram:'@jakespetcare', facebook:'JakesPetCareUA' },
        availability:[1,2,3,4,5,6,0],
        campus:'UA',
        cwid:'67890123',
        email:'jake.thompson@crimson.ua.edu'
      }
    ];
    save(STORAGE_KEYS.PROVIDERS, providers);
  }
  if(!load(STORAGE_KEYS.REVIEWS)){
    save(STORAGE_KEYS.REVIEWS, [
      { id:'r1', providerId:'p1', user:'Sam', rating:5, text:'Ava did an amazing job on my lash extensions! Super professional and clean workspace.', createdAt: Date.now()-86400000*2 },
      { id:'r2', providerId:'p2', user:'Taylor', rating:4, text:'Marcus gave me the perfect fade. Really knows his craft and was on time.', createdAt: Date.now()-86400000*5 },
      { id:'r3', providerId:'p2', user:'Jordan', rating:5, text:'Best haircut I\'ve had on campus! Marcus is incredibly skilled with braids too.', createdAt: Date.now()-86400000*3 },
      { id:'r4', providerId:'p3', user:'Alex', rating:5, text:'Priya helped me understand data structures so much better. Great tutor!', createdAt: Date.now()-86400000*7 },
      { id:'r5', providerId:'p4', user:'Casey', rating:4, text:'Diego helped me jump start my car and was super reliable. Great service!', createdAt: Date.now()-86400000*4 },
      { id:'r6', providerId:'p5', user:'Morgan', rating:5, text:'Sophia took amazing graduation photos! Professional quality and quick turnaround.', createdAt: Date.now()-86400000*6 },
      { id:'r7', providerId:'p6', user:'Riley', rating:5, text:'Jake took great care of my dog while I was away. Highly recommend!', createdAt: Date.now()-86400000*8 },
      { id:'r8', providerId:'p1', user:'Blake', rating:5, text:'Ava\'s nail art is incredible! She\'s so creative and detail-oriented.', createdAt: Date.now()-86400000*1 }
    ]);
  }
  if(!load(STORAGE_KEYS.BOOKINGS)){
    save(STORAGE_KEYS.BOOKINGS, []);
  }
  if(!load(STORAGE_KEYS.MESSAGES)){
    save(STORAGE_KEYS.MESSAGES, []);
  }
  if(!load(STORAGE_KEYS.SUPPORT_REQUESTS)){
    // Add sample support requests for testing
    const sampleRequests = [
      {
        id: 'sr_sample1',
        email: 'student1@crimson.ua.edu',
        message: 'I need help with a provider who didn\'t show up for our appointment. Can you help me get a refund?',
        status: 'pending',
        createdAt: Date.now() - 86400000 * 2 // 2 days ago
      },
      {
        id: 'sr_sample2',
        email: 'student2@crimson.ua.edu',
        message: 'I want to report inappropriate behavior from a user. They sent me inappropriate messages.',
        status: 'responded',
        adminResponse: 'Thank you for reporting this. We have reviewed the case and taken appropriate action. The user has been warned and their account is being monitored.',
        responseDate: Date.now() - 86400000 * 1, // 1 day ago
        createdAt: Date.now() - 86400000 * 3 // 3 days ago
      },
      {
        id: 'sr_sample3',
        email: 'student3@crimson.ua.edu',
        message: 'How do I update my profile information? I can\'t find the edit button.',
        status: 'resolved',
        adminResponse: 'You can now edit your profile by going to your profile page and clicking the "Edit Profile" button. We\'ve added this feature based on your feedback!',
        responseDate: Date.now() - 86400000 * 4, // 4 days ago
        resolvedDate: Date.now() - 86400000 * 1, // 1 day ago
        createdAt: Date.now() - 86400000 * 5 // 5 days ago
      }
    ];
    save(STORAGE_KEYS.SUPPORT_REQUESTS, sampleRequests);
  }
}

// Simple router
const routes = {
  '#home': renderHome,
  '#browse': renderBrowse,
  '#profile': renderProfile,
  '#edit-profile': renderEditProfile,
  '#messages': renderMessages,
  '#message': renderMessageThread,
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
  console.log('navigate called with hash:', hash);
  const required = gateIfNeeded(hash);
  console.log('gateIfNeeded returned:', required);
  
  const navLinks = document.querySelectorAll('.tt-nav__link');
  navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.route === (required || hash)));
  
  // Use the required route if there's a redirect, otherwise use the original hash
  const targetRoute = required || hash;
  const baseRoute = targetRoute.split('?')[0];
  console.log('Final route being rendered:', baseRoute);
  
  const route = routes[baseRoute] || routes['#home'];
  console.log('Route function found:', !!route);
  route();
}

function gateIfNeeded(targetHash){
  const s = getSession();
  
  console.log('gateIfNeeded called with:', targetHash);
  console.log('Current session:', s);
  
  // Require authentication for ALL pages except auth itself
  if(targetHash !== '#auth'){
    if(!s) {
      console.log('No session, redirecting to auth');
      return '#auth';
    }
    
    // Check if user is admin - skip profile creation
    const adminEmails = [
      'faarnaoperez@crimson.ua.edu',
      'dhnguyen3@crimson.ua.edu', 
      'zkmccluney@crimson.ua.edu',
      'jdmiller16@crimson.ua.edu'
    ];
    
    const isAdmin = adminEmails.includes(s.email);
    
    // Check admin access restriction
    if(targetHash === '#admin'){
      if(!isAdmin){
        alert('Access denied. Only authorized administrators can access this page.');
        return '#home';
      }
      return null; // Allow admin access
    }
    
    // Allow access to messaging routes even without complete profile
    if(targetHash === '#message' || targetHash === '#messages'){
      return null;
    }
    
    // Skip profile creation for admins - they go directly to admin dashboard
    if(isAdmin && (!s.profile || !Array.isArray(s.profile.services) || s.profile.services.length === 0)){
      return '#admin';
    }
    
    // Require profile setup for other routes (non-admins)
    console.log('Checking profile requirements:');
    console.log('- targetHash:', targetHash);
    console.log('- s.profile:', s.profile);
    console.log('- s.profile.services:', s.profile?.services);
    console.log('- services length:', s.profile?.services?.length);
    
    if(targetHash !== '#create-profile' && (!s.profile || !Array.isArray(s.profile.services) || s.profile.services.length === 0)){
      console.log('Profile incomplete, redirecting to create-profile');
      console.log('Profile check details:');
      console.log('- s.profile exists:', !!s.profile);
      console.log('- s.profile.services exists:', !!s.profile?.services);
      console.log('- s.profile.services is array:', Array.isArray(s.profile?.services));
      console.log('- s.profile.services length:', s.profile?.services?.length);
      return '#create-profile';
    }
  }
  
  return null;
}

// Auth
function getSession(){ return load(STORAGE_KEYS.SESSION, null); }
function setSession(session){ save(STORAGE_KEYS.SESSION, session); updateAuthUI(); }

function validateSession(){
  const session = getSession();
  if(!session) return false;
  
  // Check if the user still exists in providers
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const userProvider = providers.find(p => p.id === session.id);
  
  if(!userProvider) {
    console.log('Session user not found in providers, clearing session');
    setSession(null);
    return false;
  }
  
  return true;
}
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
  const session = getSession();
  
  mount(h`
    <div style="min-height:100vh;background:linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
      <!-- Hero Section -->
      <div style="background:white;padding:80px 20px;text-align:center;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg, rgba(153,0,0,0.05) 0%, rgba(255,107,107,0.05) 100%);"></div>
        <div style="position:relative;max-width:800px;margin:0 auto;">
          <div style="width:100px;height:100px;background:linear-gradient(135deg,var(--crimson),#ff6b6b);border-radius:50%;margin:0 auto 32px;display:flex;align-items:center;justify-content:center;font-size:48px;color:white;box-shadow:0 12px 40px rgba(153,0,0,0.2);">
            🎓
          </div>
          <h1 style="margin:0;font-size:48px;font-weight:800;color:var(--ink);margin-bottom:16px;line-height:1.1">
            Find student services at student prices
          </h1>
          <p style="margin:0;font-size:20px;color:var(--ink-600);margin-bottom:32px;line-height:1.5">
            Connect with licensed and peer-recommended providers for everything from beauty services to tutoring, right on campus.
          </p>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:40px">
            <button onclick="location.hash='#browse'" style="background:var(--crimson);color:white;border:none;padding:18px 36px;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;box-shadow:0 6px 20px rgba(153,0,0,0.3);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(153,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 6px 20px rgba(153,0,0,0.3)'">
              🔍 Browse Services
            </button>
            <button onclick="location.hash='#support'" style="background:white;color:var(--crimson);border:2px solid var(--crimson);padding:16px 34px;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson)';this.style.color='white'" onmouseout="this.style.background='white';this.style.color='var(--crimson)'">
              💬 Contact Support
            </button>
          </div>
          
          <!-- Services Grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;max-width:600px;margin:0 auto">
            ${SERVICES.map(s => `<div style="background:white;padding:16px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);text-align:center;font-weight:500;color:var(--ink);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">${s}</div>`).join('')}
          </div>
        </div>
      </div>
      
      <!-- Featured Providers Section -->
      <div style="max-width:1200px;margin:0 auto;padding:80px 20px;">
        <div style="text-align:center;margin-bottom:48px">
          <h2 style="margin:0;font-size:36px;font-weight:700;color:var(--ink);margin-bottom:12px">Featured Providers</h2>
          <p style="margin:0;font-size:18px;color:var(--ink-600)">Top-rated students ready to help you</p>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
          ${top.map(p => h`
            <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.1);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="height:200px;background-image:url('${p.portfolio[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'}');background-size:cover;background-position:center;position:relative;">
                <div style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.9);padding:8px 12px;border-radius:20px;font-weight:600;color:var(--ink)">
                  ⭐ ${p.rating}
                </div>
              </div>
              <div style="padding:24px">
                <h3 style="margin:0 0 8px;font-size:20px;font-weight:700;color:var(--ink)">${p.name}</h3>
                <p style="margin:0 0 12px;color:var(--ink-600);font-size:14px">${p.services.join(' • ')} • ${p.distanceMiles} mi away</p>
                <p style="margin:0 0 16px;color:var(--ink-600);font-size:14px;line-height:1.4">${p.bio.substring(0,100)}${p.bio.length > 100 ? '...' : ''}</p>
                <div style="display:flex;gap:8px">
                  <button onclick="viewProfile('${p.id}')" style="flex:1;background:white;color:var(--crimson);border:1px solid var(--crimson);padding:12px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson)';this.style.color='white'" onmouseout="this.style.background='white';this.style.color='var(--crimson)'">
                    👁️ View Profile
                  </button>
                  <button onclick="openBooking('${p.id}')" style="flex:1;background:var(--crimson);color:white;border:none;padding:12px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson-600)'" onmouseout="this.style.background='var(--crimson)'">
                    📅 Book Now
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div style="text-align:center;margin-top:48px">
          <button onclick="location.hash='#browse'" style="background:var(--crimson);color:white;border:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);">
            View All Providers →
          </button>
        </div>
      </div>
      
      <!-- Stats Section -->
      <div style="background:var(--crimson);color:white;padding:60px 20px;text-align:center">
        <div style="max-width:800px;margin:0 auto">
          <h2 style="margin:0 0 32px;font-size:32px;font-weight:700">Join the Tide Together Community</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:32px">
            <div>
              <div style="font-size:36px;font-weight:800;margin-bottom:8px">${providers.length}+</div>
              <div style="font-size:16px;opacity:0.9">Active Providers</div>
            </div>
            <div>
              <div style="font-size:36px;font-weight:800;margin-bottom:8px">${load(STORAGE_KEYS.BOOKINGS, []).length}+</div>
              <div style="font-size:16px;opacity:0.9">Services Booked</div>
            </div>
            <div>
              <div style="font-size:36px;font-weight:800;margin-bottom:8px">${load(STORAGE_KEYS.REVIEWS, []).length}+</div>
              <div style="font-size:16px;opacity:0.9">Reviews</div>
            </div>
            <div>
              <div style="font-size:36px;font-weight:800;margin-bottom:8px">${SERVICES.length}</div>
              <div style="font-size:16px;opacity:0.9">Service Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div style="min-height:100vh;background:#f8f9fa;">
      <!-- Header -->
      <div style="background:white;padding:40px 20px;text-align:center;border-bottom:1px solid #e3e5e9;">
        <h1 style="margin:0;font-size:36px;font-weight:700;color:var(--ink);margin-bottom:12px">Browse Services</h1>
        <p style="margin:0;font-size:18px;color:var(--ink-600)">Find the perfect service provider for your needs</p>
      </div>
      
      <!-- Search and Filters -->
      <div style="max-width:1200px;margin:0 auto;padding:40px 20px;">
        <div style="background:white;padding:32px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);margin-bottom:32px">
          <div style="display:flex;gap:16px;margin-bottom:20px;flex-wrap:wrap">
            <input id="q" placeholder="🔍 Search services, providers..." value="${q}" oninput="onSearch(this.value)" 
                   style="flex:1;min-width:300px;padding:16px;border:2px solid #e3e5e9;border-radius:12px;font-size:16px;transition:border-color 0.2s;"
                   onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'"
                   onkeydown="if(event.key==='Backspace' && this.selectionStart === 0 && this.selectionEnd === this.value.length) { this.value=''; onSearch(''); event.preventDefault(); }" />
          </div>
          
          <div style="margin-bottom:20px">
            <h3 style="margin:0 0 12px;font-size:18px;color:var(--ink)">Filter by Service</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              ${SERVICES.map(s => `<button onclick="toggleServiceFilter('${s}')" style="background:white;border:1px solid #e3e5e9;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--crimson)';this.style.color='var(--crimson)'" onmouseout="this.style.borderColor='#e3e5e9';this.style.color='var(--ink)'">${s}</button>`).join('')}
            </div>
          </div>
          
          <div>
            <h3 style="margin:0 0 12px;font-size:18px;color:var(--ink)">Sort by</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <button onclick="sortBy('rating')" style="background:white;border:1px solid #e3e5e9;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--crimson)';this.style.color='var(--crimson)'" onmouseout="this.style.borderColor='#e3e5e9';this.style.color='var(--ink)'">⭐ Rating</button>
              <button onclick="sortBy('distance')" style="background:white;border:1px solid #e3e5e9;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--crimson)';this.style.color='var(--crimson)'" onmouseout="this.style.borderColor='#e3e5e9';this.style.color='var(--ink)'">📍 Distance</button>
              <button onclick="sortBy('reviews')" style="background:white;border:1px solid #e3e5e9;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--crimson)';this.style.color='var(--crimson)'" onmouseout="this.style.borderColor='#e3e5e9';this.style.color='var(--ink)'">💬 Reviews</button>
            </div>
          </div>
        </div>
        
        <!-- Results -->
        <div style="margin-bottom:20px">
          <h2 style="margin:0;font-size:24px;color:var(--ink)">${filtered.length} Provider${filtered.length !== 1 ? 's' : ''} Found</h2>
        </div>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px" id="results">
          ${filtered.map(p => h`
            <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.1);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
              <div style="height:200px;background-image:url('${p.portfolio[0] || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'}');background-size:cover;background-position:center;position:relative;">
                <div style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.9);padding:8px 12px;border-radius:20px;font-weight:600;color:var(--ink)">
                  ⭐ ${p.rating}
                </div>
              </div>
              <div style="padding:24px">
                <h3 style="margin:0 0 8px;font-size:20px;font-weight:700;color:var(--ink)">${p.name}</h3>
                <p style="margin:0 0 12px;color:var(--ink-600);font-size:14px">${p.services.join(' • ')} • ${p.distanceMiles} mi away</p>
                <p style="margin:0 0 16px;color:var(--ink-600);font-size:14px;line-height:1.4">${p.bio.substring(0,120)}${p.bio.length > 120 ? '...' : ''}</p>
                <div style="display:flex;gap:8px">
                  <button onclick="viewProfile('${p.id}')" style="flex:1;background:white;color:var(--crimson);border:1px solid var(--crimson);padding:12px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson)';this.style.color='white'" onmouseout="this.style.background='white';this.style.color='var(--crimson)'">
                    👁️ View Profile
                  </button>
                  <button onclick="openBooking('${p.id}')" style="flex:1;background:var(--crimson);color:white;border:none;padding:12px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson-600)'" onmouseout="this.style.background='var(--crimson)'">
                    📅 Book Now
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        ${filtered.length === 0 ? '<div style="text-align:center;padding:60px;color:var(--ink-300)"><h3>No providers found</h3><p>Try adjusting your search criteria</p></div>' : ''}
      </div>
    </div>
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
  console.log('Viewing profile for:', id);
  location.hash = `#profile?id=${id}`;
  // Force navigation to ensure it works
  setTimeout(() => {
    if(location.hash !== `#profile?id=${id}`) {
      location.hash = `#profile?id=${id}`;
    }
  }, 100);
}

function renderProfile(){
  const gate = gateIfNeeded('#profile');
  if(gate){ location.hash = gate; return; }
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const reviews = load(STORAGE_KEYS.REVIEWS, []);
  const session = getSession();
  const id = new URL(location.href).hash.split('?')[1]?.split('=')[1];
  const p = providers.find(x => x.id === id);
  if(!p){
    alert(`Provider with ID "${id}" not found. Available providers: ${providers.map(p => p.name).join(', ')}`);
    location.hash = '#browse';
    return;
  }
  const isOwnProfile = session && session.id === p.id;
  const pReviews = reviews.filter(r => r.providerId === p.id);
  const availabilityDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const availableDays = p.availability ? p.availability.map(day => availabilityDays[day]).join(', ') : 'Not specified';

  mount(h`
    <div style="min-height:100vh;background:#f8f9fa;">
      <!-- Header with back button -->
      <div style="background:white;padding:20px;border-bottom:1px solid #e3e5e9;">
        <button onclick="location.hash='#browse'" style="background:none;border:none;color:var(--crimson);font-size:16px;cursor:pointer;display:flex;align-items:center;gap:8px;">
          ← Back to Browse
        </button>
      </div>
      
      <!-- Hero Section -->
      <div style="background:white;padding:40px 20px;text-align:center;">
        <div style="width:120px;height:120px;background:linear-gradient(135deg,var(--crimson),#ff6b6b);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;font-size:48px;color:white;box-shadow:0 8px 32px rgba(153,0,0,0.2);">
          ${p.name.charAt(0)}
        </div>
        <h1 style="margin:0;font-size:36px;font-weight:700;color:var(--ink);margin-bottom:8px">${p.name}</h1>
        <div style="font-size:18px;color:var(--ink-600);margin-bottom:16px">
          ${p.services.join(' • ')} • ${p.distanceMiles} miles away
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:4px">
            ${'⭐'.repeat(Math.floor(p.rating))}
          </div>
          <span style="font-weight:600;color:var(--ink)">${p.rating}</span>
          <span style="color:var(--ink-300)">(${p.reviewsCount} reviews)</span>
        </div>
        
        <!-- Action Buttons -->
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          ${isOwnProfile ? 
            `<button onclick="location.hash='#edit-profile'" style="background:var(--crimson);color:white;border:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(153,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 16px rgba(153,0,0,0.3)'">
              ✏️ Edit Profile
            </button>` :
            getSession() ? 
              `<button onclick="openBooking('${p.id}')" style="background:var(--crimson);color:white;border:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(153,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 16px rgba(153,0,0,0.3)'">
                📅 Book Service
              </button>
              <button onclick="startDM('${p.id}')" style="background:white;color:var(--crimson);border:2px solid var(--crimson);padding:14px 30px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson)';this.style.color='white'" onmouseout="this.style.background='white';this.style.color='var(--crimson)'">
                💬 Message
              </button>` :
              `<button onclick="location.hash='#auth'" style="background:var(--crimson);color:white;border:none;padding:16px 32px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);">
                🔐 Sign in to Book
              </button>`
          }
        </div>
      </div>
      
      <!-- Content Grid -->
      <div style="max-width:1200px;margin:0 auto;padding:40px 20px;display:grid;grid-template-columns:1fr 1fr;gap:40px;">
        <!-- Left Column -->
        <div>
          <!-- About Section -->
          <div style="background:white;padding:32px;border-radius:16px;margin-bottom:24px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="margin:0 0 16px;font-size:24px;color:var(--ink)">About ${p.name}</h2>
            <p style="margin:0;line-height:1.6;color:var(--ink-600);font-size:16px">${p.bio}</p>
          </div>
          
          <!-- Availability -->
          <div style="background:white;padding:32px;border-radius:16px;margin-bottom:24px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="margin:0 0 16px;font-size:24px;color:var(--ink)">📅 Availability</h2>
            <p style="margin:0;color:var(--ink-600);font-size:16px">Available: ${availableDays}</p>
          </div>
          
          <!-- Credentials -->
          <div style="background:white;padding:32px;border-radius:16px;margin-bottom:24px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="margin:0 0 16px;font-size:24px;color:var(--ink)">🏆 Credentials</h2>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px">
              ${p.licenses.map(l => `<span style="background:#e8f5e8;color:#2d5a2d;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500">📜 ${l}</span>`).join('')}
              ${p.certifications.map(c => `<span style="background:#fff3cd;color:#856404;padding:8px 16px;border-radius:20px;font-size:14px;font-weight:500">🏆 ${c}</span>`).join('')}
            </div>
            ${p.licenses.length === 0 && p.certifications.length === 0 ? '<p style="margin:0;color:var(--ink-300);font-style:italic">No credentials listed</p>' : ''}
          </div>
          
          <!-- Social Links -->
          <div style="background:white;padding:32px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="margin:0 0 16px;font-size:24px;color:var(--ink)">🔗 Connect</h2>
            <div style="display:flex;gap:12px;flex-wrap:wrap">
              ${p.socials.instagram ? `<a href='https://instagram.com/${p.socials.instagram.replace('@','')}' target='_blank' style="background:#E4405F;color:white;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:500;display:flex;align-items:center;gap:8px">📷 Instagram</a>`:''}
              ${p.socials.linkedin ? `<a href='https://www.linkedin.com/in/${p.socials.linkedin}' target='_blank' style="background:#0077B5;color:white;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:500;display:flex;align-items:center;gap:8px">💼 LinkedIn</a>`:''}
              ${p.socials.portfolio ? `<a href='${p.socials.portfolio.startsWith('http') ? p.socials.portfolio : 'https://' + p.socials.portfolio}' target='_blank' style="background:#6c757d;color:white;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:500;display:flex;align-items:center;gap:8px">🌐 Portfolio</a>`:''}
              ${p.socials.tiktok ? `<a href='https://tiktok.com/@${p.socials.tiktok.replace('@','')}' target='_blank' style="background:#000000;color:white;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:500;display:flex;align-items:center;gap:8px">🎵 TikTok</a>`:''}
              ${p.socials.github ? `<a href='https://github.com/${p.socials.github}' target='_blank' style="background:#333333;color:white;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:500;display:flex;align-items:center;gap:8px">💻 GitHub</a>`:''}
            </div>
            ${!p.socials.instagram && !p.socials.linkedin && !p.socials.portfolio && !p.socials.tiktok && !p.socials.github ? '<p style="margin:0;color:var(--ink-300);font-style:italic">No social media links</p>' : ''}
          </div>
        </div>
        
        <!-- Right Column -->
        <div>
          <!-- Portfolio Gallery -->
          <div style="background:white;padding:32px;border-radius:16px;margin-bottom:24px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="margin:0 0 20px;font-size:24px;color:var(--ink)">📸 Portfolio</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              ${(p.portfolio.length? p.portfolio : [
                'https://images.unsplash.com/photo-1556228578-8fb87677aa6a?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop']
              ).slice(0,4).map(src => `<div style='height:160px;background-image:url(${src});background-size:cover;background-position:center;border-radius:12px;cursor:pointer;transition:transform 0.2s' onclick="window.open('${src}', '_blank')" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"></div>`).join('')}
            </div>
            ${p.portfolio.length === 0 ? '<p style="text-align:center;color:var(--ink-300);margin:20px 0">No portfolio images available</p>' : ''}
          </div>
          
          <!-- Reviews Section -->
          <div style="background:white;padding:32px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <h2 style="margin:0 0 20px;font-size:24px;color:var(--ink)">⭐ Reviews</h2>
            <div style="max-height:400px;overflow-y:auto">
              ${pReviews.length > 0 ? pReviews.map(r => h`
                <div style="padding:16px 0;border-bottom:1px solid #f0f0f0;margin-bottom:16px">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
                    <div style="width:40px;height:40px;background:var(--crimson);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:600">
                      ${r.user.charAt(0)}
                    </div>
                    <div>
                      <div style="font-weight:600;color:var(--ink)">${r.user}</div>
                      <div style="display:flex;align-items:center;gap:4px;font-size:14px;color:var(--ink-300)">
                        ${'⭐'.repeat(r.rating)} • ${new Date(r.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p style="margin:0;line-height:1.5;color:var(--ink-600)">${r.text}</p>
                </div>
              `).join('') : '<div style="text-align:center;color:var(--ink-300);padding:40px">No reviews yet. Be the first to review!</div>'}
            </div>
            
            ${getSession() ? 
              `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #f0f0f0">
                <h3 style="margin:0 0 16px;font-size:18px;color:var(--ink)">Write a Review</h3>
                <div style="display:flex;gap:12px;margin-bottom:12px">
                  <select id="reviewRating" style="padding:12px;border:1px solid #e3e5e9;border-radius:8px;font-size:14px">
                    ${[5,4,3,2,1].map(v=>`<option value="${v}">${v} stars</option>`).join('')}
                  </select>
                  <input id="reviewText" placeholder="Share your experience..." style="flex:1;padding:12px;border:1px solid #e3e5e9;border-radius:8px;font-size:14px" />
                </div>
                <button onclick="submitReview('${p.id}')" style="background:var(--crimson);color:white;border:none;padding:12px 24px;border-radius:8px;font-weight:500;cursor:pointer">Submit Review</button>
              </div>` :
              `<div style="margin-top:20px;text-align:center;padding-top:20px;border-top:1px solid #f0f0f0">
                <button onclick="location.hash='#auth'" style="background:white;color:var(--crimson);border:2px solid var(--crimson);padding:12px 24px;border-radius:8px;font-weight:500;cursor:pointer">Sign in to write a review</button>
              </div>`
            }
          </div>
        </div>
      </div>
    </div>
  `);
}

// Global variable to track selected conversation
let selectedConversation = null;

function renderMessages(){
  const session = getSession();
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  
  // Filter messages to show conversations with providers and support bot
  const providerIds = providers.map(p => p.id);
  const providerMessages = messages.filter(m => 
    (m.to === session?.id || m.from === session?.id) && 
    (providerIds.includes(m.to) || providerIds.includes(m.from) || m.from === 'support_bot' || m.to === 'support_bot')
  );
  
  const threads = groupBy(providerMessages, m => m.threadId);
  const threadList = Object.values(threads).map(thread => {
    const last = thread[thread.length-1];
    const partner = last.from === session?.id ? last.toName : last.fromName;
    const partnerId = last.from === session?.id ? last.to : last.from;
    const partnerProvider = partnerId === 'support_bot' ? { id: 'support_bot', name: 'Tide Together Support', services: ['Support'] } : providers.find(p => p.id === partnerId);
    const preview = last.text.length > 50 ? last.text.substring(0, 50) + '...' : last.text;
    const timeAgo = getTimeAgo(last.createdAt);
    const isUnread = last.from !== session?.id; // Simple unread logic
    
    return {
      threadId: last.threadId,
      partnerId,
      partner,
      partnerProvider,
      preview,
      timeAgo,
      isUnread,
      lastMessage: last,
      allMessages: thread
    };
  }).sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt); // Sort by most recent
  
  mount(h`
    <section>
      <h2 class="tt-section-title">Messages</h2>
      ${session ? '' : '<div class="tt-card__meta">Sign in to view messages.</div>'}
      
      <div style="display: flex; gap: 20px; height: 600px;">
        <!-- Message List Column -->
        <div style="flex: 0 0 350px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #f8f9fa; padding: 16px; border-bottom: 1px solid #e0e0e0;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 600;">Conversations</h3>
          </div>
          <div style="overflow-y: auto; height: calc(100% - 60px);">
            ${threadList.length > 0 ? threadList.map(thread => h`
              <div style="padding: 16px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background-color 0.2s; ${thread.isUnread ? 'background: #f0f8ff;' : ''} ${selectedConversation?.threadId === thread.threadId ? 'background: #e3f2fd; border-left: 3px solid #007bff;' : ''}" 
                   onclick="selectConversation('${thread.threadId}', '${thread.partnerId}', '${thread.partner}')"
                   onmouseover="this.style.backgroundColor='${selectedConversation?.threadId === thread.threadId ? '#e3f2fd' : '#f5f5f5'}'"
                   onmouseout="this.style.backgroundColor='${selectedConversation?.threadId === thread.threadId ? '#e3f2fd' : (thread.isUnread ? '#f0f8ff' : 'transparent')}'">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: #007bff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px;">
                    ${thread.partner.charAt(0).toUpperCase()}
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                      <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #333; ${thread.isUnread ? 'font-weight: 700;' : ''}">${thread.partner}</h4>
                      <span style="font-size: 12px; color: #666;">${thread.timeAgo}</span>
                    </div>
                    <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${thread.preview}
                    </p>
                    ${thread.partnerProvider ? h`
                      <div style="margin-top: 4px;">
                        <span style="font-size: 12px; color: #007bff; background: #e3f2fd; padding: 2px 6px; border-radius: 4px;">
                          ${thread.partnerProvider.services.join(', ')}
                        </span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('') : h`
              <div style="padding: 40px 20px; text-align: center; color: #666;">
                <div style="font-size: 48px; margin-bottom: 16px;">💬</div>
                <h3 style="margin: 0 0 8px 0; color: #333;">No messages yet</h3>
                <p style="margin: 0;">Start a conversation by booking a service!</p>
              </div>
            `}
          </div>
        </div>
        
        <!-- Message Thread Column -->
        <div style="flex: 1; border: 1px solid #e0e0e0; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
          ${selectedConversation ? renderConversationView(selectedConversation) : h`
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #fafafa;">
              <div style="text-align: center; color: #666;">
                <div style="font-size: 64px; margin-bottom: 16px;">📱</div>
                <h3 style="margin: 0 0 8px 0; color: #333;">Select a conversation</h3>
                <p style="margin: 0;">Click on a conversation to start messaging</p>
              </div>
            </div>
          `}
        </div>
      </div>
    </section>
  `);
}

function selectConversation(threadId, partnerId, partnerName){
  const session = getSession();
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadMessages = messages.filter(m => m.threadId === threadId).sort((a, b) => a.createdAt - b.createdAt);
  
  selectedConversation = {
    threadId,
    partnerId,
    partnerName,
    messages: threadMessages
  };
  
  renderMessages(); // Re-render to show the selected conversation
}

function renderConversationView(conversation){
  const session = getSession();
  
  return h`
    <!-- Conversation Header -->
    <div style="background: #f8f9fa; padding: 16px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center; gap: 12px;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: #007bff; color: white; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 16px;">
        ${conversation.partnerName.charAt(0).toUpperCase()}
      </div>
      <div>
        <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">${conversation.partnerName}</h3>
        <p style="margin: 0; font-size: 14px; color: #666;">Active now</p>
      </div>
    </div>
    
    <!-- Messages Area -->
    <div id="conversationMessages" style="flex: 1; overflow-y: auto; padding: 16px; background: #fafafa;">
      ${conversation.messages.map(msg => {
        const isFromMe = msg.from === session.id;
        return h`
          <div style="margin: 8px 0; display: flex; ${isFromMe ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}">
            <div style="max-width: 70%; padding: 12px 16px; border-radius: 18px; ${isFromMe ? 'background: #007bff; color: white;' : 'background: white; border: 1px solid #e0e0e0;'}">
              <div style="font-size: 14px; line-height: 1.4;">${msg.text}</div>
              <div style="font-size: 11px; opacity: 0.7; margin-top: 4px; text-align: ${isFromMe ? 'right' : 'left'};">
                ${new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    <!-- Message Input -->
    <div style="padding: 16px; border-top: 1px solid #e0e0e0; background: white;">
      <div style="display: flex; gap: 8px; align-items: center;">
        <input id="inlineMessageInput" placeholder="Type your message..." style="flex: 1; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 24px; outline: none; font-size: 14px;" onkeypress="if(event.key==='Enter') sendInlineMessage('${conversation.threadId}', '${conversation.partnerId}')" />
        <button class="tt-button" onclick="sendInlineMessage('${conversation.threadId}', '${conversation.partnerId}')" style="border-radius: 50%; width: 40px; height: 40px; padding: 0; display: flex; align-items: center; justify-content: center;">
          ➤
        </button>
      </div>
    </div>
  `;
}

function sendInlineMessage(threadId, partnerId){
  const session = getSession();
  if(!session){ alert('Please sign in to send messages.'); return; }
  
  const messageInput = document.getElementById('inlineMessageInput');
  const text = messageInput.value.trim();
  if(!text){ alert('Please enter a message.'); return; }
  
  const partner = load(STORAGE_KEYS.PROVIDERS, []).find(p => p.id === partnerId);
  if(!partner){ alert('Partner not found.'); return; }
  
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  messages.push({ 
    id: `m_${Date.now()}`, 
    threadId, 
    from: session.id, 
    fromName: session.name, 
    to: partnerId, 
    toName: partner.name, 
    text, 
    createdAt: Date.now() 
  });
  save(STORAGE_KEYS.MESSAGES, messages);
  
  messageInput.value = '';
  
  // Update the selected conversation
  if(selectedConversation && selectedConversation.threadId === threadId){
    selectedConversation.messages = messages.filter(m => m.threadId === threadId).sort((a, b) => a.createdAt - b.createdAt);
  }
  
  renderMessages(); // Re-render to show the new message
}

function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return new Date(timestamp).toLocaleDateString();
}

function renderSupport(){
  const session = getSession();
  const adminEmails = [
    'faarnaoperez@crimson.ua.edu',
    'dhnguyen3@crimson.ua.edu', 
    'zkmccluney@crimson.ua.edu',
    'jdmiller16@crimson.ua.edu'
  ];
  const isAdmin = session && adminEmails.includes(session.email);
  
  console.log('=== SUPPORT SYSTEM DEBUG ===');
  console.log('Support page - Session:', session);
  console.log('Support page - Session email:', session?.email);
  console.log('Support page - Is Admin:', isAdmin);
  console.log('Support page - Admin emails:', adminEmails);
  console.log('Support page - Email match:', session?.email ? adminEmails.includes(session.email) : 'No session email');
  
  if(isAdmin) {
    console.log('Rendering admin support page');
    renderAdminSupport();
  } else {
    console.log('Rendering user support page');
    renderUserSupport();
  }
  console.log('=== END SUPPORT DEBUG ===');
}

function renderUserSupport(){
  mount(h`
    <div style="min-height:100vh;background:#f8f9fa;padding:40px 20px;">
      <div style="max-width:800px;margin:0 auto;">
        <div style="background:white;border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
          <div style="text-align:center;margin-bottom:32px">
            <h1 style="margin:0;font-size:32px;font-weight:700;color:var(--ink)">Contact Support</h1>
            <p style="margin:8px 0 0;color:var(--ink-600);font-size:16px">Need help or want to report a user? Send us a message.</p>
      </div>
          
          <form onsubmit="event.preventDefault();submitSupportRequest()">
            <div style="margin-bottom:24px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Your Email</label>
              <input id="supEmail" type="email" placeholder="you@crimson.ua.edu" 
                     style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                     onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
            </div>
            
            <div style="margin-bottom:32px">
              <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Message</label>
              <textarea id="supMsg" rows="6" placeholder="Describe the issue or concern..." 
                        style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;resize:vertical;transition:border-color 0.2s;"
                        onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required></textarea>
            </div>
            
            <div style="text-align:center">
              <button type="submit" style="background:var(--crimson);color:white;border:none;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);transition:all 0.2s;"
                      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(153,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 16px rgba(153,0,0,0.3)'">
                📧 Submit Support Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `);
}

function renderAdminSupport(){
  const supportRequests = load(STORAGE_KEYS.SUPPORT_REQUESTS, []);
  const sortedRequests = supportRequests.sort((a, b) => b.createdAt - a.createdAt);
  
  mount(h`
    <div style="min-height:100vh;background:#f8f9fa;padding:40px 20px;">
      <div style="max-width:1200px;margin:0 auto;">
        <div style="background:white;border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(0,0,0,0.1);margin-bottom:24px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <h1 style="margin:0;font-size:32px;font-weight:700;color:var(--ink);margin-bottom:8px">Support Requests</h1>
              <p style="margin:0;color:var(--ink-600);font-size:16px">Manage user support requests and respond to inquiries</p>
            </div>
            <button onclick="resetSupportRequests()" style="background:#6c757d;color:white;border:none;padding:12px 24px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#5a6268'" onmouseout="this.style.background='#6c757d'">
              🔄 Reset Sample Data
            </button>
          </div>
        </div>
        
        <div style="background:white;border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
          ${sortedRequests.length > 0 ? sortedRequests.map(req => h`
            <div style="border:1px solid #e3e5e9;border-radius:12px;padding:24px;margin-bottom:20px;background:#fafafa">
              <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:16px">
                <div>
                  <h3 style="margin:0 0 8px;font-size:18px;font-weight:600;color:var(--ink)">Support Request #${req.id}</h3>
                  <div style="display:flex;gap:16px;margin-bottom:8px">
                    <span style="color:var(--ink-600);font-size:14px"><strong>From:</strong> ${req.email}</span>
                    <span style="color:var(--ink-600);font-size:14px"><strong>Date:</strong> ${new Date(req.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div style="display:flex;gap:8px">
                  <span style="background:${req.status === 'pending' ? '#fff3cd' : req.status === 'resolved' ? '#d4edda' : '#f8d7da'};color:${req.status === 'pending' ? '#856404' : req.status === 'resolved' ? '#155724' : '#721c24'};padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500">
                    ${req.status.toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div style="background:white;padding:16px;border-radius:8px;margin-bottom:16px">
                <h4 style="margin:0 0 8px;font-size:16px;color:var(--ink)">Message:</h4>
                <p style="margin:0;line-height:1.6;color:var(--ink-600)">${req.message}</p>
              </div>
              
              ${req.adminResponse ? h`
                <div style="background:#e3f2fd;padding:16px;border-radius:8px;margin-bottom:16px">
                  <h4 style="margin:0 0 8px;font-size:16px;color:var(--ink)">Admin Response:</h4>
                  <p style="margin:0;line-height:1.6;color:var(--ink-600)">${req.adminResponse}</p>
                  <div style="margin-top:8px;font-size:12px;color:var(--ink-300)">
                    Responded on ${new Date(req.responseDate).toLocaleString()}
                  </div>
                </div>
              ` : ''}
              
              <div style="display:flex;gap:12px">
                ${req.status === 'pending' ? h`
                  <button onclick="respondToSupport('${req.id}')" style="background:var(--crimson);color:white;border:none;padding:10px 20px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='var(--crimson-600)'" onmouseout="this.style.background='var(--crimson)'">
                    💬 Respond
                  </button>
                  <button onclick="markSupportResolved('${req.id}')" style="background:#28a745;color:white;border:none;padding:10px 20px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#218838'" onmouseout="this.style.background='#28a745'">
                    ✅ Mark Resolved
                  </button>
                ` : ''}
                <button onclick="deleteSupportRequest('${req.id}')" style="background:#dc3545;color:white;border:none;padding:10px 20px;border-radius:8px;font-weight:500;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
                  🗑️ Delete
                </button>
              </div>
            </div>
          `).join('') : h`
            <div style="text-align:center;padding:60px;color:var(--ink-300)">
              <div style="font-size:48px;margin-bottom:16px">📭</div>
              <h3 style="margin:0 0 8px;color:var(--ink)">No support requests</h3>
              <p style="margin:0">All caught up! No pending support requests.</p>
            </div>
          `}
        </div>
      </div>
    </div>
  `);
}

function renderAdmin(){
  const gate = gateIfNeeded('#admin');
  if(gate){ location.hash = gate; return; }
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const params = new URLSearchParams(location.search);
  const serviceFilter = params.get('service') || '';
  const filteredProviders = serviceFilter ? 
    providers.filter(p => p.services.some(s => s.toLowerCase().includes(serviceFilter.toLowerCase()))) : 
    providers;
  
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
        <div class="tt-section-title">Filter Services</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
          <button class="tt-chip ${!serviceFilter ? 'is-active' : ''}" onclick="filterAdminServices('')">All</button>
          ${SERVICES.map(s => `<button class="tt-chip ${serviceFilter === s ? 'is-active' : ''}" onclick="filterAdminServices('${s}')">${s}</button>`).join('')}
        </div>
        <div style="color:var(--ink-300);font-size:0.9rem">
          ${serviceFilter ? `Showing ${filteredProviders.length} providers for "${serviceFilter}"` : `Showing all ${filteredProviders.length} providers`}
        </div>
      </div>
      <div class="tt-hero__card" style="margin-top:12px">
        <div class="tt-section-title">Providers ${serviceFilter ? `(${serviceFilter})` : ''}</div>
        <div class="tt-grid">
          ${filteredProviders.map(p => h`<article class='tt-card'><div class='tt-card__body'>
            <div class='tt-card__title'>${p.name}</div>
            <div class='tt-card__meta'>${p.services.join(', ')}</div>
            ${p.cwid ? `<div class='tt-card__meta'>CWID: ${p.cwid}</div>` : ''}
            ${p.email ? `<div class='tt-card__meta'>Email: ${p.email}</div>` : ''}
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

// Enhanced Auth Gate with modern design
function renderAuthGate(){
  mount(h`
    <div style="min-height:100vh;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:white;border-radius:20px;padding:40px;max-width:480px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.1);">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="width:80px;height:80px;background:var(--crimson);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px;color:white;">🎓</div>
          <h1 style="margin:0;font-size:28px;font-weight:700;color:var(--ink);">Welcome to Tide Together</h1>
          <p style="margin:8px 0 0;color:var(--ink-300);font-size:16px;">Student Swap Services at UA</p>
        </div>
        
        <div style="background:#f8f9fa;padding:24px;border-radius:12px;margin-bottom:24px;">
          <h3 style="margin:0 0 12px;color:var(--crimson);font-size:18px;">🔐 University Access Required</h3>
          <p style="margin:0;color:var(--ink-600);font-size:14px;line-height:1.5;">Please sign in with your University of Alabama credentials to access student services and connect with fellow Crimson Tide students.</p>
        </div>
        
        <form onsubmit="event.preventDefault();submitAuthPage()">
          <div style="margin-bottom:20px;">
            <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);">CWID (Campus Wide ID)</label>
            <input id="cwid_page" inputmode="numeric" placeholder="Enter your 8-digit CWID" 
                   style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                   onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
          </div>
          
          <div style="margin-bottom:24px;">
            <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink);">Crimson Email</label>
            <input id="email_page" type="email" placeholder="your.email@crimson.ua.edu" 
                   style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                   onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
          </div>
          
          <button type="submit" style="width:100%;background:var(--crimson);color:white;border:none;padding:16px;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.2s;box-shadow:0 4px 12px rgba(153,0,0,0.3);"
                  onmouseover="this.style.background='var(--crimson-600)'" onmouseout="this.style.background='var(--crimson)'">
            🚀 Continue to Tide Together
          </button>
        </form>
        
        <div style="text-align:center;margin-top:24px;padding-top:20px;border-top:1px solid #e3e5e9;">
          <p style="margin:0;color:var(--ink-300);font-size:12px;">By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  `);
}

function submitAuthPage(){
  console.log('submitAuthPage called');
  const cwid = document.getElementById('cwid_page').value.trim();
  const email = document.getElementById('email_page').value.trim();
  console.log('CWID:', cwid, 'Email:', email);
  
  if(!/^\d{8}$/.test(cwid)){ alert('Enter a valid CWID.'); return; }
  if(!/@crimson\.ua\.edu$/i.test(email)){ alert('Use your Crimson email.'); return; }
  const name = email.split('@')[0].replace('.', ' ');
  const userId = `u_${cwid}`;
  console.log('User ID:', userId, 'Name:', name);
  
  // Check if user already has a complete profile
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const existingProvider = providers.find(p => p.id === userId);
  
  if(existingProvider && existingProvider.services && existingProvider.services.length > 0 && !existingProvider.services.includes('New User')){
    // User has a complete profile - load it into session
    const profile = {
      firstName: existingProvider.firstName || '',
      lastName: existingProvider.lastName || '',
      fullName: existingProvider.name,
      services: existingProvider.services,
      availability: existingProvider.availability || [],
      bio: existingProvider.bio || '',
      licenses: existingProvider.licenses || [],
      certifications: existingProvider.certifications || [],
      portfolio: existingProvider.portfolio || [],
      socials: existingProvider.socials || {}
    };
    
    console.log('Loading existing profile for user:', userId);
    console.log('Profile data:', profile);
    
    setSession({ id: userId, cwid, email, name: existingProvider.name, profile });
    console.log('Navigating to #home');
    setTimeout(() => navigate('#home'), 10);
  } else {
    // User needs to create/complete profile
    if(!existingProvider){
      providers.push({ 
        id: userId, 
        name: name, 
        services: ['New User'], 
        rating: 5.0, 
        reviewsCount: 0, 
        distanceMiles: 0.5, 
        bio: 'New user - profile setup pending', 
        licenses: [], 
        certifications: [], 
        portfolio: [], 
        socials: {}, 
        availability: [], 
        campus: 'UA',
        cwid: cwid,
        email: email
      });
      save(STORAGE_KEYS.PROVIDERS, providers);
    }
    
    setSession({ id: userId, cwid, email, name, profile: null });
    console.log('Navigating to #create-profile');
    setTimeout(() => navigate('#create-profile'), 10);
  }
}

// Enhanced Create Profile with comprehensive details
function renderCreateProfile(){
  const s = getSession();
  if(!s){ location.hash = '#auth'; return; }
  mount(h`
    <div style="min-height:100vh;background:#f8f9fa;padding:40px 20px;">
      <div style="max-width:800px;margin:0 auto;">
        <div style="background:white;border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
          <div style="text-align:center;margin-bottom:32px">
            <h1 style="margin:0;font-size:32px;font-weight:700;color:var(--ink)">Create Your Provider Profile</h1>
            <p style="margin:8px 0 0;color:var(--ink-600);font-size:16px">Build a comprehensive profile to attract clients</p>
          </div>
          
          <form onsubmit="event.preventDefault();submitProfileCreate()">
            <!-- Personal Information Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">👤 Personal Information</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">First Name</label>
                  <input id="firstName_page" placeholder="Enter your first name" 
                         style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
                </div>
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Last Name</label>
                  <input id="lastName_page" placeholder="Enter your last name" 
                         style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
                </div>
              </div>
            </div>
            
            <!-- Services Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">🎯 Services You Offer</h3>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px" id="svcChoices">
                ${SERVICES.map(svc => `
                  <label style="background:#f8f9fa;border:2px solid #e3e5e9;padding:16px;border-radius:12px;cursor:pointer;text-align:center;transition:all 0.2s;display:flex;align-items:center;gap:8px" onmouseover="this.style.borderColor='var(--crimson)'" onmouseout="this.style.borderColor='#e3e5e9'">
                    <input type="checkbox" value="${svc}" style="margin:0;transform:scale(1.2)" onchange="this.parentElement.style.borderColor=this.checked?'var(--crimson)':'#e3e5e9';this.parentElement.style.background=this.checked?'#fff5f5':'#f8f9fa'">
                    <span style="font-weight:500">${svc}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Availability Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">📅 Weekly Availability</h3>
              <div style="display:flex;gap:12px;flex-wrap:wrap" id="availChoices">
                ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=>`
                  <label style="background:#f8f9fa;border:2px solid #e3e5e9;padding:12px 20px;border-radius:12px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:8px" onmouseover="this.style.borderColor='var(--crimson)'" onmouseout="this.style.borderColor='#e3e5e9'">
                    <input type="checkbox" value="${i}" style="margin:0;transform:scale(1.2)" onchange="this.parentElement.style.borderColor=this.checked?'var(--crimson)':'#e3e5e9';this.parentElement.style.background=this.checked?'#fff5f5':'#f8f9fa'">
                    <span style="font-weight:500">${d}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Bio Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">📝 About You</h3>
              <textarea id="bio_page" rows="4" placeholder="Tell potential clients about your experience, skills, and what makes you unique..." 
                        style="width:100%;padding:16px;border:2px solid #e3e5e9;border-radius:12px;font-size:16px;resize:vertical;transition:border-color 0.2s;"
                        onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'"></textarea>
            </div>
            
            <!-- Social Media Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">🔗 Social Media & Portfolio</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Instagram</label>
                  <input id="instagram_page" placeholder="@yourusername" 
                         style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                </div>
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">LinkedIn</label>
                  <input id="linkedin_page" placeholder="your-linkedin-profile" 
                         style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                </div>
              </div>
              <div style="margin-top:16px">
                <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Portfolio Website (optional)</label>
                <input id="portfolio_page" placeholder="https://yourportfolio.com" 
                       style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;transition:border-color 0.2s;"
                       onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
              </div>
            </div>
            
            <!-- Work Photos Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">📸 Work Photos</h3>
              <p style="margin:0 0 16px;color:var(--ink-600);font-size:14px">Add URLs to photos of your work (up to 5 images)</p>
              <div id="photoInputs">
                <input class="photo-input" placeholder="https://example.com/your-work-photo1.jpg" 
                       style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;margin-bottom:8px;transition:border-color 0.2s;"
                       onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                <input class="photo-input" placeholder="https://example.com/your-work-photo2.jpg" 
                       style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;margin-bottom:8px;transition:border-color 0.2s;"
                       onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                <input class="photo-input" placeholder="https://example.com/your-work-photo3.jpg" 
                       style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;margin-bottom:8px;transition:border-color 0.2s;"
                       onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
              </div>
            </div>
            
            <!-- Certifications Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">🏆 Licenses & Certifications</h3>
              <p style="margin:0 0 16px;color:var(--ink-600);font-size:14px">Add any licenses or certifications you have (one per line)</p>
              <textarea id="certifications_page" rows="3" placeholder="State License&#10;CPR Certified&#10;Professional Certification" 
                        style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;resize:vertical;transition:border-color 0.2s;"
                        onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'"></textarea>
            </div>
            
            <!-- Submit Button -->
            <div style="text-align:center">
              <button type="submit" style="background:var(--crimson);color:white;border:none;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);transition:all 0.2s;"
                      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(153,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 16px rgba(153,0,0,0.3)'">
                🚀 Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `);
}

function submitProfileCreate(){
  const s = getSession();
  const firstName = document.getElementById('firstName_page').value.trim();
  const lastName = document.getElementById('lastName_page').value.trim();
  const services = Array.from(document.querySelectorAll('#svcChoices input:checked')).map(i=>i.value);
  const availability = Array.from(document.querySelectorAll('#availChoices input:checked')).map(i=>Number(i.value));
  const bio = document.getElementById('bio_page').value.trim();
  const instagram = document.getElementById('instagram_page').value.trim();
  const linkedin = document.getElementById('linkedin_page').value.trim();
  const portfolio = document.getElementById('portfolio_page').value.trim();
  const certifications = document.getElementById('certifications_page').value.trim();
  
  // Collect work photos
  const photoInputs = document.querySelectorAll('.photo-input');
  const portfolioPhotos = Array.from(photoInputs)
    .map(input => input.value.trim())
    .filter(url => url.length > 0);
  
  if(!firstName || !lastName){ alert('Please enter both first and last name.'); return; }
  if(services.length===0){ alert('Select at least one service you offer.'); return; }
  if(bio.length < 20){ alert('Please write a more detailed bio (at least 20 characters).'); return; }
  
  // Parse certifications
  const certList = certifications.split('\n')
    .map(cert => cert.trim())
    .filter(cert => cert.length > 0);
  
  // Build social media object
  const socials = {};
  if(instagram) socials.instagram = instagram.startsWith('@') ? instagram : `@${instagram}`;
  if(linkedin) socials.linkedin = linkedin;
  if(portfolio) socials.portfolio = portfolio;
  
  const fullName = `${firstName} ${lastName}`;
  const profile = { 
    firstName,
    lastName,
    fullName,
    services, 
    availability, 
    bio, 
    licenses: certList.filter(cert => cert.toLowerCase().includes('license')),
    certifications: certList.filter(cert => !cert.toLowerCase().includes('license')),
    portfolio: portfolioPhotos,
    socials 
  };
  
  const nextSession = { ...s, name: fullName, profile };
  setSession(nextSession);
  
  // Update or add to PROVIDERS list
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const existingProvider = providers.find(p => p.id === s.id);
  
  if(existingProvider){
    // Update existing provider
    existingProvider.name = fullName;
    existingProvider.firstName = firstName;
    existingProvider.lastName = lastName;
    existingProvider.services = services;
    existingProvider.bio = bio;
    existingProvider.licenses = profile.licenses;
    existingProvider.certifications = profile.certifications;
    existingProvider.portfolio = portfolioPhotos;
    existingProvider.socials = socials;
    existingProvider.availability = availability;
  } else {
    // Add new provider
    providers.push({ 
      id: s.id, 
      name: fullName,
      firstName,
      lastName,
      services, 
      rating: 5.0, 
      reviewsCount: 0, 
      distanceMiles: Math.random() * 2 + 0.5, // Random distance between 0.5-2.5 miles
      bio, 
      licenses: profile.licenses,
      certifications: profile.certifications,
      portfolio: portfolioPhotos,
      socials,
      availability, 
      campus: 'UA',
      cwid: s.cwid,
      email: s.email
    });
  }
  save(STORAGE_KEYS.PROVIDERS, providers);
  
  console.log('Profile created successfully for user:', s.id);
  console.log('Updated provider data:', existingProvider || 'New provider created');
  console.log('Services saved:', services);
  console.log('Provider services after save:', existingProvider?.services || 'New provider');
  
  alert('Profile created successfully! Welcome to Tide Together! 🎉');
  location.hash = '#home';
}

function renderEditProfile(){
  const gate = gateIfNeeded('#edit-profile');
  if(gate){ location.hash = gate; return; }
  const s = getSession();
  if(!s){ location.hash = '#auth'; return; }
  
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const currentProvider = providers.find(p => p.id === s.id);
  if(!currentProvider){
    alert('Profile not found. Please create a profile first.');
    location.hash = '#create-profile';
    return;
  }
  
  mount(h`
    <div style="min-height:100vh;background:#f8f9fa;padding:40px 20px;">
      <div style="max-width:800px;margin:0 auto;">
        <div style="background:white;border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(0,0,0,0.1);">
          <div style="text-align:center;margin-bottom:32px">
            <h1 style="margin:0;font-size:32px;font-weight:700;color:var(--ink)">Edit Your Profile</h1>
            <p style="margin:8px 0 0;color:var(--ink-600);font-size:16px">Update your information and services</p>
          </div>
          
          <form onsubmit="event.preventDefault();submitProfileEdit()">
            <!-- Personal Information Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">👤 Personal Information</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">First Name</label>
                  <input id="editFirstName" placeholder="Enter your first name" value="${currentProvider.firstName || ''}" 
                         style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
                </div>
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Last Name</label>
                  <input id="editLastName" placeholder="Enter your last name" value="${currentProvider.lastName || ''}" 
                         style="width:100%;padding:14px;border:2px solid #e3e5e9;border-radius:10px;font-size:16px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" required />
                </div>
              </div>
            </div>
            
            <!-- Services Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">🎯 Services You Offer</h3>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px" id="editSvcChoices">
                ${SERVICES.map(svc => `
                  <label style="background:${currentProvider.services.includes(svc) ? '#fff5f5' : '#f8f9fa'};border:2px solid ${currentProvider.services.includes(svc) ? 'var(--crimson)' : '#e3e5e9'};padding:16px;border-radius:12px;cursor:pointer;text-align:center;transition:all 0.2s;display:flex;align-items:center;gap:8px" onmouseover="this.style.borderColor='var(--crimson)'" onmouseout="this.style.borderColor='${currentProvider.services.includes(svc) ? 'var(--crimson)' : '#e3e5e9'}'">
                    <input type="checkbox" value="${svc}" ${currentProvider.services.includes(svc) ? 'checked' : ''} style="margin:0;transform:scale(1.2)" onchange="this.parentElement.style.borderColor=this.checked?'var(--crimson)':'#e3e5e9';this.parentElement.style.background=this.checked?'#fff5f5':'#f8f9fa'">
                    <span style="font-weight:500">${svc}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Availability Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">📅 Weekly Availability</h3>
              <div style="display:flex;gap:12px;flex-wrap:wrap" id="editAvailChoices">
                ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d,i)=>`
                  <label style="background:${currentProvider.availability.includes(i) ? '#fff5f5' : '#f8f9fa'};border:2px solid ${currentProvider.availability.includes(i) ? 'var(--crimson)' : '#e3e5e9'};padding:12px 20px;border-radius:12px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:8px" onmouseover="this.style.borderColor='var(--crimson)'" onmouseout="this.style.borderColor='${currentProvider.availability.includes(i) ? 'var(--crimson)' : '#e3e5e9'}'">
                    <input type="checkbox" value="${i}" ${currentProvider.availability.includes(i) ? 'checked' : ''} style="margin:0;transform:scale(1.2)" onchange="this.parentElement.style.borderColor=this.checked?'var(--crimson)':'#e3e5e9';this.parentElement.style.background=this.checked?'#fff5f5':'#f8f9fa'">
                    <span style="font-weight:500">${d}</span>
                  </label>
                `).join('')}
              </div>
            </div>
            
            <!-- Bio Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">📝 About You</h3>
              <textarea id="editBio" rows="4" placeholder="Tell potential clients about your experience, skills, and what makes you unique..." 
                        style="width:100%;padding:16px;border:2px solid #e3e5e9;border-radius:12px;font-size:16px;resize:vertical;transition:border-color 0.2s;"
                        onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'">${currentProvider.bio || ''}</textarea>
            </div>
            
            <!-- Social Media Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">🔗 Social Media & Portfolio</h3>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Instagram</label>
                  <input id="editInstagram" placeholder="@yourusername" value="${currentProvider.socials?.instagram || ''}" 
                         style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                </div>
                <div>
                  <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">LinkedIn</label>
                  <input id="editLinkedin" placeholder="your-linkedin-profile" value="${currentProvider.socials?.linkedin || ''}" 
                         style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                </div>
              </div>
              <div style="margin-top:16px">
                <label style="display:block;margin-bottom:8px;font-weight:600;color:var(--ink)">Portfolio Website (optional)</label>
                <input id="editPortfolio" placeholder="https://yourportfolio.com" value="${currentProvider.socials?.portfolio || ''}" 
                       style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;transition:border-color 0.2s;"
                       onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
              </div>
            </div>
            
            <!-- Work Photos Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">📸 Work Photos</h3>
              <p style="margin:0 0 16px;color:var(--ink-600);font-size:14px">Add URLs to photos of your work (up to 5 images)</p>
              <div id="editPhotoInputs">
                ${(currentProvider.portfolio || []).concat(['','','']).slice(0,5).map((url, i) => `
                  <input class="edit-photo-input" placeholder="https://example.com/your-work-photo${i+1}.jpg" value="${url || ''}" 
                         style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;margin-bottom:8px;transition:border-color 0.2s;"
                         onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'" />
                `).join('')}
              </div>
            </div>
            
            <!-- Certifications Section -->
            <div style="margin-bottom:32px">
              <h3 style="margin:0 0 16px;font-size:20px;color:var(--ink)">🏆 Licenses & Certifications</h3>
              <p style="margin:0 0 16px;color:var(--ink-600);font-size:14px">Add any licenses or certifications you have (one per line)</p>
              <textarea id="editCertifications" rows="3" placeholder="State License&#10;CPR Certified&#10;Professional Certification" 
                        style="width:100%;padding:12px;border:2px solid #e3e5e9;border-radius:8px;font-size:14px;resize:vertical;transition:border-color 0.2s;"
                        onfocus="this.style.borderColor='var(--crimson)'" onblur="this.style.borderColor='#e3e5e9'">${(currentProvider.licenses || []).concat(currentProvider.certifications || []).join('\n')}</textarea>
            </div>
            
            <!-- Submit Button -->
            <div style="text-align:center">
              <button type="submit" style="background:var(--crimson);color:white;border:none;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:600;cursor:pointer;box-shadow:0 4px 16px rgba(153,0,0,0.3);transition:all 0.2s;"
                      onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(153,0,0,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 16px rgba(153,0,0,0.3)'">
                💾 Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `);
}

function submitProfileEdit(){
  const s = getSession();
  const firstName = document.getElementById('editFirstName').value.trim();
  const lastName = document.getElementById('editLastName').value.trim();
  const services = Array.from(document.querySelectorAll('#editSvcChoices input:checked')).map(i=>i.value);
  const availability = Array.from(document.querySelectorAll('#editAvailChoices input:checked')).map(i=>Number(i.value));
  const bio = document.getElementById('editBio').value.trim();
  const instagram = document.getElementById('editInstagram').value.trim();
  const linkedin = document.getElementById('editLinkedin').value.trim();
  const portfolio = document.getElementById('editPortfolio').value.trim();
  const certifications = document.getElementById('editCertifications').value.trim();
  
  // Collect work photos
  const photoInputs = document.querySelectorAll('.edit-photo-input');
  const portfolioPhotos = Array.from(photoInputs)
    .map(input => input.value.trim())
    .filter(url => url.length > 0);
  
  if(!firstName || !lastName){ alert('Please enter both first and last name.'); return; }
  if(services.length===0){ alert('Select at least one service you offer.'); return; }
  if(bio.length < 20){ alert('Please write a more detailed bio (at least 20 characters).'); return; }
  
  // Parse certifications
  const certList = certifications.split('\n')
    .map(cert => cert.trim())
    .filter(cert => cert.length > 0);
  
  // Build social media object
  const socials = {};
  if(instagram) socials.instagram = instagram.startsWith('@') ? instagram : `@${instagram}`;
  if(linkedin) socials.linkedin = linkedin;
  if(portfolio) socials.portfolio = portfolio;
  
  const fullName = `${firstName} ${lastName}`;
  const profile = { 
    firstName,
    lastName,
    fullName,
    services, 
    availability, 
    bio, 
    licenses: certList.filter(cert => cert.toLowerCase().includes('license')),
    certifications: certList.filter(cert => !cert.toLowerCase().includes('license')),
    portfolio: portfolioPhotos,
    socials 
  };
  
  const nextSession = { ...s, name: fullName, profile };
  setSession(nextSession);
  
  // Update provider in PROVIDERS list
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const existingProvider = providers.find(p => p.id === s.id);
  
  if(existingProvider){
    existingProvider.name = fullName;
    existingProvider.firstName = firstName;
    existingProvider.lastName = lastName;
    existingProvider.services = services;
    existingProvider.bio = bio;
    existingProvider.licenses = profile.licenses;
    existingProvider.certifications = profile.certifications;
    existingProvider.portfolio = portfolioPhotos;
    existingProvider.socials = socials;
    existingProvider.availability = availability;
    save(STORAGE_KEYS.PROVIDERS, providers);
  }
  
  alert('Profile updated successfully! 🎉');
  location.hash = `#profile?id=${s.id}`;
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
  // Replace the search term instead of appending
  onSearch(svc);
}

// Enhanced Booking flow
function openBooking(providerId){
  const session = getSession();
  if(!session){ 
    alert('Please sign in to book services.'); 
    location.hash = '#auth'; 
    return; 
  }
  
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const provider = providers.find(p => p.id === providerId);
  if(!provider){
    alert('Provider not found.');
    return;
  }
  
  // Show booking modal/dialog
  const bookingDialog = document.getElementById('bookingDialog');
  if(bookingDialog){
    document.getElementById('bookingProvider').textContent = `Book with ${provider.name}`;
    const serviceSelect = document.getElementById('bookingService');
    serviceSelect.innerHTML = provider.services.map(s => `<option value="${s}">${s}</option>`).join('');
    
    // Set date limits
    const dateInput = document.getElementById('bookingDate');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14);
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
    
    bookingDialog.showModal();
  } else {
    // Fallback to direct message
    startDM(providerId);
  }
}

function submitBooking(){
  const session = getSession();
  if(!session){ alert('Please sign in to book.'); return; }
  
  const service = document.getElementById('bookingService').value;
  const date = document.getElementById('bookingDate').value;
  const note = document.getElementById('bookingNote').value.trim();
  
  if(!service || !date){ alert('Please select a service and date.'); return; }
  
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const provider = providers.find(p => p.services.includes(service));
  if(!provider){ alert('Provider not found.'); return; }
  
  // Create booking request
  const bookings = load(STORAGE_KEYS.BOOKINGS, []);
  const booking = {
    id: `b_${Date.now()}`,
    providerId: provider.id,
    providerName: provider.name,
    userId: session.id,
    userName: session.name,
    service: service,
    date: date,
    note: note,
    status: 'pending',
    createdAt: Date.now()
  };
  
  bookings.push(booking);
  save(STORAGE_KEYS.BOOKINGS, bookings);
  
  // Send notification message to provider
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadId = `t_${[session.id, provider.id].sort().join('_')}`;
  const messageText = `Hi ${provider.name}! I'd like to book your ${service} service for ${date}. ${note ? `Note: ${note}` : ''}`;
  
  messages.push({
    id: `m_${Date.now()}`,
    threadId: threadId,
    from: session.id,
    fromName: session.name,
    to: provider.id,
    toName: provider.name,
    text: messageText,
    createdAt: Date.now()
  });
  save(STORAGE_KEYS.MESSAGES, messages);
  
  // Close dialog and show success
  document.getElementById('bookingDialog').close();
  alert(`Booking request sent to ${provider.name}! They'll contact you soon.`);
  
  // Navigate to messages to see the conversation
  location.hash = '#messages';
}

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
  messages.push({ id:`m_${Date.now()}`, threadId, from: session.id, fromName: session.name, to: providerId, toName: p.name, text:'Hi! I\'d like to book your service. When are you available?', createdAt: Date.now() });
  save(STORAGE_KEYS.MESSAGES, messages);
  openMessageThread(threadId, providerId);
}

function openMessageThread(threadId, partnerId){
  console.log('openMessageThread called with:', { threadId, partnerId });
  const newHash = `#message?thread=${encodeURIComponent(threadId)}&partner=${encodeURIComponent(partnerId)}`;
  location.hash = newHash;
  console.log('URL set to:', location.hash);
  // Don't call renderMessageThread directly - let the hashchange event handle it
}

function renderMessageThread(){
  const session = getSession();
  if(!session){ 
    console.log('No session found, redirecting to auth');
    location.hash = '#auth'; 
    return; 
  }
  
  const urlParams = new URLSearchParams(location.hash.split('?')[1] || '');
  const threadId = urlParams.get('thread');
  const partnerId = urlParams.get('partner');
  
  console.log('renderMessageThread - threadId:', threadId, 'partnerId:', partnerId);
  
  if(!threadId || !partnerId){
    console.log('Missing threadId or partnerId, redirecting to messages');
    location.hash = '#messages';
    return;
  }
  
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadMessages = messages.filter(m => m.threadId === threadId).sort((a, b) => a.createdAt - b.createdAt);
  const partner = load(STORAGE_KEYS.PROVIDERS, []).find(p => p.id === partnerId);
  
  console.log('Found partner:', partner);
  console.log('Thread messages count:', threadMessages.length);
  
  if(!partner){
    console.log('Partner not found, redirecting to messages');
    location.hash = '#messages';
    return;
  }
  
  mount(h`
    <section>
      <button class="tt-chip" onclick="location.hash='#messages'">← Back to Messages</button>
      <div class="tt-hero__card" style="margin-top: 12px;">
        <h2 class="tt-section-title">Conversation with ${partner.name}</h2>
        <div id="messageContainer" style="max-height: 400px; overflow-y: auto; border: 1px solid #eee; padding: 16px; margin: 16px 0; background: #f9f9f9;">
          ${threadMessages.map(msg => {
            const isFromMe = msg.from === session.id;
            return h`<div style="margin: 8px 0; display: flex; ${isFromMe ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}">
              <div style="max-width: 70%; padding: 8px 12px; border-radius: 12px; ${isFromMe ? 'background: #007bff; color: white;' : 'background: white; border: 1px solid #ddd;'}">
                <div style="font-size: 12px; opacity: 0.7; margin-bottom: 4px;">${isFromMe ? 'You' : msg.fromName}</div>
                <div>${msg.text}</div>
                <div style="font-size: 10px; opacity: 0.7; margin-top: 4px;">${new Date(msg.createdAt).toLocaleString()}</div>
              </div>
            </div>`
          }).join('') || '<div style="text-align: center; color: #666; padding: 20px;">No messages yet</div>'}
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <input id="messageInput" placeholder="Type your message..." style="flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px;" onkeypress="if(event.key==='Enter') sendMessage('${threadId}', '${partnerId}')" />
          <button class="tt-button" onclick="sendMessage('${threadId}', '${partnerId}')">Send</button>
        </div>
      </div>
    </section>
  `);
  
  // Scroll to bottom of messages
  setTimeout(() => {
    const container = document.getElementById('messageContainer');
    if(container) container.scrollTop = container.scrollHeight;
  }, 100);
}

function sendMessage(threadId, partnerId){
  const session = getSession();
  if(!session){ alert('Please sign in to send messages.'); return; }
  
  const messageInput = document.getElementById('messageInput');
  const text = messageInput.value.trim();
  if(!text){ alert('Please enter a message.'); return; }
  
  const partner = load(STORAGE_KEYS.PROVIDERS, []).find(p => p.id === partnerId);
  if(!partner){ alert('Partner not found.'); return; }
  
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  messages.push({ 
    id: `m_${Date.now()}`, 
    threadId, 
    from: session.id, 
    fromName: session.name, 
    to: partnerId, 
    toName: partner.name, 
    text, 
    createdAt: Date.now() 
  });
  save(STORAGE_KEYS.MESSAGES, messages);
  
  messageInput.value = '';
  renderMessageThread();
}

function filterAdminServices(service){
  const url = new URL(location.href);
  if(service){
    url.searchParams.set('service', service);
  } else {
    url.searchParams.delete('service');
  }
  history.replaceState(null, '', url.toString());
  renderAdmin();
}

function banProvider(id){
  if(!confirm('Remove/ban this provider?')) return;
  let providers = load(STORAGE_KEYS.PROVIDERS, []);
  providers = providers.filter(p => p.id !== id);
  save(STORAGE_KEYS.PROVIDERS, providers);
  renderAdmin();
}

// Support request functions
function submitSupportRequest(){
  const email = document.getElementById('supEmail').value.trim();
  const message = document.getElementById('supMsg').value.trim();
  
  if(!email || !message){
    alert('Please fill in all fields.');
    return;
  }
  
  const supportRequests = load(STORAGE_KEYS.SUPPORT_REQUESTS, []);
  const request = {
    id: `sr_${Date.now()}`,
    email: email,
    message: message,
    status: 'pending',
    createdAt: Date.now()
  };
  
  supportRequests.push(request);
  save(STORAGE_KEYS.SUPPORT_REQUESTS, supportRequests);

  // Send notification message to user
  sendSupportNotificationToUser(email, request.id);
  
  alert('Support request submitted successfully! We\'ll get back to you soon.');
  
  // Clear form
  document.getElementById('supEmail').value = '';
  document.getElementById('supMsg').value = '';
}

function respondToSupport(requestId){
  const response = prompt('Enter your response to the user:');
  if(!response) return;
  
  const supportRequests = load(STORAGE_KEYS.SUPPORT_REQUESTS, []);
  const request = supportRequests.find(r => r.id === requestId);
  if(request){
    request.adminResponse = response;
    request.responseDate = Date.now();
    request.status = 'responded';
    save(STORAGE_KEYS.SUPPORT_REQUESTS, supportRequests);
    
    // Send message notification to user
    sendSupportResponseToUser(request.email, response, requestId);
    
    // Send email notification (simulated)
    sendSupportEmailNotification(request.email, response);
    
    alert('Response sent successfully!');
    renderSupport();
  }
}

function markSupportResolved(requestId){
  if(!confirm('Mark this support request as resolved?')) return;
  
  const supportRequests = load(STORAGE_KEYS.SUPPORT_REQUESTS, []);
  const request = supportRequests.find(r => r.id === requestId);
  if(request){
    request.status = 'resolved';
    request.resolvedDate = Date.now();
    save(STORAGE_KEYS.SUPPORT_REQUESTS, supportRequests);
    
    alert('Support request marked as resolved!');
    renderSupport();
  }
}

function deleteSupportRequest(requestId){
  if(!confirm('Delete this support request? This action cannot be undone.')) return;
  
  const supportRequests = load(STORAGE_KEYS.SUPPORT_REQUESTS, []);
  const filtered = supportRequests.filter(r => r.id !== requestId);
  save(STORAGE_KEYS.SUPPORT_REQUESTS, filtered);
  
  alert('Support request deleted.');
  renderSupport();
}

function sendSupportEmailNotification(userEmail, response){
  // Simulate email notification
  console.log(`📧 Email sent to ${userEmail}:`);
  console.log(`Subject: Re: Your Tide Together Support Request`);
  console.log(`Message: ${response}`);
  console.log(`\nThis is a simulated email notification. In a real application, this would send an actual email to the user.`);
}

function sendSupportNotificationToUser(userEmail, requestId){
  // Find the user by email
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const user = providers.find(p => p.email === userEmail);
  
  if(!user) {
    console.log(`User with email ${userEmail} not found for support notification`);
    return;
  }
  
  // Create a message from the support bot
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadId = `support_${requestId}`;
  
  const botMessage = {
    id: `msg_${Date.now()}`,
    threadId: threadId,
    from: 'support_bot',
    fromName: 'Tide Together Support',
    to: user.id,
    toName: user.name,
    text: `Thank you for contacting Tide Together Support! We have received your support request and our team is reviewing it. We'll get back to you as soon as possible.\n\nRequest ID: ${requestId}\nStatus: Received and Under Review\n\nIf you have any urgent concerns, please don't hesitate to reach out again.`,
    createdAt: Date.now()
  };
  
  messages.push(botMessage);
  save(STORAGE_KEYS.MESSAGES, messages);
  
  console.log(`📨 Support notification sent to user ${user.name} (${userEmail})`);
}

function sendSupportResponseToUser(userEmail, adminResponse, requestId){
  // Find the user by email
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const user = providers.find(p => p.email === userEmail);
  
  if(!user) {
    console.log(`User with email ${userEmail} not found for support response`);
    return;
  }
  
  // Create a message from the support bot with admin response
  const messages = load(STORAGE_KEYS.MESSAGES, []);
  const threadId = `support_${requestId}`;
  
  const botMessage = {
    id: `msg_${Date.now()}`,
    threadId: threadId,
    from: 'support_bot',
    fromName: 'Tide Together Support',
    to: user.id,
    toName: user.name,
    text: `Hello! Our support team has reviewed your request and here's our response:\n\n${adminResponse}\n\nRequest ID: ${requestId}\nStatus: Responded\n\nIf you need further assistance, please don't hesitate to contact us again. Thank you for using Tide Together!`,
    createdAt: Date.now()
  };
  
  messages.push(botMessage);
  save(STORAGE_KEYS.MESSAGES, messages);
  
  console.log(`📨 Support response sent to user ${user.name} (${userEmail})`);
}

function resetSupportRequests(){
  if(!confirm('Reset all support requests to sample data? This will delete all current requests.')) return;
  
  const sampleRequests = [
    {
      id: 'sr_sample1',
      email: 'student1@crimson.ua.edu',
      message: 'I need help with a provider who didn\'t show up for our appointment. Can you help me get a refund?',
      status: 'pending',
      createdAt: Date.now() - 86400000 * 2 // 2 days ago
    },
    {
      id: 'sr_sample2',
      email: 'student2@crimson.ua.edu',
      message: 'I want to report inappropriate behavior from a user. They sent me inappropriate messages.',
      status: 'responded',
      adminResponse: 'Thank you for reporting this. We have reviewed the case and taken appropriate action. The user has been warned and their account is being monitored.',
      responseDate: Date.now() - 86400000 * 1, // 1 day ago
      createdAt: Date.now() - 86400000 * 3 // 3 days ago
    },
    {
      id: 'sr_sample3',
      email: 'student3@crimson.ua.edu',
      message: 'How do I update my profile information? I can\'t find the edit button.',
      status: 'resolved',
      adminResponse: 'You can now edit your profile by going to your profile page and clicking the "Edit Profile" button. We\'ve added this feature based on your feedback!',
      responseDate: Date.now() - 86400000 * 4, // 4 days ago
      resolvedDate: Date.now() - 86400000 * 1, // 1 day ago
      createdAt: Date.now() - 86400000 * 5 // 5 days ago
    }
  ];
  
  save(STORAGE_KEYS.SUPPORT_REQUESTS, sampleRequests);
  alert('Support requests reset to sample data!');
  renderSupport();
}

// Debug function to test support system
window.debugSupport = function(){
  const session = getSession();
  const supportRequests = load(STORAGE_KEYS.SUPPORT_REQUESTS, []);
  const adminEmails = [
    'faarnaoperez@crimson.ua.edu',
    'dhnguyen3@crimson.ua.edu', 
    'zkmccluney@crimson.ua.edu',
    'jdmiller16@crimson.ua.edu'
  ];
  const isAdmin = session && adminEmails.includes(session.email);
  
  console.log('=== SUPPORT SYSTEM DEBUG ===');
  console.log('Current session:', session);
  console.log('Is admin:', isAdmin);
  console.log('Support requests count:', supportRequests.length);
  console.log('Support requests:', supportRequests);
  console.log('Admin emails:', adminEmails);
  console.log('===========================');
  
  return {
    session,
    isAdmin,
    supportRequests,
    adminEmails
  };
};

// Debug function to test profile system
window.debugProfile = function(){
  const session = getSession();
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const currentProvider = providers.find(p => p.id === session?.id);
  
  console.log('=== PROFILE SYSTEM DEBUG ===');
  console.log('Current session:', session);
  console.log('Current provider:', currentProvider);
  console.log('All providers:', providers);
  console.log('Has profile in session:', !!session?.profile);
  console.log('Profile data:', session?.profile);
  console.log('============================');
  
  return {
    session,
    currentProvider,
    providers,
    hasProfile: !!session?.profile
  };
};

// Debug function to test profile persistence
window.debugProfilePersistence = function(){
  const session = getSession();
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const userProvider = session ? providers.find(p => p.id === session.id) : null;
  
  console.log('=== PROFILE PERSISTENCE DEBUG ===');
  console.log('Current session:', session);
  console.log('User provider:', userProvider);
  console.log('Has complete profile:', userProvider && userProvider.services && userProvider.services.length > 0 && !userProvider.services.includes('New User'));
  console.log('All providers:', providers);
  console.log('================================');
  
  return {
    session,
    userProvider,
    hasCompleteProfile: userProvider && userProvider.services && userProvider.services.length > 0 && !userProvider.services.includes('New User')
  };
};

// Debug function to test authentication flow
window.debugAuthFlow = function(cwid, email){
  const userId = `u_${cwid}`;
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const existingProvider = providers.find(p => p.id === userId);
  
  console.log('=== AUTH FLOW DEBUG ===');
  console.log('CWID:', cwid);
  console.log('Email:', email);
  console.log('User ID:', userId);
  console.log('Existing provider:', existingProvider);
  console.log('Has services:', existingProvider?.services);
  console.log('Services length:', existingProvider?.services?.length);
  console.log('Includes New User:', existingProvider?.services?.includes('New User'));
  console.log('Should go to home:', existingProvider && existingProvider.services && existingProvider.services.length > 0 && !existingProvider.services.includes('New User'));
  console.log('======================');
  
  return {
    userId,
    existingProvider,
    shouldGoToHome: existingProvider && existingProvider.services && existingProvider.services.length > 0 && !existingProvider.services.includes('New User')
  };
};

window.testLogin = function() {
  console.log('=== TEST LOGIN ===');
  console.log('Testing with CWID: 12345678, Email: test@crimson.ua.edu');
  
  // Simulate form submission
  document.getElementById('cwid_page').value = '12345678';
  document.getElementById('email_page').value = 'test@crimson.ua.edu';
  
  console.log('Calling submitAuthPage...');
  submitAuthPage();
  
  console.log('=== END TEST ===');
};

// Auth dialog events
document.getElementById('loginBtn').addEventListener('click', () => {
  const s = getSession();
  if(s){ 
    setSession(null); 
    console.log('User logged out, redirecting to auth page');
    navigate('#auth'); 
    return; 
  }
  document.getElementById('authDialog').showModal();
});

document.getElementById('authSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const cwid = document.getElementById('cwid').value.trim();
  const email = document.getElementById('email').value.trim();
  if(!/^\d{8}$/.test(cwid)){ alert('Enter a valid CWID (exactly 8 digits).'); return; }
  if(!/@crimson\.ua\.edu$/i.test(email)){ alert('Use your Crimson email.'); return; }
  const name = email.split('@')[0].replace('.', ' ');
  const userId = `u_${cwid}`;
  
  // Check if user already has a complete profile
  const providers = load(STORAGE_KEYS.PROVIDERS, []);
  const existingProvider = providers.find(p => p.id === userId);
  
  if(existingProvider && existingProvider.services && existingProvider.services.length > 0 && !existingProvider.services.includes('New User')){
    // User has a complete profile - load it into session
    const profile = {
      firstName: existingProvider.firstName || '',
      lastName: existingProvider.lastName || '',
      fullName: existingProvider.name,
      services: existingProvider.services,
      availability: existingProvider.availability || [],
      bio: existingProvider.bio || '',
      licenses: existingProvider.licenses || [],
      certifications: existingProvider.certifications || [],
      portfolio: existingProvider.portfolio || [],
      socials: existingProvider.socials || {}
    };
    
    setSession({ id: userId, cwid, email, name: existingProvider.name, profile });
    document.getElementById('authDialog').close();
    console.log('Dialog auth: Navigating to #home');
    navigate('#home');
  } else {
    // User needs to create/complete profile
    if(!existingProvider){
      providers.push({ 
        id: userId, 
        name: name, 
        services: ['New User'], 
        rating: 5.0, 
        reviewsCount: 0, 
        distanceMiles: 0.5, 
        bio: 'New user - profile setup pending', 
        licenses: [], 
        certifications: [], 
        portfolio: [], 
        socials: {}, 
        availability: [], 
        campus: 'UA',
        cwid: cwid,
        email: email
      });
      save(STORAGE_KEYS.PROVIDERS, providers);
    }
    
    setSession({ id: userId, cwid, email, name, profile: null });
    document.getElementById('authDialog').close();
    console.log('Dialog auth: Navigating to #create-profile');
    navigate('#create-profile');
  }
});

// Booking dialog event listener
document.getElementById('bookingSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  submitBooking();
});

// Utilities
function groupBy(arr, keyFn){
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {});
}

// Utility function to clear all data (for testing)
function clearAllData(){
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  location.reload();
}

// Init
console.log('Initializing application...');
seed();
updateAuthUI();

// Check for existing session on page load
if(validateSession()) {
  const existingSession = getSession();
  console.log('Found valid existing session:', existingSession);
  console.log('User is already logged in, navigating to requested page or home');
  // User is already logged in, navigate to the requested page or home
  const targetHash = location.hash || '#home';
  console.log('Navigating to:', targetHash);
  navigate(targetHash);
} else {
  console.log('No valid session found, showing auth page');
  // No session found, show auth page
  navigate('#auth');
}

window.addEventListener('hashchange', () => {
  console.log('Hash changed to:', location.hash);
  navigate(location.hash);
});
document.querySelectorAll('.tt-nav__link').forEach(btn => btn.addEventListener('click', (e)=>{
  const route = e.currentTarget.getAttribute('data-route');
  location.hash = route;
}));


