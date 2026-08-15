/* =====================================================
   DATA
===================================================== */
const CATEGORIES = [
  {id:'tech', name:'Technology', icon:'cpu'},
  {id:'sports', name:'Sports', icon:'dumbbell'},
  {id:'arts', name:'Arts & Design', icon:'palette'},
  {id:'music', name:'Music', icon:'music'},
  {id:'gaming', name:'Gaming', icon:'gamepad-2'},
  {id:'volunteer', name:'Volunteering', icon:'heart-handshake'},
  {id:'business', name:'Business', icon:'briefcase'},
  {id:'culture', name:'Culture', icon:'globe'},
];
const LOCATIONS = ['Main Campus','North Hall','Engineering Quad','Arts Building','Online / Remote','Downtown Center'];
const ACTIVITIES = ['Weekly meetups','Competitions','Workshops','Volunteering days','Social mixers','Tournaments','Field trips','Guest speakers'];

let CLUBS = [
  {id:'c1', name:'CodeCraft Society', cat:'tech', location:'Engineering Quad', members:842, rating:4.8, popularity:98, activity:95, img:'programming', desc:"A builder's guild for people who'd rather ship something than talk about it. Weekly hack nights, real projects, real teammates.", activities:['Weekly meetups','Workshops','Competitions'], founded:2019, meets:'Thursdays, 6:30 PM',
    reviews:[{name:'Priya N.', rating:5, text:'Best decision I made freshman year — shipped my first real app here.', time:'2 weeks ago'},{name:'Marcus T.', rating:4, text:'Great energy, wish meetings ran a bit shorter.', time:'1 month ago'}]},
  {id:'c2', name:'Summit Climbers', cat:'sports', location:'North Hall', members:356, rating:4.9, popularity:88, activity:82, img:'climbing', desc:"Indoor and outdoor climbing for every level. We belay each other, literally and figuratively.", activities:['Weekly meetups','Field trips'], founded:2017, meets:'Tuesdays, 5:00 PM',
    reviews:[{name:'Dana K.', rating:5, text:'Incredibly welcoming for total beginners.', time:'3 days ago'}]},
  {id:'c3', name:'Aperture Collective', cat:'arts', location:'Arts Building', members:214, rating:4.7, popularity:71, activity:68, img:'photography', desc:"A photography and visual arts crew running critiques, gallery nights, and campus-wide exhibitions.", activities:['Workshops','Social mixers'], founded:2021, meets:'Mondays, 7:00 PM', reviews:[]},
  {id:'c4', name:'Off-Beat Records', cat:'music', location:'Main Campus', members:498, rating:4.6, popularity:80, activity:74, img:'music', desc:"Musicians of every genre, jamming, recording, and putting on shows across the city.", activities:['Weekly meetups','Social mixers'], founded:2015, meets:'Wednesdays, 8:00 PM', reviews:[{name:'Owen R.', rating:5, text:'Played my first live show because of this club.', time:'5 days ago'}]},
  {id:'c5', name:'Nightfall Esports', cat:'gaming', location:'Online / Remote', members:1204, rating:4.9, popularity:99, activity:97, img:'esports', desc:"Competitive and casual gaming — ranked ladders, LAN nights, and a top-25 varsity roster.", activities:['Tournaments','Weekly meetups'], founded:2018, meets:'Fridays, 7:00 PM', reviews:[{name:'Kayla B.', rating:5, text:'Top tier organization, actual coaching staff.', time:'1 week ago'}]},
  {id:'c6', name:'Groundwork Volunteers', cat:'volunteer', location:'Downtown Center', members:389, rating:4.9, popularity:84, activity:79, img:'volunteer', desc:"Local partnerships for food security, tutoring, and neighborhood cleanups — real impact, every week.", activities:['Volunteering days','Field trips'], founded:2016, meets:'Saturdays, 9:00 AM', reviews:[]},
  {id:'c7', name:'Founders Circle', cat:'business', location:'Engineering Quad', members:276, rating:4.5, popularity:69, activity:60, img:'startup', desc:"A startup and case-comp club for people building something on the side — pitch nights included.", activities:['Guest speakers','Workshops'], founded:2020, meets:'Tuesdays, 6:00 PM', reviews:[]},
  {id:'c8', name:'World Table', cat:'culture', location:'Main Campus', members:312, rating:4.8, popularity:73, activity:66, img:'culture', desc:"A cultural exchange club — language tables, food nights, and celebrations from every corner of campus.", activities:['Social mixers','Field trips'], founded:2014, meets:'Fridays, 5:30 PM', reviews:[]},
  {id:'c9', name:'Circuit Robotics', cat:'tech', location:'Engineering Quad', members:187, rating:4.7, popularity:65, activity:58, img:'robotics', desc:"Design, build, and compete with autonomous robots — beginner-friendly, competition-tested.", activities:['Competitions','Workshops'], founded:2019, meets:'Sundays, 2:00 PM', reviews:[]},
  {id:'c10', name:'Riverside Runners', cat:'sports', location:'Main Campus', members:445, rating:4.6, popularity:75, activity:71, img:'running', desc:"Casual to competitive running crew — trail runs, track sessions, and a lot of post-run pancakes.", activities:['Weekly meetups','Competitions'], founded:2018, meets:'Mon/Wed/Fri, 6:30 AM', reviews:[]},
  {id:'c11', name:'Clay & Ink Studio', cat:'arts', location:'Arts Building', members:159, rating:4.8, popularity:58, activity:52, img:'pottery', desc:"Ceramics, illustration, and print-making in an open studio format — bring an idea, leave with an object.", activities:['Workshops'], founded:2022, meets:'Thursdays, 4:00 PM', reviews:[]},
  {id:'c12', name:'Debate & Discourse', cat:'culture', location:'North Hall', members:203, rating:4.7, popularity:62, activity:55, img:'debate', desc:"Competitive debate and public speaking — nationally ranked, welcoming to first-timers.", activities:['Competitions','Guest speakers'], founded:2013, meets:'Wednesdays, 6:00 PM', reviews:[]},
];

const EVENT_TEMPLATES = {
  c1:[{mo:'MAR',day:'14',title:'Hackathon Kickoff Night',time:'6:30 PM · Innovation Lab'},{mo:'MAR',day:'21',title:'React Workshop: Building UIs',time:'6:30 PM · Room 204'},{mo:'APR',day:'02',title:'Demo Day + Pizza',time:'7:00 PM · Main Atrium'}],
};
function eventsFor(club){ return (EVENT_TEMPLATES[club.id] || [
  {mo:'MAR',day:'12',title:'Weekly Meetup',time:club.meets},
  {mo:'MAR',day:'26',title:'Member Social',time:'Casual hangout, snacks provided'},
  {mo:'APR',day:'09',title:'Skill-Share Workshop',time:'Bring a beginner, learn something new'},
]).map((e,i)=>({...e, key:club.id+'-'+i, club:club.name, clubId:club.id})); }
function allEvents(){ return CLUBS.flatMap(eventsFor); }

/* Feedback / roadmap board — the mechanism behind Nexus's "self-improving" loop.
   Items move Open -> Planned -> Building automatically as votes cross thresholds;
   Shipped items are marked once the fix actually lands, with a note on what changed. */
const FEEDBACK_PROMOTE = {planned:8, building:14};
let FEEDBACK = [
  {id:'f1', type:'bug', title:'Search barely finds anything', text:'Searching by activity or location returns nothing, even though the search bar says it should work.', author:'Priya N.', time:'3 weeks ago', votes:24, status:'shipped', shippedNote:'Search now checks name, category, location, and activities — not just the description.'},
  {id:'f2', type:'idea', title:'Add a light mode', text:"Everything is dark by default — some of us actually prefer working in daylight.", author:'Marcus T.', time:'3 weeks ago', votes:31, status:'shipped', shippedNote:'Shipped as the "Sunny" theme — switch it from the topbar.'},
  {id:'f3', type:'bug', title:"Club photos don't match the club", text:'The climbing club shows a photo that looks like a coding meetup.', author:'Dana K.', time:'2 weeks ago', votes:19, status:'shipped', shippedNote:'Every club now pulls a photo that actually matches its topic.'},
  {id:'f4', type:'bug', title:'Detail page tabs look like broken browser buttons', text:'About / Events / Reviews / Contact render as plain grey boxes instead of styled tabs.', author:'Owen R.', time:'1 week ago', votes:8, status:'shipped', shippedNote:'Fixed a missing style reset — the tabs render as designed now.'},
  {id:'f5', type:'idea', title:'Let me filter clubs by meeting day', text:"I only have Tuesday/Thursday evenings free — filtering by day would save a lot of clicking through.", author:'Kayla B.', time:'5 days ago', votes:11, status:'planned'},
  {id:'f6', type:'idea', title:'Notify me when a club I favorited posts a new event', text:'Right now I have to keep checking back manually.', author:'Sam O.', time:'4 days ago', votes:9, status:'planned'},
  {id:'f7', type:'idea', title:'Show who else RSVPed to an event', text:"Would love to see which friends are going before I commit.", author:'Jordan K.', time:'6 days ago', votes:14, status:'building'},
  {id:'f8', type:'bug', title:"Message thread doesn't jump to the newest reply", text:'Have to scroll down manually every time an officer replies.', author:'Priya N.', time:'2 days ago', votes:4, status:'open'},
  {id:'f9', type:'idea', title:'Theme should follow my system setting', text:'Would be nice if Nexus opened in whichever mode my OS is already in, instead of always Midnight.', author:'Anonymous', time:'1 day ago', votes:3, status:'open'},
  {id:'f10', type:'praise', title:'The dashboard activity feed is such a nice touch', text:'Makes the whole thing feel alive rather than static.', author:'Dana K.', time:'2 days ago', votes:6, status:'open'},
];

