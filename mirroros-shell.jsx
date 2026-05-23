// MIRROROS — Unified prototype shell
// Wires all 30 screens (10 prototype + 10 Layer II + 10 Layer III) into one
// navigable, tabbed product. Maintains history; renders chrome (back button,
// tab bar, screen index) on top of underlying screens.

// ─────────────────────────────────────────────────────────────
// Route table
// ─────────────────────────────────────────────────────────────
const TAB_HOME    = 'home';
const TAB_JOURNAL = 'journal';
const TAB_INSIGHTS= 'insights';
const TAB_YOU     = 'you';

// kind: 'onboarding' (linear, no chrome) | 'app' (tabbed, with chrome)
// hub: true means this is the tab root; "back" stops here.
const ROUTES = {
  // ── Onboarding ───────────────────────────────────────────────
  splash:       { src: 'M', name: 'Splash',       kind: 'onboarding', n: '01' },
  intro:        { src: 'M', name: 'Intro',        kind: 'onboarding', n: '02' },
  account:      { src: 'M', name: 'Account',      kind: 'onboarding', n: '03' },
  intake:       { src: 'M', name: 'Intake',       kind: 'onboarding', n: '04' },
  goals:        { src: 'M', name: 'Goals',        kind: 'onboarding', n: '05' },
  'voice-perm': { src: 'M', name: 'VoicePerm',    kind: 'onboarding', n: '06' },

  // ── Home tab ─────────────────────────────────────────────────
  home:          { src: 'M',  name: 'Home',          tab: TAB_HOME,    hub: true,  n: '07', title: 'Home' },
  feed:          { src: 'L2', name: 'DailyFeed',     tab: TAB_HOME,    n: '15', title: 'Daily Insight Feed' },
  capsule:       { src: 'L2', name: 'Capsule',      tab: TAB_HOME,    n: '19', title: 'Insight Capsule' },
  checkin:       { src: 'L2', name: 'CheckIn',      tab: TAB_HOME,    n: '17', title: 'Check In' },
  sessions:      { src: 'L3', name: 'Sessions',     tab: TAB_HOME,    n: '26', title: 'Guided Sessions' },
  observer:      { src: 'L2', name: 'Observer',     tab: TAB_HOME,    n: '14', title: 'Observer Mode' },
  notifications: { src: 'L3', name: 'Notifications',tab: TAB_HOME,    n: '28', title: 'Reminders' },

  // ── Journal tab ──────────────────────────────────────────────
  journal:    { src: 'M',  name: 'Journal',    tab: TAB_JOURNAL, hub: true, n: '09', title: 'Journal' },
  voice:      { src: 'M',  name: 'VoiceChat',  tab: TAB_JOURNAL, n: '08', title: 'Voice Session' },
  voicecall:  { src: 'L3', name: 'VoiceCall',  tab: TAB_JOURNAL, n: '29', title: 'Deep Voice Call' },
  reflection: { src: 'M',  name: 'Reflection', tab: TAB_JOURNAL, n: '10', title: 'Reflection' },

  // ── Insights tab ─────────────────────────────────────────────
  weekly:   { src: 'L2', name: 'WeeklyReport', tab: TAB_INSIGHTS, hub: true, n: '11', title: 'Weekly Report' },
  timeline: { src: 'L2', name: 'Timeline',    tab: TAB_INSIGHTS, n: '12', title: 'Emotional Timeline' },
  patterns: { src: 'L2', name: 'Patterns',    tab: TAB_INSIGHTS, n: '13', title: 'Pattern Recognition' },
  memory:   { src: 'L2', name: 'Memory',      tab: TAB_INSIGHTS, n: '18', title: 'Memory & Archive' },
  growth:   { src: 'L2', name: 'GrowthPath',  tab: TAB_INSIGHTS, n: '16', title: 'Growth Path' },
  reading:  { src: 'L2', name: 'Reading',     tab: TAB_INSIGHTS, n: '20', title: 'Reading' },
  search:   { src: 'L3', name: 'Search',      tab: TAB_INSIGHTS, n: '27', title: 'Search' },

  // ── You tab ──────────────────────────────────────────────────
  companion:     { src: 'L3', name: 'Companion',     tab: TAB_YOU, hub: true, n: '23', title: 'Mirror Profile' },
  personality:   { src: 'L3', name: 'Personality',   tab: TAB_YOU, n: '21', title: 'Personality' },
  voiceSettings: { src: 'L3', name: 'VoiceSettings', tab: TAB_YOU, n: '22', title: 'Voice' },
  privacy:       { src: 'L3', name: 'Privacy',       tab: TAB_YOU, n: '24', title: 'Privacy & Trust' },
  premium:       { src: 'L3', name: 'Premium',       tab: TAB_YOU, n: '25', title: 'Deep Mirror' },
};