/* in-memory app state — resets each session, nothing persisted to disk */
const state = {
  user: null,
  joined: new Set(),
  view: 'dashboard',
  params: {},
  search: '',
  filters: {cat:new Set(), loc:'', sort:'popular', act:new Set()},
  activityLog: [],
  rsvp: new Set(),
  eventsOnlyMine: false,
  theme: 'midnight',
  themeOpen: false,
  feedbackVotes: new Set(),
  feedbackTab: 'board',
  feedbackTypeFilter: 'all',
  notifications: [
    {icon:'calendar', text:'CodeCraft Society posted a new event: Hackathon Kickoff Night', time:'2h ago', read:false},
    {icon:'star', text:'Nightfall Esports crossed 1,200 members', time:'1d ago', read:false},
    {icon:'heart-handshake', text:'Groundwork Volunteers is looking for Saturday help', time:'2d ago', read:true},
  ],
  threads: {
    c1:[{from:'them', text:'Hey! Saw you were checking out CodeCraft — happy to answer any questions before Thursday.', time:'10:12 AM'}],
    c5:[{from:'them', text:'Tryouts for the ranked roster open next week, let us know if you want in.', time:'Yesterday'}],
  },
  activeThread: 'c1',
  navOpen: false,
  notifOpen: false,
  userMenuOpen: false,
};

/* Extra search terms layered onto each club's base keyword so results stay tightly on-topic
   (loremflickr pulls real, tagged photos by keyword — unlike the old picsum "seed" images,
   which just used the seed to randomize a completely unrelated stock photo). */
const IMG_KEYWORDS = {
  programming: 'coding,laptop', climbing: 'rockclimbing', photography: 'camera,photographer',
  music: 'band,concert', esports: 'gaming,esports', volunteer: 'volunteering,charity',
  startup: 'startup,pitch', culture: 'festival,culture', robotics: 'robot,robotics',
  running: 'running,marathon', pottery: 'pottery,ceramics', debate: 'debate,publicspeaking',
};
const THEMES = [
  {id:'midnight', name:'Midnight', icon:'moon', desc:'Dark mode (default)'},
  {id:'sunny', name:'Sunny', icon:'sun', desc:'Light mode'},
];
function setTheme(id){
  state.theme = id;
  state.themeOpen = false;
  document.documentElement.setAttribute('data-theme', id === 'midnight' ? '' : id);
  renderTopbarOnly();
}
function img(seed, w=600, h=400){
  const key = String(seed).split('-')[0]; // strip suffixes like "programming-avatar"
  const terms = IMG_KEYWORDS[key] || key;
  let hash = 0;
  for(let i=0;i<String(seed).length;i++) hash = (hash*31 + String(seed).charCodeAt(i)) >>> 0;
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(terms)}?lock=${hash % 100000}`;
}
function initials(name){ return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
function logActivity(icon, text){
  state.activityLog.unshift({icon, text, time:'Just now'});
  if(state.activityLog.length > 30) state.activityLog.pop();
}

/* =====================================================
   TOAST
===================================================== */
let toastTimer;
function toast(msg, icon='check-circle'){
  const t = document.getElementById('toast');
  t.innerHTML = `<i data-lucide="${icon}" size="17" color="#3FE0E8"></i><span>${msg}</span>`;
  lucide.createIcons();
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}

/* =====================================================
   ROUTER
===================================================== */
const AUTH_VIEWS = ['login','register'];
function navigate(view, params={}){
  state.view = view; state.params = params;
  state.navOpen = false; state.notifOpen=false; state.userMenuOpen=false; state.themeOpen=false;
  window.scrollTo({top:0});
  const bar = document.getElementById('routeProgress');
  bar.style.opacity='1'; bar.style.width='70%';
  setTimeout(()=>{ bar.style.width='100%'; setTimeout(()=>{bar.style.opacity='0'; bar.style.width='0%';},250); }, 120);
  render();
}
window.addEventListener('hashchange', ()=>{
  const [view, id] = location.hash.replace('#','').split('/');
  navigate(view || 'dashboard', id ? {id} : {});
});
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.dropdown')){ state.notifOpen=false; state.userMenuOpen=false; state.themeOpen=false; renderTopbarOnly(); }
});

/* =====================================================
   SIDEBAR + TOPBAR
===================================================== */
const NAV_MAIN = [
  {id:'dashboard', label:'Dashboard', icon:'layout-dashboard'},
  {id:'discover', label:'Discover', icon:'compass'},
  {id:'my-clubs', label:'My Clubs', icon:'users', countKey:'joined'},
  {id:'events', label:'Events', icon:'calendar-days'},
  {id:'messages', label:'Messages', icon:'message-circle', countKey:'threads'},
];
const NAV_ACCOUNT = [
  {id:'profile', label:'Profile & Settings', icon:'settings'},
];
const NAV_COMMUNITY = [
  {id:'feedback', label:'Feedback & Roadmap', icon:'lightbulb'},
];

function sidebarHtml(){
  const links = (arr)=>arr.map(n=>{
    let count = '';
    if(n.countKey==='joined') count = state.joined.size;
    if(n.countKey==='threads') count = Object.values(state.threads).reduce((a,t)=>a+t.filter(m=>m.from==='them').length,0);
    return `<a href="#${n.id}" class="side-link ${state.view===n.id?'active':''}">
      <i data-lucide="${n.icon}" size="17"></i> ${n.label}
      ${count!=='' ? `<span class="badge-count">${count}</span>` : ''}
    </a>`;
  }).join('');
  return `
  <div class="sidebar-overlay ${state.navOpen?'show':''}" onclick="state.navOpen=false; render();"></div>
  <aside class="sidebar ${state.navOpen?'open':''}">
    <div class="sidebar-brand">
      <span class="logo-mark"><i data-lucide="hexagon" color="#05070D" size="18"></i></span>
      <span style="display:flex; flex-direction:column; line-height:1.15;">Nexus<span style="font-family:'JetBrains Mono',monospace; font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; color:var(--slate-dim); font-weight:500;">The Club Finder</span></span>
      <button class="icon-btn sidebar-close" onclick="state.navOpen=false; render();"><i data-lucide="x" size="16"></i></button>
    </div>
    <div class="sidebar-scroll">
      <div class="side-section-title">Main</div>
      ${links(NAV_MAIN)}
      <div class="side-section-title">Account</div>
      ${links(NAV_ACCOUNT)}
      <div class="side-section-title">Community</div>
      ${links(NAV_COMMUNITY)}
      <div class="sidebar-cta">
        <p style="font-size:12.5px; font-weight:600; margin-bottom:4px;">Run a club?</p>
        <p style="font-size:12px; color:var(--slate); line-height:1.5; margin-bottom:12px;">List it on Nexus and reach students actively searching.</p>
        <a href="#create-club" class="btn btn-primary btn-sm btn-block">Create a club</a>
      </div>
    </div>
    <div class="sidebar-user">
      ${state.user ? `
        <div class="mini-avatar">${initials(state.user.name)}</div>
        <div style="flex:1; min-width:0;">
          <p style="font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${state.user.name}</p>
          <p class="font-mono text-slate" style="font-size:10.5px;">${state.user.email}</p>
        </div>
        <button class="icon-btn" title="Sign out" onclick="logout()"><i data-lucide="log-out" size="15"></i></button>
      ` : `
        <a href="#login" class="btn btn-ghost btn-sm btn-block">Log in</a>
      `}
    </div>
  </aside>`;
}

function topbarHtml(){
  const unread = state.notifications.filter(n=>!n.read).length;
  return `
  <div class="topbar">
    <button class="icon-btn hamburger" onclick="state.navOpen=true; render();"><i data-lucide="menu" size="18"></i></button>
    <div class="topbar-search">
      <i data-lucide="search" size="16" color="#5C6884"></i>
      <input placeholder="Search clubs, categories, activities…" value="${state.view==='discover'?state.search:''}" onkeydown="if(event.key==='Enter'){ state.search=this.value; navigate('discover'); }"/>
    </div>
    <div class="topbar-right">
      <a href="#create-club" class="btn btn-primary btn-sm" style="display:none" id="topCreateBtn"><i data-lucide="plus" size="14"></i> Create club</a>
      <div class="dropdown">
        <button class="icon-btn" title="Theme" onclick="event.stopPropagation(); state.themeOpen=!state.themeOpen; state.notifOpen=false; state.userMenuOpen=false; renderTopbarOnly();">
          <i data-lucide="${THEMES.find(t=>t.id===state.theme).icon}" size="17"></i>
        </button>
        <div class="dropdown-panel ${state.themeOpen?'open':''}" style="width:220px;">
          <div class="dropdown-head">Theme</div>
          ${THEMES.map(t=>`
            <div class="user-menu-item" style="cursor:pointer; justify-content:space-between;" onclick="setTheme('${t.id}')">
              <span style="display:flex; align-items:center; gap:10px;"><i data-lucide="${t.icon}" size="15"></i> ${t.name}</span>
              ${state.theme===t.id ? '<i data-lucide="check" size="14" color="#3FE0E8"></i>' : ''}
            </div>`).join('')}
        </div>
      </div>
      <div class="dropdown">
        <button class="icon-btn" onclick="event.stopPropagation(); state.notifOpen=!state.notifOpen; state.userMenuOpen=false; state.themeOpen=false; renderTopbarOnly();">
          <i data-lucide="bell" size="17"></i>
          ${unread ? '<span class="dot-badge"></span>' : ''}
        </button>
        <div class="dropdown-panel ${state.notifOpen?'open':''}">
          <div class="dropdown-head">Notifications ${unread?`<span class="tag">${unread} new</span>`:''}</div>
          ${state.notifications.map(n=>`
            <div class="notif-item">
              <div class="notif-ic"><i data-lucide="${n.icon}" size="14"></i></div>
              <div><p style="font-size:12.5px; line-height:1.5; ${n.read?'color:var(--slate);':''}">${n.text}</p><p class="font-mono text-slate" style="font-size:10.5px; margin-top:3px;">${n.time}</p></div>
            </div>`).join('')}
        </div>
      </div>
      <div class="dropdown">
        <button class="icon-btn" onclick="event.stopPropagation(); state.userMenuOpen=!state.userMenuOpen; state.notifOpen=false; state.themeOpen=false; renderTopbarOnly();">
          ${state.user ? `<span style="font-size:12px; font-weight:700;">${initials(state.user.name)}</span>` : `<i data-lucide="user" size="17"></i>`}
        </button>
        <div class="dropdown-panel ${state.userMenuOpen?'open':''}" style="width:220px;">
          ${state.user ? `
            <div class="dropdown-head">${state.user.name}</div>
            <a class="user-menu-item" href="#profile"><i data-lucide="settings" size="15"></i> Profile & settings</a>
            <a class="user-menu-item" href="#my-clubs"><i data-lucide="users" size="15"></i> My clubs</a>
            <div class="user-menu-item" onclick="logout()" style="cursor:pointer; color:var(--red);"><i data-lucide="log-out" size="15"></i> Sign out</div>
          ` : `
            <a class="user-menu-item" href="#login"><i data-lucide="log-in" size="15"></i> Log in</a>
            <a class="user-menu-item" href="#register"><i data-lucide="user-plus" size="15"></i> Create account</a>
          `}
        </div>
      </div>
    </div>
  </div>`;
}
function renderTopbarOnly(){
  document.querySelector('.topbar').outerHTML = topbarHtml();
  lucide.createIcons();
}
function logout(){ state.user=null; toast('Signed out'); navigate('dashboard'); }

/* =====================================================
   SHARED: CLUB CARD
===================================================== */
function starIcons(rating){
  let out='';
  for(let i=0;i<5;i++){ out += `<i data-lucide="star" size="12" ${i < Math.round(rating) ? 'fill="#F5B942"' : ''}></i>`; }
  return out;
}
function clubCard(c){
  const joined = state.joined.has(c.id);
  return `
  <div class="club-card">
    <a href="#club/${c.id}" class="thumb img-skel">
      <span class="tag">${CATEGORIES.find(x=>x.id===c.cat).name}</span>
      ${c.rating>=4.8 ? `<div class="verified-chip"><i data-lucide="badge-check" size="12" color="#3FE0E8"></i> Top rated</div>` : `<div class="verified-chip"><i data-lucide="star" size="11" fill="#F5B942" color="#F5B942"></i> ${c.rating}</div>`}
      <img loading="lazy" src="${img(c.img)}" alt="${c.name}" onload="this.classList.add('loaded'); this.parentElement.classList.add('loaded');"/>
    </a>
    <div class="body">
      <a href="#club/${c.id}"><h4>${c.name}</h4></a>
      <p>${c.desc}</p>
      <div class="meta-row">
        <div class="meta-item"><i data-lucide="users" size="12"></i> ${c.members.toLocaleString()}</div>
        <div class="meta-item"><i data-lucide="map-pin" size="12"></i> ${c.location}</div>
      </div>
      <div class="activity-pill"><span>Activity</span><span class="track"><span class="fill" style="width:${c.activity}%;"></span></span></div>
      <div class="card-actions">
        <a href="#club/${c.id}" class="btn btn-ghost btn-sm" style="flex:1;">Details</a>
        <button onclick="toggleJoin('${c.id}', event)" class="btn ${joined?'btn-ghost':'btn-primary'} btn-sm" style="flex:1;">
          ${joined ? '<i data-lucide=\'check\' size=\'14\'></i> Joined' : 'Join'}
        </button>
      </div>
    </div>
  </div>`;
}
function toggleJoin(id, e){
  if(e) e.preventDefault();
  if(!state.user){ toast('Log in to join a club', 'lock'); navigate('login'); return; }
  const c = CLUBS.find(x=>x.id===id);
  if(state.joined.has(id)){ state.joined.delete(id); c.members--; logActivity('log-out', `You left <strong>${c.name}</strong>`); toast(`Left ${c.name}`, 'log-out'); }
  else { state.joined.add(id); c.members++; logActivity('check-circle', `You joined <strong>${c.name}</strong>`); toast(`Joined ${c.name}!`, 'check-circle'); }
  render();
}

/* =====================================================
   DASHBOARD VIEW
===================================================== */
function categoryBars(){
  const max = Math.max(...CATEGORIES.map(c=>CLUBS.filter(x=>x.cat===c.id).length));
  return CATEGORIES.map(c=>{
    const n = CLUBS.filter(x=>x.cat===c.id).length;
    return `<div class="bar-row">
      <div class="bar-label"><i data-lucide="${c.icon}" size="13"></i> ${c.name}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${(n/max)*100}%;"></div></div>
      <div class="bar-count">${n}</div>
    </div>`;
  }).join('');
}
function sparkline(points, color){
  const w=220,h=54,max=Math.max(...points),min=Math.min(...points);
  const step = w/(points.length-1);
  const pts = points.map((p,i)=>`${i*step},${h-((p-min)/(max-min||1))*h}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%; height:54px; display:block;"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function dashboardView(){
  const joinedCount = state.joined.size;
  const myEvents = allEvents().filter(e=>state.joined.has(e.clubId));
  const unreadMsgs = Object.values(state.threads).reduce((a,t)=>a+t.filter(m=>m.from==='them').length,0);
  const recs = state.user && state.user.interests && state.user.interests.length
    ? CLUBS.filter(c=>!state.joined.has(c.id) && state.user.interests.includes(c.cat)).sort((a,b)=>b.rating-a.rating)
    : CLUBS.filter(c=>!state.joined.has(c.id)).sort((a,b)=>b.rating-a.rating);

  return `
  <div class="page">
    <div class="page-head">
      <div>
        <span class="eyebrow"><span class="node-dot"></span> ${state.user ? `WELCOME BACK, ${state.user.name.split(' ')[0].toUpperCase()}` : 'DASHBOARD'}</span>
        <h1 class="page-title">Your club network at a glance</h1>
        <p class="page-sub">${state.user ? 'Here\'s what\'s moving across your clubs this week.' : 'Log in to track your clubs, RSVPs, and messages here.'}</p>
      </div>
      <a href="#discover" class="btn btn-primary">Discover clubs <i data-lucide="arrow-right" size="15"></i></a>
    </div>

    ${!state.user ? `
      <div class="panel" style="text-align:center; padding:40px 20px;">
        <i data-lucide="user-circle" size="34" color="var(--slate-dim)"></i>
        <h3 style="font-size:17px; margin:14px 0 8px;">You're browsing as a guest</h3>
        <p class="text-slate" style="font-size:13.5px; margin-bottom:18px;">Log in to join clubs, RSVP to events, and get a feed tailored to you.</p>
        <div class="flex gap-2" style="justify-content:center;"><a href="#login" class="btn btn-ghost">Log in</a><a href="#register" class="btn btn-primary">Create account</a></div>
      </div>
    ` : ''}

    <div class="stat-grid stagger">
      <div class="stat-card">
        <div class="top-row"><div class="stat-ic" style="background:rgba(47,111,255,.12); color:var(--blue);"><i data-lucide="users" size="18"></i></div><span class="trend up"><i data-lucide="trending-up" size="11"></i> live</span></div>
        <div class="stat-val">${joinedCount}</div><div class="stat-label">Clubs joined</div>
      </div>
      <div class="stat-card">
        <div class="top-row"><div class="stat-ic" style="background:rgba(63,224,232,.12); color:var(--cyan);"><i data-lucide="compass" size="18"></i></div><span class="trend flat">catalog</span></div>
        <div class="stat-val">${CLUBS.length}</div><div class="stat-label">Clubs to discover</div>
      </div>
      <div class="stat-card">
        <div class="top-row"><div class="stat-ic" style="background:rgba(62,213,152,.12); color:var(--green);"><i data-lucide="calendar-days" size="18"></i></div><span class="trend flat">upcoming</span></div>
        <div class="stat-val">${myEvents.length}</div><div class="stat-label">Events from your clubs</div>
      </div>
      <div class="stat-card">
        <div class="top-row"><div class="stat-ic" style="background:rgba(245,185,66,.12); color:var(--amber);"><i data-lucide="message-circle" size="18"></i></div>${unreadMsgs?`<span class="trend up">${unreadMsgs} new</span>`:''}</div>
        <div class="stat-val">${unreadMsgs}</div><div class="stat-label">Unread messages</div>
      </div>
    </div>

    <div class="dash-grid">
      <div>
        <div class="panel">
          <div class="panel-head"><h3>Clubs by category</h3><span class="font-mono text-slate" style="font-size:11px;">${CLUBS.length} total</span></div>
          ${categoryBars()}
        </div>
        <div class="panel">
          <div class="panel-head"><h3>Trending this week</h3><a href="#discover" class="font-mono" style="font-size:11.5px; color:var(--cyan);">View all →</a></div>
          <div class="grid-cards stagger">${CLUBS.slice().sort((a,b)=>b.popularity-a.popularity).slice(0,3).map(clubCard).join('')}</div>
        </div>
      </div>
      <div>
        <div class="panel">
          <div class="panel-head"><h3>Recent activity</h3></div>
          <div class="activity-list">
            ${state.activityLog.length ? state.activityLog.map(a=>`
              <div class="activity-item">
                <div class="rail"><div class="dot"></div><div class="stem"></div></div>
                <div><p class="activity-text">${a.text}</p><p class="activity-time">${a.time}</p></div>
              </div>`).join('') : `<div class="empty-inline"><i data-lucide="activity" size="22" style="margin-bottom:8px;"></i><p>No activity yet — join a club or RSVP to an event to get started.</p></div>`}
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><h3>${state.user && state.user.interests && state.user.interests.length ? 'Matched to your interests' : 'Recommended clubs'}</h3></div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${recs.slice(0,3).map(c=>`
              <a href="#club/${c.id}" class="thread-item" style="border:1px solid var(--line); border-radius:12px; border-bottom:1px solid var(--line);">
                <div class="thread-avatar"><img src="${img(c.img)}"/></div>
                <div style="flex:1;"><p style="font-size:13px; font-weight:600;">${c.name}</p><p class="font-mono text-slate" style="font-size:10.5px;">★ ${c.rating} · ${c.members.toLocaleString()} members</p></div>
              </a>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* =====================================================
   DISCOVER VIEW