const TAB_LIST = [
  { id: TAB_HOME,     label: 'Home',     hub: 'home',      icon: 'home' },
  { id: TAB_JOURNAL,  label: 'Journal',  hub: 'journal',   icon: 'pen'  },
  { id: TAB_INSIGHTS, label: 'Insights', hub: 'weekly',    icon: 'graph'},
  { id: TAB_YOU,      label: 'You',      hub: 'companion', icon: 'user' },
];

// Group screens by tab for the index drawer
const TAB_SECTIONS = TAB_LIST.map(t => ({
  ...t,
  items: Object.entries(ROUTES)
    .filter(([k, v]) => v.tab === t.id)
    .map(([k, v]) => ({ id: k, ...v })),
}));
const ONBOARDING_ITEMS = Object.entries(ROUTES)
  .filter(([k, v]) => v.kind === 'onboarding')
  .map(([k, v]) => ({ id: k, ...v }));

// ─────────────────────────────────────────────────────────────
// Sizing
// ─────────────────────────────────────────────────────────────
const PHONE_W = 402;
const PHONE_H = 874;
// Layer 2/3 screens were designed at 360×780. They use absolute positioning
// inside .mo-screen which fills the parent — they re-flow at 402×874 fine.

function useFitToViewport(W, H, padY = 130, padX = 80) {
  const [scale, setScale] = React.useState(1);
  React.useLayoutEffect(() => {
    function fit() {
      const availH = window.innerHeight - padY;
      const availW = window.innerWidth - padX;
      const s = Math.min(availH / H, availW / W, 1.05);
      setScale(s);
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [W, H, padY, padX]);
  return scale;
}

// ─────────────────────────────────────────────────────────────
// Chrome — back button (top-left)
// ─────────────────────────────────────────────────────────────
function BackButton({ onClick, hidden }) {
  if (hidden) return null;
  return (
    <div className="mo-tap" onClick={onClick} style={{
      position: 'absolute', top: 56, left: 18, zIndex: 60,
      width: 38, height: 38, borderRadius: 19,
      background: 'linear-gradient(180deg, rgba(20,18,40,0.78), rgba(10,8,20,0.78))',
      border: '0.5px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(20px) saturate(160%)',
      boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M9 1L3 7l6 6" stroke="rgba(245,247,255,0.9)" strokeWidth="1.5"
              fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// Top-right: index drawer trigger
function IndexButton({ onClick, hidden, n, title }) {
  if (hidden) return null;
  return (
    <div className="mo-tap" onClick={onClick} style={{
      position: 'absolute', top: 56, right: 18, zIndex: 60,
      height: 38, padding: '0 14px', borderRadius: 19,
      background: 'linear-gradient(180deg, rgba(20,18,40,0.78), rgba(10,8,20,0.78))',
      border: '0.5px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(20px) saturate(160%)',
      boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
      color: 'rgba(245,247,255,0.85)', letterSpacing: '0.22em',
    }}>
      <span style={{ color: 'rgba(167,139,250,0.95)' }}>{n}</span>
      <span style={{
        display: 'inline-flex', flexDirection: 'column', gap: 3,
      }}>
        <span style={{ width: 14, height: 1.2, background: 'rgba(245,247,255,0.6)' }} />
        <span style={{ width: 14, height: 1.2, background: 'rgba(245,247,255,0.6)' }} />
        <span style={{ width: 14, height: 1.2, background: 'rgba(245,247,255,0.6)' }} />
      </span>
    </div>
  );
}

// Bottom tab bar — covers underlying decorative nav
function TabBar({ activeTab, onTab, hidden }) {
  if (hidden) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 22, left: 18, right: 18, height: 64,
      borderRadius: 32, zIndex: 55,
      background: 'linear-gradient(180deg, rgba(20,18,40,0.92), rgba(10,8,20,0.92))',
      border: '0.5px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.1), 0 14px 32px rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'center', padding: '0 10px', gap: 4,
    }}>
      {TAB_LIST.map(t => {
        const on = t.id === activeTab;
        return (
          <div key={t.id} className="mo-tap" onClick={() => onTab(t)} style={{
            flex: 1, height: 50, borderRadius: 26,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4,
            background: on
              ? 'linear-gradient(180deg, rgba(167,139,250,0.22), rgba(111,123,255,0.10))'
              : 'transparent',
            border: on ? '0.5px solid rgba(167,139,250,0.4)' : '0.5px solid transparent',
            boxShadow: on ? '0 0 16px rgba(167,139,250,0.25)' : 'none',
          }}>
            <TabIcon name={t.icon} on={on} />
            <span style={{
              fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 500,
              fontSize: 10.5, letterSpacing: '0.04em',
              color: on ? 'rgba(245,247,255,0.95)' : 'rgba(200,210,230,0.55)',
            }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function TabIcon({ name, on }) {
  const stroke = on ? 'rgba(245,247,255,0.95)' : 'rgba(200,210,230,0.65)';
  const sw = 1.3;
  if (name === 'home') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8l6-5.5L14 8v6h-4v-4H6v4H2V8z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
    </svg>
  );
  if (name === 'pen') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11 1.5l3.5 3.5L5 14.5H1.5V11L11 1.5z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      <path d="M9 3.5l3.5 3.5" stroke={stroke} strokeWidth={sw}/>
    </svg>
  );
  if (name === 'graph') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12l4-5 3 3 5-7" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="3" r="1.4" fill={stroke}/>
    </svg>
  );
  if (name === 'user') return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="2.8" stroke={stroke} strokeWidth={sw}/>
      <path d="M2.5 14c.7-3 3-4.5 5.5-4.5s4.8 1.5 5.5 4.5" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  );
  return null;
}

// ─────────────────────────────────────────────────────────────
// Index drawer — lists all 30 screens, grouped
// ─────────────────────────────────────────────────────────────
function IndexDrawer({ open, onClose, go, currentId }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      pointerEvents: open ? 'auto' : 'none',
    }}>
      {/* Scrim */}
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(2,2,8,0.55)',
        backdropFilter: open ? 'blur(8px)' : 'none',
        opacity: open ? 1 : 0,
        transition: 'opacity .3s ease',
      }} />
      {/* Panel */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, right: 0,
        width: '88%', maxWidth: 360,
        background: 'linear-gradient(180deg, rgba(14,12,28,0.97), rgba(6,5,14,0.97))',
        borderLeft: '0.5px solid rgba(255,255,255,0.1)',
        boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .35s cubic-bezier(.22,.61,.36,1)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '54px 22px 8px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>MIRROROS</div>
            <div className="mo-serif" style={{ fontSize: 28, marginTop: 6, color: 'rgba(245,247,255,0.96)', letterSpacing: '-0.02em' }}>
              Index <span style={{ fontStyle: 'italic', opacity: 0.7 }}>of screens</span>
            </div>
            <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 12, color: 'rgba(200,210,230,0.5)' }}>
              30 screens · jump anywhere
            </div>
          </div>
          <div className="mo-tap" onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'rgba(255,255,255,0.06)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(245,247,255,0.85)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px 28px' }}>
          <IndexSection
            title="Onboarding"
            sub="Linear · first launch"
            items={ONBOARDING_ITEMS}
            currentId={currentId}
            go={(id) => { go(id); onClose(); }}
          />
          {TAB_SECTIONS.map(s => (
            <IndexSection
              key={s.id}
              title={s.label}
              sub={`Tab · ${s.items.length} screens`}
              items={s.items}
              currentId={currentId}
              go={(id) => { go(id); onClose(); }}
            />
          ))}
          {/* Showcase (special, wide artboard) */}
          <div style={{ padding: '8px 16px 12px' }}>
            <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)', padding: '14px 0 10px' }}>SHOWCASE</div>
            <a href="layer3.html#showcase" style={{
              display: 'block', padding: '12px 14px', borderRadius: 14,
              background: 'linear-gradient(180deg, rgba(167,139,250,0.15), rgba(111,123,255,0.05))',
              border: '0.5px solid rgba(167,139,250,0.3)',
              textDecoration: 'none', color: 'rgba(245,247,255,0.95)',
              fontFamily: 'Geist', fontSize: 13, fontWeight: 500,
            }}>
              30 · Ecosystem Showcase <span style={{ float: 'right', opacity: 0.5, fontFamily: 'JetBrains Mono', fontSize: 10 }}>OPEN ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndexSection({ title, sub, items, currentId, go }) {
  return (
    <div style={{ padding: '8px 16px 4px' }}>
      <div style={{ padding: '14px 0 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{title.toUpperCase()}</div>
        <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(200,210,230,0.35)' }}>{sub}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => {
          const on = it.id === currentId;
          return (
            <div key={it.id} className="mo-tap" onClick={() => go(it.id)} style={{
              padding: '10px 12px', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 12,
              background: on ? 'linear-gradient(180deg, rgba(167,139,250,0.18), rgba(111,123,255,0.06))' : 'transparent',
              border: on ? '0.5px solid rgba(167,139,250,0.4)' : '0.5px solid transparent',
            }}>
              <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: on ? 'rgba(167,139,250,1)' : 'rgba(200,210,230,0.45)', width: 22 }}>
                {it.n}
              </div>
              <div style={{ flex: 1, fontFamily: 'Geist', fontSize: 13.5, color: on ? 'rgba(245,247,255,1)' : 'rgba(220,225,240,0.85)' }}>
                {it.title || it.name}
              </div>
              {on && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Toolbar (above device frame, in viewport space)
// ─────────────────────────────────────────────────────────────
function Toolbar({ route, go, openIndex, onRestart }) {
  return (
    <div className="proto-bar">
      <a className="pill-link" href="index.html">← CANVAS</a>
      <div className="sep" />
      <button onClick={() => go('splash')} className={route.id === 'splash' ? 'on' : ''}>
        <svg width="10" height="12" viewBox="0 0 10 12"><circle cx="5" cy="5" r="4" stroke="currentColor" fill="none"/><path d="M5 11v-2" stroke="currentColor"/></svg>
        Restart
      </button>
      <div className="sep" />
      <span className="step">{route.n} · {route.title || route.name}</span>
      <div className="sep" />
      <button onClick={openIndex}>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M1 1.5h12M1 5.5h12M1 9.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Index
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────
function App() {
  const [screenId, setScreenId] = React.useState('splash');
  const [history, setHistory] = React.useState([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [state, setStateRaw] = React.useState({});
  const setState = (p) => setStateRaw(prev => ({ ...prev, ...p }));

  const route = ROUTES[screenId] || ROUTES.splash;
  const inApp = route.kind !== 'onboarding';

  const go = React.useCallback((id) => {
    if (!ROUTES[id]) return;
    setHistory(h => [...h, screenId]);
    setScreenId(id);
  }, [screenId]);

  const back = React.useCallback(() => {
    setHistory(h => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setScreenId(prev);
      return h.slice(0, -1);
    });
  }, []);

  const goTab = React.useCallback((tab) => {
    if (tab.hub === screenId) return;
    setHistory(h => [...h, screenId]);
    setScreenId(tab.hub);
  }, [screenId]);

  const restart = () => { setScreenId('splash'); setHistory([]); setStateRaw({}); };

  // Keyboard nav
  React.useEffect(() => {
    const h = (e) => {
      if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) return;
      if (e.key === 'Escape') { if (drawerOpen) setDrawerOpen(false); else back(); }
      if (e.key === 'ArrowLeft') back();
      if (e.key === 'i' || e.key === 'I') setDrawerOpen(o => !o);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [back, drawerOpen]);

  // Resolve the screen component from its src registry
  const Comp = React.useMemo(() => {
    const reg = route.src === 'M'  ? window.MobileScreens
              : route.src === 'L2' ? window.L2Screens
              : route.src === 'L3' ? window.L3Screens
              : {};
    return reg && reg[route.name];
  }, [route]);

  const scale = useFitToViewport(PHONE_W, PHONE_H, 140, 80);

  // Back button is shown when there's history AND we're not on a hub.
  const showBack = inApp && history.length > 0 && !route.hub;
  const showChrome = inApp;

  return (
    <>
      <Toolbar route={{ id: screenId, ...route }} go={go} openIndex={() => setDrawerOpen(true)} onRestart={restart} />

      <div className="proto-mobile-wrap">
        <div style={{
          width: PHONE_W, height: PHONE_H,
          transform: `scale(${scale})`, transformOrigin: 'center center',
          position: 'relative',
        }}>
          <IOSDevice dark width={PHONE_W} height={PHONE_H}>
            <div key={screenId} className="proto-fade" style={{ position: 'absolute', inset: 0 }}>
              {Comp ? <Comp go={go} state={state} setState={setState} /> : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(245,247,255,0.55)', fontFamily: 'JetBrains Mono', fontSize: 12 }}>
                  Loading {route.name}…
                </div>
              )}
            </div>

            {/* Chrome layered over the screen */}
            <BackButton onClick={back} hidden={!showBack} />
            <IndexButton onClick={() => setDrawerOpen(true)} hidden={!showChrome} n={route.n} title={route.title} />
            <TabBar activeTab={route.tab} onTab={goTab} hidden={!showChrome} />

            <IndexDrawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              go={go}
              currentId={screenId}
            />
          </IOSDevice>
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{
        position: 'fixed', bottom: 18, left: '50%', transform: 'translateX(-50%)',
        zIndex: 90, fontFamily: 'JetBrains Mono', fontSize: 10,
        color: 'rgba(200,210,230,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        {inApp ? '← back · I index · tabs to switch · click within app' : 'Onboarding · click to advance'}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