===================================================== */
function filterPanel(){
  return `
  <div class="filter-panel">
    <div class="flex items-center" style="justify-content:space-between; margin-bottom:4px;">
      <h4 style="font-size:14.5px;">Filters</h4>
      <button class="font-mono" style="font-size:11px; color:var(--cyan); background:none; border:none;" onclick="clearFilters()">Reset</button>
    </div>
    <div class="filter-group">
      <div class="filter-title">Category</div>
      ${CATEGORIES.map(c=>`
        <label class="check-row">
          <input type="checkbox" ${state.filters.cat.has(c.id)?'checked':''} onchange="toggleFilterCat('${c.id}')"/>
          <span class="check-box">${state.filters.cat.has(c.id)?'<i data-lucide=\'check\' size=\'11\' color=\'#05070D\'></i>':''}</span>
          ${c.name}
        </label>`).join('')}
    </div>
    <div class="filter-group">
      <div class="filter-title">Location</div>
      <select onchange="state.filters.loc=this.value; renderDiscoverResults();">
        <option value="">All locations</option>
        ${LOCATIONS.map(l=>`<option value="${l}" ${state.filters.loc===l?'selected':''}>${l}</option>`).join('')}
      </select>
    </div>
    <div class="filter-group">
      <div class="filter-title">Popularity</div>
      <select onchange="state.filters.sort=this.value; renderDiscoverResults();">
        <option value="popular" ${state.filters.sort==='popular'?'selected':''}>Most popular</option>
        <option value="rating" ${state.filters.sort==='rating'?'selected':''}>Highest rated</option>
        <option value="members" ${state.filters.sort==='members'?'selected':''}>Most members</option>
        <option value="new" ${state.filters.sort==='new'?'selected':''}>Newest</option>
      </select>
    </div>
    <div class="filter-group">
      <div class="filter-title">Activities</div>
      ${ACTIVITIES.map(a=>`<span class="activity-tag ${state.filters.act.has(a)?'active':''}" onclick="toggleFilterAct('${a}')">${a}</span>`).join('')}
    </div>
  </div>`;
}
function toggleFilterCat(id){ state.filters.cat.has(id) ? state.filters.cat.delete(id) : state.filters.cat.add(id); renderDiscoverResults(); }
function toggleFilterAct(a){ state.filters.act.has(a) ? state.filters.act.delete(a) : state.filters.act.add(a); renderDiscoverResults(); }
function clearFilters(){ state.filters = {cat:new Set(), loc:'', sort:'popular', act:new Set()}; state.search=''; render(); }
function applyFilters(){
  let list = CLUBS.filter(c=>{
    if(state.search){
      const q = state.search.toLowerCase().trim();
      const catName = (CATEGORIES.find(x=>x.id===c.cat)||{}).name || '';
      const haystack = [c.name, c.desc, c.location, catName, ...c.activities].join(' ').toLowerCase();
      if(!haystack.includes(q)) return false;
    }
    if(state.filters.cat.size && !state.filters.cat.has(c.cat)) return false;
    if(state.filters.loc && c.location !== state.filters.loc) return false;
    if(state.filters.act.size && ![...state.filters.act].every(a=>c.activities.includes(a))) return false;
    return true;
  });
  switch(state.filters.sort){
    case 'rating': list.sort((a,b)=>b.rating-a.rating); break;
    case 'members': list.sort((a,b)=>b.members-a.members); break;
    case 'new': list.sort((a,b)=>b.founded-a.founded); break;
    default: list.sort((a,b)=>b.popularity-a.popularity);
  }
  return list;
}
function discoverView(){
  const results = applyFilters();
  return `
  <div class="page">
    <div class="page-head">
      <div><span class="eyebrow"><span class="node-dot"></span> DISCOVER</span><h1 class="page-title">Search clubs</h1></div>
      <a href="#create-club" class="btn btn-ghost"><i data-lucide="plus" size="15"></i> List a club</a>
    </div>
    <div class="topbar-search" style="max-width:100%; margin-bottom:26px; height:46px;">
      <i data-lucide="search" size="17" color="#5C6884"></i>
      <input id="mainSearch" value="${state.search}" placeholder="Search by name, activity, or vibe…" oninput="state.search=this.value; renderDiscoverResults();"/>
    </div>
    <div class="discover-layout">
      ${filterPanel()}
      <div>
        <div class="results-top"><span class="result-count" id="resultCount">${results.length} club${results.length===1?'':'s'} found</span></div>
        <div id="resultsGrid" class="grid-cards stagger">${results.length ? results.map(clubCard).join('') : emptyResultsHtml()}</div>
      </div>
    </div>
  </div>`;
}
function emptyResultsHtml(){
  return `<div class="empty-state" style="grid-column:1/-1;">
    <i data-lucide="search-x" size="28" style="margin-bottom:10px; color:var(--slate-dim);"></i>
    <p>No clubs match those filters yet.</p>
    <button class="btn btn-ghost btn-sm" style="margin-top:14px;" onclick="clearFilters()">Clear filters</button>
  </div>`;
}
function renderDiscoverResults(){
  const results = applyFilters();
  document.getElementById('resultCount').textContent = `${results.length} club${results.length===1?'':'s'} found`;
  document.getElementById('resultsGrid').innerHTML = results.length ? results.map(clubCard).join('') : emptyResultsHtml();
  lucide.createIcons();
}

/* =====================================================
   CLUB DETAIL VIEW
===================================================== */
let activeTab = 'about';
let draftRating = 5;
function clubView(id){
  const c = CLUBS.find(x=>x.id===id) || CLUBS[0];
  const joined = state.joined.has(c.id);
  const related = CLUBS.filter(x=>x.cat===c.cat && x.id!==c.id).slice(0,3);
  return `
  <div class="page" style="padding-top:22px;">
    <a href="#discover" class="node-rule" style="width:fit-content; margin-bottom:18px; font-size:13px;"><i data-lucide="arrow-left" size="14"></i> Back to search</a>
    <div class="detail-banner"><img src="${img(c.img,1200,500)}" alt=""/></div>
    <div class="detail-head-card">
      <div class="flex items-center gap-3">
        <div class="club-avatar"><img src="${img(c.img+'-avatar',200,200)}" alt=""/></div>
        <div>
          <span class="tag">${CATEGORIES.find(x=>x.id===c.cat).name}</span>
          <h1 style="font-size:23px; margin-top:8px;">${c.name}</h1>
          <div class="flex items-center gap-3" style="margin-top:6px; flex-wrap:wrap;">
            <div class="stars">${starIcons(c.rating)} <span class="font-mono text-slate" style="font-size:12.5px; margin-left:4px;">${c.rating} (${c.reviews.length})</span></div>
            <span class="meta-item"><i data-lucide="users" size="12"></i> ${c.members.toLocaleString()} members</span>
            <span class="meta-item"><i data-lucide="map-pin" size="12"></i> ${c.location}</span>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-ghost" onclick="toast('Link copied to clipboard','link')"><i data-lucide="share-2" size="15"></i> Share</button>
        <button onclick="toggleJoin('${c.id}')" class="btn ${joined?'btn-ghost':'btn-primary'}">
          ${joined ? '<i data-lucide=\'check\' size=\'15\'></i> Joined' : 'Join club'}
        </button>
      </div>
    </div>

    <div class="tab-bar">
      ${['about','events','reviews','contact'].map(t=>`<button class="tab-btn ${activeTab===t?'active':''}" onclick="activeTab='${t}'; render();">${t[0].toUpperCase()+t.slice(1)}${t==='reviews'?` (${c.reviews.length})`:''}</button>`).join('')}
    </div>

    <div class="detail-grid">
      <div>
        ${activeTab==='about' ? `
          <div class="info-card" style="margin-bottom:18px;">
            <h4 style="font-size:15.5px; margin-bottom:12px;">About ${c.name}</h4>
            <p class="text-slate" style="line-height:1.75; font-size:14px;">${c.desc} Founded in ${c.founded}, the club has grown into one of campus's most active communities — open to all skill levels, no experience required to show up to your first meeting.</p>
            <div class="flex gap-2" style="margin-top:16px; flex-wrap:wrap;">${c.activities.map(a=>`<span class="activity-tag">${a}</span>`).join('')}</div>
          </div>` : ''}

        ${activeTab==='events' ? `
          <div class="info-card">
            <h4 style="font-size:15.5px; margin-bottom:4px;">Upcoming events</h4>
            ${eventsFor(c).map(ev=>`
              <div class="event-row">
                <div class="event-date"><span class="mo">${ev.mo}</span><span class="day">${ev.day}</span></div>
                <div style="flex:1;"><h5 style="font-size:14px; margin-bottom:3px;">${ev.title}</h5><p class="text-slate" style="font-size:12.5px;">${ev.time}</p></div>
                <button class="btn ${state.rsvp.has(ev.key)?'btn-ghost':'btn-primary'} btn-sm" onclick="toggleRsvp('${ev.key}','${ev.title.replace(/'/g,"")}')">${state.rsvp.has(ev.key)?'Going ✓':'RSVP'}</button>
              </div>`).join('')}
          </div>` : ''}

        ${activeTab==='reviews' ? `
          <div class="info-card" style="margin-bottom:18px;">
            <h4 style="font-size:15.5px; margin-bottom:14px;">Leave a review</h4>
            <form onsubmit="return submitReview(event, '${c.id}')">
              ${!state.user ? `<div class="field"><label>Your name</label><input id="rv_name" placeholder="Jordan Kim" required/></div>` : ''}
              <div class="field">
                <label>Your rating</label>
                <div class="star-pick" id="starPick">
                  ${[1,2,3,4,5].map(n=>`<button type="button" data-n="${n}" class="${n<=draftRating?'on':''}" onclick="setDraftRating(${n})"><i data-lucide="star" size="20" ${n<=draftRating?'fill=\'#F5B942\'':''}></i></button>`).join('')}
                </div>
              </div>
              <div class="field"><label>Review</label><textarea id="rv_text" placeholder="What's it actually like showing up?" required></textarea></div>
              <button class="btn btn-primary" type="submit">Post review</button>
            </form>
          </div>
          <div class="info-card">
            <h4 style="font-size:15.5px; margin-bottom:6px;">${c.reviews.length} review${c.reviews.length===1?'':'s'}</h4>
            ${c.reviews.length ? c.reviews.map(r=>`
              <div class="review-card">
                <div class="review-head">
                  <div class="flex items-center gap-2"><div class="officer-avatar" style="width:30px;height:30px;font-size:11px;">${initials(r.name)}</div><span style="font-size:13.5px; font-weight:600;">${r.name}</span></div>
                  <div class="stars">${starIcons(r.rating)}</div>
                </div>
                <p class="text-slate" style="font-size:13px; line-height:1.6;">${r.text}</p>
                <p class="font-mono text-slate" style="font-size:10.5px; margin-top:5px;">${r.time}</p>
              </div>`).join('') : `<div class="empty-inline"><i data-lucide="message-square" size="20" style="margin-bottom:6px;"></i><p>No reviews yet — be the first to share how it went.</p></div>`}
          </div>` : ''}

        ${activeTab==='contact' ? `
          <div class="info-card">
            <h4 style="font-size:15.5px; margin-bottom:16px;">Officers</h4>
            ${['Alex Rivera — President','Jordan Kim — VP of Events','Sam Osei — Treasurer'].map(o=>`
              <div class="officer-row">
                <div class="officer-avatar">${initials(o.split(' — ')[0])}</div>
                <div><p style="font-size:13.5px;">${o.split(' — ')[0]}</p><p class="text-slate font-mono" style="font-size:11px;">${o.split(' — ')[1]}</p></div>
              </div>`).join('')}
            <div class="node-rule" style="margin:14px 0;"><span class="line"></span></div>
            <form onsubmit="return submitContact(event, '${c.id}')">
              <div class="field"><label>Message</label><textarea id="ct_msg" placeholder="Ask about tryouts, meeting locations, anything…" required></textarea></div>
              <button class="btn btn-primary btn-block" type="submit"><i data-lucide="send" size="15"></i> Send message</button>
            </form>
          </div>` : ''}
      </div>
      <div>
        <div class="info-card" style="margin-bottom:18px;">
          <h4 style="font-size:14.5px; margin-bottom:12px;">Weekly schedule</h4>
          <div class="schedule-row"><span class="text-slate">Regular meeting</span><span class="font-mono">${c.meets}</span></div>
          <div class="schedule-row"><span class="text-slate">Location</span><span class="font-mono">${c.location}</span></div>
          <div class="schedule-row"><span class="text-slate">Est.</span><span class="font-mono">${c.founded}</span></div>
          <div class="schedule-row"><span class="text-slate">Members</span><span class="font-mono">${c.members.toLocaleString()}</span></div>
        </div>
        <div class="info-card">
          <h4 style="font-size:14.5px; margin-bottom:12px;">Related clubs</h4>
          ${related.map(r=>`
            <a href="#club/${r.id}" class="thread-item" style="border:1px solid var(--line); border-radius:12px; margin-bottom:9px;">
              <div class="thread-avatar"><img src="${img(r.img)}"/></div>
              <div><p style="font-size:13px;">${r.name}</p><span class="text-slate font-mono" style="font-size:11px;">${r.members.toLocaleString()} members</span></div>
            </a>`).join('') || `<p class="text-slate" style="font-size:13px;">No related clubs yet.</p>`}
        </div>
      </div>
    </div>
  </div>`;
}
function setDraftRating(n){ draftRating = n; render(); }
function submitReview(e, clubId){
  e.preventDefault();
  const c = CLUBS.find(x=>x.id===clubId);
  const name = state.user ? state.user.name : document.getElementById('rv_name').value;
  const text = document.getElementById('rv_text').value;
  c.reviews.unshift({name, rating:draftRating, text, time:'Just now'});
  c.rating = Math.round((c.reviews.reduce((a,r)=>a+r.rating,0)/c.reviews.length)*10)/10;
  logActivity('star', `You reviewed <strong>${c.name}</strong> (${draftRating}★)`);
  toast('Review posted — thanks!');
  draftRating = 5;
  render();
  return false;
}
function submitContact(e, clubId){
  e.preventDefault();
  const c = CLUBS.find(x=>x.id===clubId);
  const msg = document.getElementById('ct_msg').value;
  if(!state.threads[clubId]) state.threads[clubId]=[];
  state.threads[clubId].push({from:'me', text:msg, time:'Just now'});
  logActivity('send', `You messaged <strong>${c.name}</strong>`);
  toast('Message sent');
  setTimeout(()=>{
    state.threads[clubId].push({from:'them', text:'Thanks for reaching out — an officer will get back to you shortly!', time:'Just now'});
    if(state.view==='messages') render();
  }, 1400);
  render();
  return false;
}
function toggleRsvp(key, title){
  if(!state.user){ toast('Log in to RSVP', 'lock'); navigate('login'); return; }
  if(state.rsvp.has(key)){ state.rsvp.delete(key); logActivity('calendar-x', `You canceled your RSVP for <strong>${title}</strong>`); toast('RSVP canceled'); }
  else { state.rsvp.add(key); logActivity('calendar-check', `You RSVP'd to <strong>${title}</strong>`); toast('You\'re going!'); }
  render();
}

/* =====================================================
   MY CLUBS VIEW
===================================================== */
function myClubsView(){
  if(!state.user) return authPrompt('See the clubs you\'ve joined', 'Log in to track membership, events, and activity across your clubs.');
  const joinedClubs = CLUBS.filter(c=>state.joined.has(c.id));
  return `
  <div class="page">
    <div class="page-head">
      <div><span class="eyebrow"><span class="node-dot"></span> MY CLUBS</span><h1 class="page-title">Clubs you're part of</h1></div>
      <a href="#discover" class="btn btn-ghost"><i data-lucide="plus" size="15"></i> Join more</a>
    </div>
    ${joinedClubs.length ? `<div class="grid-cards stagger">${joinedClubs.map(clubCard).join('')}</div>` : `
      <div class="empty-state"><i data-lucide="compass" size="26" style="margin-bottom:10px;"></i><p>You haven't joined any clubs yet.</p><a href="#discover" class="btn btn-primary btn-sm" style="margin-top:14px;">Discover clubs</a></div>`}
  </div>`;
}

/* =====================================================
   EVENTS VIEW
===================================================== */
function eventsView(){
  let list = allEvents();
  if(state.eventsOnlyMine) list = list.filter(e=>state.joined.has(e.clubId));
  return `
  <div class="page">
    <div class="page-head">
      <div><span class="eyebrow"><span class="node-dot"></span> EVENTS</span><h1 class="page-title">Upcoming across Nexus</h1></div>
      <label class="check-row" style="border:1px solid var(--line); border-radius:10px; padding:8px 14px;">
        <input type="checkbox" ${state.eventsOnlyMine?'checked':''} onchange="state.eventsOnlyMine=this.checked; render();"/>
        <span class="check-box">${state.eventsOnlyMine?'<i data-lucide=\'check\' size=\'11\' color=\'#05070D\'></i>':''}</span>
        My clubs only
      </label>
    </div>
    <div class="info-card">
      ${list.length ? list.map(ev=>`
        <div class="event-row">
          <div class="event-date"><span class="mo">${ev.mo}</span><span class="day">${ev.day}</span></div>
          <div style="flex:1;">
            <h5 style="font-size:14.5px; margin-bottom:3px;">${ev.title}</h5>
            <p class="text-slate" style="font-size:12.5px;">${ev.time}</p>
            <a href="#club/${ev.clubId}" class="font-mono" style="font-size:11px; color:var(--cyan);">${ev.club} →</a>
          </div>
          <button class="btn ${state.rsvp.has(ev.key)?'btn-ghost':'btn-primary'} btn-sm" onclick="toggleRsvp('${ev.key}','${ev.title.replace(/'/g,"")}')">${state.rsvp.has(ev.key)?'Going ✓':'RSVP'}</button>
        </div>`).join('') : `<div class="empty-inline"><i data-lucide="calendar-x" size="22" style="margin-bottom:8px;"></i><p>No events to show — join a club to see its events here.</p></div>`}
    </div>
  </div>`;
}

/* =====================================================
   FEEDBACK / ROADMAP VIEW — the "self-improving" loop
===================================================== */
const TYPE_META = {
  bug:{label:'Bug', icon:'bug'},
  idea:{label:'Idea', icon:'lightbulb'},
  praise:{label:'Praise', icon:'heart'},
};
const STATUS_META = {
  open:{label:'Open', icon:'circle'},
  planned:{label:'Planned', icon:'calendar-clock'},
  building:{label:'Building', icon:'hammer'},
  shipped:{label:'Shipped', icon:'rocket'},
};
function feedbackStats(){
  const open = FEEDBACK.filter(f=>f.status==='open').length;
  const planned = FEEDBACK.filter(f=>f.status==='planned').length;
  const building = FEEDBACK.filter(f=>f.status==='building').length;
  const shipped = FEEDBACK.filter(f=>f.status==='shipped').length;
  const totalVotes = FEEDBACK.reduce((a,f)=>a+f.votes,0);
  return {open, planned, building, shipped, totalVotes};
}
function promoteProgress(f){
  if(f.status==='open') return {next:'planned', pct:Math.min(100, f.votes/FEEDBACK_PROMOTE.planned*100), need:FEEDBACK_PROMOTE.planned};
  if(f.status==='planned') return {next:'building', pct:Math.min(100, f.votes/FEEDBACK_PROMOTE.building*100), need:FEEDBACK_PROMOTE.building};
  return null;
}
function feedbackView(){
  const s = feedbackStats();
  return `
  <div class="page">
    <div class="page-head">
      <div><span class="eyebrow"><span class="node-dot"></span> FEEDBACK</span><h1 class="page-title">Help shape Nexus</h1>
        <p class="text-slate" style="font-size:13.5px; margin-top:6px; max-width:560px;">Every fix on this site started as a note here. Vote up what matters to you — ideas that gain traction move themselves toward "Building," and get shipped for real.</p>
      </div>
    </div>

    <div class="info-card" style="margin-bottom:20px;">
      <div class="flex items-center gap-3" style="flex-wrap:wrap; justify-content:space-between;">
        <div><div class="stat-val" style="font-size:20px;">${s.open}</div><div class="stat-label">Open</div></div>
        <div><div class="stat-val" style="font-size:20px;">${s.planned}</div><div class="stat-label">Planned</div></div>
        <div><div class="stat-val" style="font-size:20px;">${s.building}</div><div class="stat-label">Building</div></div>
        <div><div class="stat-val" style="font-size:20px;">${s.shipped}</div><div class="stat-label">Shipped</div></div>
        <div><div class="stat-val" style="font-size:20px;">${s.totalVotes}</div><div class="stat-label">Votes cast</div></div>
      </div>
    </div>

    <div class="tab-bar">
      <button class="tab-btn ${state.feedbackTab==='board'?'active':''}" onclick="state.feedbackTab='board'; render();">Board</button>
      <button class="tab-btn ${state.feedbackTab==='changelog'?'active':''}" onclick="state.feedbackTab='changelog'; render();">Changelog (${s.shipped})</button>
      <button class="tab-btn ${state.feedbackTab==='submit'?'active':''}" onclick="state.feedbackTab='submit'; render();">Submit feedback</button>
    </div>

    ${state.feedbackTab==='board' ? feedbackBoard() : ''}
    ${state.feedbackTab==='changelog' ? feedbackChangelog() : ''}
    ${state.feedbackTab==='submit' ? feedbackSubmitForm() : ''}
  </div>`;
}
function feedbackBoard(){
  const types = [{id:'all', label:'All'}, {id:'bug', label:'Bug'}, {id:'idea', label:'Idea'}, {id:'praise', label:'Praise'}];
  let list = FEEDBACK.filter(f=>f.status!=='shipped');
  if(state.feedbackTypeFilter!=='all') list = list.filter(f=>f.type===state.feedbackTypeFilter);
  list = [...list].sort((a,b)=>b.votes-a.votes);
  return `
    <div class="type-filter-row">
      ${types.map(t=>`<span class="activity-tag ${state.feedbackTypeFilter===t.id?'active':''}" onclick="state.feedbackTypeFilter='${t.id}'; render();">${t.label}</span>`).join('')}
    </div>
    ${list.length ? list.map(feedbackCard).join('') : `<div class="empty-inline"><i data-lucide="inbox" size="22" style="margin-bottom:8px;"></i><p>Nothing here yet — be the first to suggest something.</p></div>`}
  `;
}
function feedbackCard(f){
  const voted = state.feedbackVotes.has(f.id);
  const tm = TYPE_META[f.type];
  const sm = STATUS_META[f.status];
  const prog = promoteProgress(f);
  return `
    <div class="feedback-card">
      <button class="vote-btn ${voted?'voted':''}" onclick="voteFeedback('${f.id}')" title="${voted?'Remove your vote':'Upvote this'}">
        <i data-lucide="chevron-up" size="16"></i>
        <span class="n">${f.votes}</span>
        <span class="lbl">votes</span>
      </button>
      <div style="flex:1; min-width:0;">
        <div class="flex items-center gap-2" style="flex-wrap:wrap; margin-bottom:6px;">
          <span class="type-pill ${f.type}"><i data-lucide="${tm.icon}" size="11"></i> ${tm.label}</span>
          <span class="status-pill ${f.status}"><i data-lucide="${sm.icon}" size="10"></i> ${sm.label}</span>
        </div>
        <h5 style="font-size:14.5px; margin-bottom:4px;">${f.title}</h5>
        <p class="text-slate" style="font-size:13px; line-height:1.6;">${f.text}</p>
        <p class="font-mono text-slate" style="font-size:10.5px; margin-top:8px;">${f.author} · ${f.time}</p>
        ${prog ? `
          <div class="promote-track"><div class="promote-fill" style="width:${prog.pct}%;"></div></div>
          <p class="promote-hint">${f.votes}/${prog.need} votes to reach "${STATUS_META[prog.next].label}"</p>
        ` : ''}
      </div>
    </div>`;
}
function feedbackChangelog(){
  const shipped = [...FEEDBACK].filter(f=>f.status==='shipped');
  return `
    <div class="info-card">
      ${shipped.length ? shipped.map(f=>`
        <div class="changelog-item">
          <span class="changelog-dot"></span>
          <div style="flex:1;">
            <div class="flex items-center gap-2" style="flex-wrap:wrap; margin-bottom:4px;">
              <span class="type-pill ${f.type}"><i data-lucide="${TYPE_META[f.type].icon}" size="11"></i> ${TYPE_META[f.type].label}</span>
              <h5 style="font-size:14px;">${f.title}</h5>
            </div>
            <p class="text-slate" style="font-size:13px; line-height:1.6;">${f.shippedNote || f.text}</p>
            <p class="font-mono text-slate" style="font-size:10.5px; margin-top:6px;">Requested by ${f.author} · ${f.votes} votes</p>
          </div>
        </div>`).join('') : `<div class="empty-inline"><i data-lucide="rocket" size="22" style="margin-bottom:8px;"></i><p>Nothing shipped yet — vote on the board to help something get here.</p></div>`}
    </div>`;
}
function feedbackSubmitForm(){
  return `
    <div class="info-card" style="max-width:600px;">
      <h4 style="font-size:15.5px; margin-bottom:14px;">Submit feedback</h4>
      <form onsubmit="return submitFeedback(event)">
        <div class="field">
          <label>Type</label>
          <select id="fb_type">
            <option value="idea">Idea — something new</option>
            <option value="bug">Bug — something's broken</option>
            <option value="praise">Praise — something's working well</option>
          </select>
        </div>
        ${!state.user ? `<div class="field"><label>Your name</label><input id="fb_name" placeholder="Jordan Kim"/></div>` : ''}
        <div class="field"><label>Title</label><input id="fb_title" placeholder="Short summary" required/></div>
        <div class="field"><label>Details</label><textarea id="fb_text" placeholder="What happened, or what would help?" required></textarea></div>
        <button class="btn btn-primary" type="submit"><i data-lucide="send" size="15"></i> Submit</button>
      </form>
    </div>`;
}
function submitFeedback(e){
  e.preventDefault();
  const type = document.getElementById('fb_type').value;
  const title = document.getElementById('fb_title').value;
  const text = document.getElementById('fb_text').value;
  const nameEl = document.getElementById('fb_name');
  const author = state.user ? state.user.name : (nameEl && nameEl.value ? nameEl.value : 'Anonymous');
  const id = 'f'+(FEEDBACK.length+1)+'_'+Date.now();
  FEEDBACK.unshift({id, type, title, text, author, time:'Just now', votes:1, status:'open'});
  state.feedbackVotes.add(id);
  logActivity('lightbulb', `You submitted feedback: <strong>${title}</strong>`);
  toast('Thanks — feedback submitted!');
  state.feedbackTab = 'board';
  state.feedbackTypeFilter = 'all';
  render();
  return false;
}
function voteFeedback(id){
  const f = FEEDBACK.find(x=>x.id===id);
  if(!f) return;
  if(state.feedbackVotes.has(id)){
    state.feedbackVotes.delete(id);
    f.votes = Math.max(0, f.votes-1);
  } else {
    state.feedbackVotes.add(id);
    f.votes += 1;
    checkPromote(f);
  }
  render();
}
function checkPromote(f){
  if(f.status==='open' && f.votes>=FEEDBACK_PROMOTE.planned){
    f.status='planned';
    toast(`"${f.title}" reached ${FEEDBACK_PROMOTE.planned} votes — moved to Planned`, 'calendar-clock');
  } else if(f.status==='planned' && f.votes>=FEEDBACK_PROMOTE.building){
    f.status='building';
    toast(`"${f.title}" reached ${FEEDBACK_PROMOTE.building} votes — moved to Building`, 'hammer');
  }
}

/* =====================================================
   MESSAGES VIEW
===================================================== */
function messagesView(){
  if(!state.user) return authPrompt('Message clubs directly', 'Log in to contact officers and keep track of replies.');
  const clubIds = Object.keys(state.threads);
  const active = state.activeThread && state.threads[state.activeThread] ? state.activeThread : clubIds[0];
  const activeClub = CLUBS.find(c=>c.id===active);
  return `
  <div class="page">
    <div class="page-head"><div><span class="eyebrow"><span class="node-dot"></span> MESSAGES</span><h1 class="page-title">Conversations</h1></div></div>
    <div class="msg-layout">
      <div class="thread-list">
        ${clubIds.map(cid=>{
          const c = CLUBS.find(x=>x.id===cid); const t = state.threads[cid]; const last = t[t.length-1];
          return `<div class="thread-item ${active===cid?'active':''}" onclick="state.activeThread='${cid}'; render();">
            <div class="thread-avatar"><img src="${img(c.img)}"/></div>
            <div style="flex:1; min-width:0;">
              <p style="font-size:13.5px; font-weight:600;">${c.name}</p>
              <p class="text-slate" style="font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${last.text}</p>
            </div>
          </div>`;
        }).join('') || `<div class="empty-inline">No conversations yet.</div>`}
      </div>
      <div class="thread-chat">
        ${activeClub ? `
          <div class="chat-head"><div class="thread-avatar"><img src="${img(activeClub.img)}"/></div><div><p style="font-size:14px; font-weight:600;">${activeClub.name}</p><p class="font-mono text-slate" style="font-size:10.5px;">Officer inbox</p></div></div>
          <div class="chat-body" id="chatBody">
            ${state.threads[active].map(m=>`<div class="bubble ${m.from==='me'?'me':'them'}">${m.text}<div class="bubble-time">${m.time}</div></div>`).join('')}
          </div>
          <form class="chat-input" onsubmit="return sendChat(event,'${active}')">
            <input id="chatInput" placeholder="Type a message…" required/>
            <button class="btn btn-primary btn-sm" type="submit"><i data-lucide="send" size="14"></i></button>
          </form>
        ` : `<div class="empty-inline" style="margin:auto;">Select a conversation</div>`}
      </div>
    </div>
  </div>`;
}
function sendChat(e, clubId){
  e.preventDefault();
  const val = document.getElementById('chatInput').value;
  state.threads[clubId].push({from:'me', text:val, time:'Just now'});
  const c = CLUBS.find(x=>x.id===clubId);
  logActivity('send', `You messaged <strong>${c.name}</strong>`);
  render();
  setTimeout(()=>{
    state.threads[clubId].push({from:'them', text:'Got it — thanks for the message!', time:'Just now'});
    if(state.view==='messages' && state.activeThread===clubId) render();
  }, 1300);
  return false;
}

/* =====================================================
   CREATE CLUB VIEW
===================================================== */
function createClubView(){
  if(!state.user) return authPrompt('List a club on Nexus', 'Log in to submit your club so students can discover and join it.');
  return `
  <div class="page">
    <div class="page-head"><div><span class="eyebrow"><span class="node-dot"></span> LIST A CLUB</span><h1 class="page-title">Create a new club</h1><p class="page-sub">This adds your club straight to the Discover catalog.</p></div></div>
    <div class="info-card" style="max-width:640px;">
      <form onsubmit="return submitNewClub(event)">
        <div class="field"><label>Club name</label><input id="nc_name" placeholder="e.g. Lakeside Chess Club" required/></div>
        <div class="form-row-2">
          <div class="field"><label>Category</label><select id="nc_cat">${CATEGORIES.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
          <div class="field"><label>Location</label><select id="nc_loc">${LOCATIONS.map(l=>`<option value="${l}">${l}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label>Description</label><textarea id="nc_desc" placeholder="What does this club actually do?" required></textarea></div>
        <div class="field"><label>Meeting schedule</label><input id="nc_meets" placeholder="e.g. Thursdays, 6:00 PM" required/></div>
        <div class="field">
          <label>Activities</label>
          <div class="checkbox-grid">
            ${ACTIVITIES.map((a,i)=>`<label class="check-row"><input type="checkbox" class="nc_act" value="${a}"/><span class="check-box"></span>${a}</label>`).join('')}
          </div>
        </div>
        <button class="btn btn-primary btn-block" type="submit"><i data-lucide="plus-circle" size="15"></i> Publish club</button>
      </form>
    </div>
  </div>`;
}
function submitNewClub(e){
  e.preventDefault();
  const name = document.getElementById('nc_name').value;
  const cat = document.getElementById('nc_cat').value;
  const location = document.getElementById('nc_loc').value;
  const desc = document.getElementById('nc_desc').value;
  const meets = document.getElementById('nc_meets').value;
  const activities = [...document.querySelectorAll('.nc_act:checked')].map(x=>x.value);
  const id = 'c' + (CLUBS.length + 1) + '-' + Math.random().toString(36).slice(2,6);
  const seed = name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  const club = {id, name, cat, location, members:1, rating:5, popularity:20, activity:40, img:seed, desc, activities: activities.length?activities:['Weekly meetups'], founded:new Date().getFullYear(), meets, reviews:[]};
  CLUBS.unshift(club);
  state.joined.add(id);
  logActivity('plus-circle', `You created <strong>${name}</strong>`);
  toast('Club published!');
  navigate('club', {id});
  return false;
}

/* =====================================================
   PROFILE / SETTINGS VIEW
===================================================== */
function profileView(){
  if(!state.user) return authPrompt('See your profile', 'Log in to manage your account and interests.');
  const u = state.user;
  const joinedClubs = CLUBS.filter(c=>state.joined.has(c.id));
  return `
  <div class="page">
    <div class="page-head"><div><span class="eyebrow"><span class="node-dot"></span> ACCOUNT</span><h1 class="page-title">Profile & settings</h1></div></div>
    <div class="dash-grid">
      <div>
        <div class="panel">
          <div class="panel-head"><h3>Your info</h3></div>
          <form onsubmit="return saveProfile(event)">
            <div class="form-row-2">
              <div class="field"><label>Full name</label><input id="pf_name" value="${u.name}" required/></div>
              <div class="field"><label>Email</label><input id="pf_email" type="email" value="${u.email}" required/></div>
            </div>
            <div class="field"><label>Bio</label><textarea id="pf_bio" placeholder="A short line about you">${u.bio||''}</textarea></div>
            <div class="field">
              <label>Interests <span class="hint">(powers your recommendations)</span></label>
              <div class="checkbox-grid">
                ${CATEGORIES.map(c=>`<label class="check-row"><input type="checkbox" class="pf_int" value="${c.id}" ${(u.interests||[]).includes(c.id)?'checked':''}/><span class="check-box">${(u.interests||[]).includes(c.id)?'<i data-lucide=\'check\' size=\'11\' color=\'#05070D\'></i>':''}</span>${c.name}</label>`).join('')}
              </div>
            </div>
            <button class="btn btn-primary" type="submit"><i data-lucide="save" size="15"></i> Save changes</button>
          </form>
        </div>
      </div>
      <div>
        <div class="panel" style="text-align:center;">
          <div class="mini-avatar" style="width:64px; height:64px; border-radius:18px; font-size:20px; margin:0 auto 14px;">${initials(u.name)}</div>
          <h3 style="font-size:16px;">${u.name}</h3>
          <p class="font-mono text-slate" style="font-size:11.5px; margin-top:4px;">${u.email}</p>
          <div class="node-rule" style="margin:16px 0;"><span class="line"></span></div>
          <div class="flex" style="justify-content:space-around;">
            <div><div class="stat-val" style="font-size:20px;">${joinedClubs.length}</div><div class="stat-label">Clubs</div></div>
            <div><div class="stat-val" style="font-size:20px;">${state.rsvp.size}</div><div class="stat-label">RSVPs</div></div>
            <div><div class="stat-val" style="font-size:20px;">${state.activityLog.length}</div><div class="stat-label">Actions</div></div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><h3>Danger zone</h3></div>
          <button class="btn btn-danger btn-block" onclick="logout()"><i data-lucide="log-out" size="15"></i> Sign out</button>
        </div>
      </div>
    </div>
  </div>`;
}
function saveProfile(e){
  e.preventDefault();
  state.user.name = document.getElementById('pf_name').value;
  state.user.email = document.getElementById('pf_email').value;
  state.user.bio = document.getElementById('pf_bio').value;
  state.user.interests = [...document.querySelectorAll('.pf_int:checked')].map(x=>x.value);
  toast('Profile updated');
  render();
  return false;
}

function authPrompt(title, sub){
  return `<div class="page"><div class="panel" style="text-align:center; padding:60px 20px; max-width:480px; margin:40px auto;">
    <i data-lucide="lock" size="30" color="var(--slate-dim)"></i>
    <h2 style="font-size:19px; margin:16px 0 8px;">${title}</h2>
    <p class="text-slate" style="font-size:13.5px; margin-bottom:22px;">${sub}</p>
    <div class="flex gap-2" style="justify-content:center;"><a href="#login" class="btn btn-ghost">Log in</a><a href="#register" class="btn btn-primary">Create account</a></div>
  </div></div>`;
}

/* =====================================================
   AUTH VIEWS (standalone, no shell)
===================================================== */
function loginView(){
  return `
  <div class="auth-wrap">
    <div class="grid-lines"></div>
    <a href="#dashboard" class="btn btn-ghost btn-sm auth-back"><i data-lucide="arrow-left" size="14"></i> Back</a>
    <div class="auth-card">
      <div class="auth-logo"><span class="logo-mark"><i data-lucide="hexagon" color="#05070D" size="18"></i></span> Nexus</div>
      <span class="eyebrow"><span class="node-dot"></span> WELCOME BACK</span>
      <h2 style="font-size:24px; margin:10px 0 24px;">Log in to Nexus</h2>
      <form onsubmit="return doLogin(event)">
        <div class="field"><label>Email</label><input type="email" id="li_email" placeholder="you@school.edu" required/></div>
        <div class="field"><label>Password</label><input type="password" id="li_pass" placeholder="••••••••" required/></div>
        <button class="btn btn-primary btn-block" type="submit">Log in <i data-lucide="arrow-right" size="15"></i></button>
      </form>
      <div class="divider-or"><span class="line"></span>OR<span class="line"></span></div>
      <button class="btn btn-ghost btn-block" onclick="quickLogin()"><i data-lucide="zap" size="15"></i> Continue with demo account</button>
      <p class="text-slate" style="text-align:center; margin-top:22px; font-size:13px;">New to Nexus? <a href="#register" style="color:var(--cyan);">Create an account</a></p>
    </div>
  </div>`;
}
function registerView(){
  return `
  <div class="auth-wrap">
    <div class="grid-lines"></div>
    <a href="#dashboard" class="btn btn-ghost btn-sm auth-back"><i data-lucide="arrow-left" size="14"></i> Back</a>
    <div class="auth-card">
      <div class="auth-logo"><span class="logo-mark"><i data-lucide="hexagon" color="#05070D" size="18"></i></span> Nexus</div>
      <span class="eyebrow"><span class="node-dot"></span> JOIN NEXUS</span>
      <h2 style="font-size:24px; margin:10px 0 24px;">Create your account</h2>
      <form onsubmit="return doRegister(event)">
        <div class="field"><label>Full name</label><input type="text" id="rg_name" placeholder="Alex Rivera" required/></div>
        <div class="field"><label>Email</label><input type="email" id="rg_email" placeholder="you@school.edu" required/></div>
        <div class="field"><label>Password</label><input type="password" id="rg_pass" placeholder="Create a password" required/></div>
        <button class="btn btn-primary btn-block" type="submit">Create account <i data-lucide="arrow-right" size="15"></i></button>
      </form>
      <p class="text-slate" style="text-align:center; margin-top:22px; font-size:13px;">Already have an account? <a href="#login" style="color:var(--cyan);">Log in</a></p>
    </div>
  </div>`;
}
function doLogin(e){
  e.preventDefault();
  const email = document.getElementById('li_email').value;
  state.user = {name: email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,l=>l.toUpperCase()), email, interests:[]};
  logActivity('log-in', 'You logged in');
  toast('Welcome back!'); navigate('dashboard'); return false;
}
function doRegister(e){
  e.preventDefault();
  const name = document.getElementById('rg_name').value;
  const email = document.getElementById('rg_email').value;
  state.user = {name, email, interests:[]};
  logActivity('user-plus', 'You created your account');
  toast('Account created — welcome to Nexus!'); navigate('dashboard'); return false;
}
function quickLogin(){
  state.user = {name:'Jamie Chen', email:'jamie.chen@nexus.edu', interests:['tech','gaming']};
  logActivity('log-in', 'You logged in as the demo user');
  toast('Signed in as demo user'); navigate('dashboard');
}

/* =====================================================
   MASTER RENDER
===================================================== */
function render(){
  const root = document.getElementById('rootMount');
  if(AUTH_VIEWS.includes(state.view)){
    root.innerHTML = state.view==='login' ? loginView() : registerView();
    lucide.createIcons();
    return;
  }
  let content = '';
  if(state.view==='dashboard') content = dashboardView();
  else if(state.view==='discover') content = discoverView();
  else if(state.view==='club') content = clubView(state.params.id);
  else if(state.view==='my-clubs') content = myClubsView();
  else if(state.view==='events') content = eventsView();
  else if(state.view==='messages') content = messagesView();
  else if(state.view==='create-club') content = createClubView();
  else if(state.view==='profile') content = profileView();
  else if(state.view==='feedback') content = feedbackView();
  else content = dashboardView();

  root.innerHTML = `
    <div class="app-shell">
      ${sidebarHtml()}
      <div class="content-area">
        ${topbarHtml()}
        ${content}
      </div>
    </div>`;
  lucide.createIcons();
  animateStatValues();
  wireSpotlight();
  wireBarFills();
}

/* ---------- polish: animated counters, cursor spotlight, bar fill-in ---------- */
function animateStatValues(){
  document.querySelectorAll('.stat-val').forEach(el=>{
    const raw = el.textContent.trim();
    const match = raw.match(/^(\d[\d,]*)(.*)$/);
    if(!match) return;
    const target = parseInt(match[1].replace(/,/g,''),10);
    const suffix = match[2] || '';
    if(isNaN(target)) return;
    const dur = 700, start = performance.now();
    function tick(now){
      const p = Math.min(1,(now-start)/dur);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target*eased).toLocaleString() + suffix;
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
function wireSpotlight(){
  document.querySelectorAll('.stat-card').forEach(card=>{
    card.onmousemove = (e)=>{
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
      card.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
    };
  });
}
function wireBarFills(){
  document.querySelectorAll('.bar-fill').forEach(el=>{
    const w = el.style.width; el.style.width='0%';
    requestAnimationFrame(()=>setTimeout(()=>{ el.style.width = w; }, 60));
  });
}

/* init */
(function init(){
  document.documentElement.setAttribute('data-theme', state.theme === 'midnight' ? '' : state.theme);
  const [view, id] = location.hash.replace('#','').split('/');
  state.view = view || 'dashboard';
  state.params = id ? {id} : {};
  render();
})();