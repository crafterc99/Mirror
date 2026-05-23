// MIRROROS — prototype shell
// Handles mobile/desktop mode, flow state, navigation chrome.

const FLOW = [
  { id: 'splash',     label: '01 · Splash' },
  { id: 'intro',      label: '02 · Intro' },
  { id: 'account',    label: '03 · Account' },
  { id: 'intake',     label: '04 · Intake' },
  { id: 'goals',      label: '05 · Goals' },
  { id: 'voice-perm', label: '06 · Voice Intro' },
  { id: 'home',       label: '07 · Home' },
  { id: 'voice',      label: '08 · Voice Chat' },
  { id: 'journal',    label: '09 · Journal' },
  { id: 'reflection', label: '10 · Reflection' },
];

const MOBILE_W = 402;
const MOBILE_H = 874;
const DESKTOP_W = 1440;
const DESKTOP_H = 900;

// Phone shell that scales to fit a vertical box of available height,
// while keeping the 402×874 aspect ratio.
function MobileStage({ children }) {
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  React.useLayoutEffect(() => {
    function fit() {
      if (!wrapRef.current) return;
      const padY = 110;     // leave room for top toolbar
      const padX = 80;
      const availH = window.innerHeight - padY;
      const availW = window.innerWidth - padX;
      const s = Math.min(availH / MOBILE_H, availW / MOBILE_W, 1.05);
      setScale(s);
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className="proto-mobile-wrap" ref={wrapRef}>
      <div style={{
        width: MOBILE_W, height: MOBILE_H,
        transform: `scale(${scale})`, transformOrigin: 'center center',
      }}>
        {children}
      </div>
    </div>
  );
}

// Desktop "browser" surface that scales to fit.
function DesktopStage({ children }) {
  const [scale, setScale] = React.useState(1);
  React.useLayoutEffect(() => {
    function fit() {
      const padY = 130;
      const padX = 80;
      const availH = window.innerHeight - padY;
      const availW = window.innerWidth - padX;
      const s = Math.min(availH / DESKTOP_H, availW / DESKTOP_W, 1);
      setScale(s);
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className="proto-desktop-wrap">
      <div style={{
        width: DESKTOP_W, height: DESKTOP_H,
        transform: `scale(${scale})`, transformOrigin: 'center center',
        borderRadius: 18, overflow: 'hidden',
        position: 'relative',
        boxShadow:
          '0 0 0 1px rgba(255,255,255,0.06),' +
          '0 60px 120px rgba(0,0,0,0.6),' +
          '0 24px 48px rgba(0,0,0,0.4)',
      }}>
        {/* macOS-ish window chrome */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 40, zIndex: 100,
          background: 'linear-gradient(180deg, rgba(18,15,32,0.95), rgba(10,8,20,0.95))',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ff5f56' }} />
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#ffbd2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#27c93f' }} />
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: 'JetBrains Mono', fontSize: 11, color: 'rgba(200,210,230,0.55)', letterSpacing: '0.18em' }}>
            mirroros · desktop
          </div>
          <div style={{ width: 60 }} />
        </div>
        {/* Inner stage */}
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, bottom: 0, background: '#050508' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Toolbar({ mode, setMode, idx, total, onBack, onNext, onRestart }) {
  return (
    <div className="proto-bar">
      <button className={mode === 'mobile' ? 'on' : ''} onClick={() => setMode('mobile')}>
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
          <rect x="0.5" y="0.5" width="10" height="13" rx="2" stroke="currentColor"/>
          <circle cx="5.5" cy="11.5" r="0.6" fill="currentColor"/>
        </svg>
        Mobile
      </button>
      <button className={mode === 'desktop' ? 'on' : ''} onClick={() => setMode('desktop')}>
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
          <rect x="0.5" y="0.5" width="13" height="9" rx="1.5" stroke="currentColor"/>
          <path d="M4 11.5h6" stroke="currentColor"/>
        </svg>
        Desktop
      </button>

      <div className="sep" />

      <button onClick={onBack} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.35 : 1 }}>←</button>
      <span className="step">{String(idx + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
      <button onClick={onNext} disabled={idx === total - 1} style={{ opacity: idx === total - 1 ? 0.35 : 1 }}>→</button>

      <div className="sep" />

      <button onClick={onRestart} title="Restart flow">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M2 6.5a4.5 4.5 0 108.5-2L12 3M11.5 6.5L12 3l-3 0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Restart
      </button>

      <div className="sep" />

      <a className="pill-link" href="index.html">← CANVAS</a>
    </div>
  );
}

function App() {
  const [mode, setMode] = React.useState('mobile');
  const [screenId, setScreenId] = React.useState('splash');
  const [state, setStateRaw] = React.useState({});
  const setState = (patch) => setStateRaw(prev => ({ ...prev, ...patch }));

  const idx = Math.max(0, FLOW.findIndex(s => s.id === screenId));

  const go = React.useCallback((id) => {
    setScreenId(id);
  }, []);

  // Keyboard nav
  React.useEffect(() => {
    const h = (e) => {
      if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) return;
      if (e.key === 'ArrowRight' && idx < FLOW.length - 1) setScreenId(FLOW[idx + 1].id);
      if (e.key === 'ArrowLeft' && idx > 0) setScreenId(FLOW[idx - 1].id);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [idx]);

  const restart = () => { setScreenId('splash'); setStateRaw({}); };

  const screensM = window.MobileScreens || {};
  const screensD = window.DesktopScreens || {};
  const mobileMap = {
    splash: screensM.Splash, intro: screensM.Intro, account: screensM.Account,
    intake: screensM.Intake, goals: screensM.Goals, 'voice-perm': screensM.VoicePerm,
    home: screensM.Home, voice: screensM.VoiceChat, journal: screensM.Journal,
    reflection: screensM.Reflection,
  };
  const desktopMap = {
    splash: screensD.Splash, intro: screensD.Intro, account: screensD.Account,
    intake: screensD.Intake, goals: screensD.Goals, 'voice-perm': screensD.VoicePerm,
    home: screensD.Home, voice: screensD.VoiceChat, journal: screensD.Journal,
    reflection: screensD.Reflection,
  };

  const Mob = mobileMap[screenId];
  const Desk = desktopMap[screenId];

  return (
    <>
      <Toolbar
        mode={mode}
        setMode={setMode}
        idx={idx} total={FLOW.length}
        onBack={() => idx > 0 && setScreenId(FLOW[idx - 1].id)}
        onNext={() => idx < FLOW.length - 1 && setScreenId(FLOW[idx + 1].id)}
        onRestart={restart}
      />

      {mode === 'mobile' ? (
        <MobileStage>
          <IOSDevice dark width={MOBILE_W} height={MOBILE_H}>
            <div key={`m-${screenId}`} className="proto-fade" style={{ position: 'absolute', inset: 0 }}>
              {Mob ? <Mob go={go} state={state} setState={setState} /> : null}
            </div>
          </IOSDevice>
        </MobileStage>
      ) : (
        <DesktopStage>
          <div key={`d-${screenId}`} className="proto-fade" style={{ position: 'absolute', inset: 0 }}>
            {Desk ? <Desk go={go} state={state} setState={setState} /> : null}
          </div>
        </DesktopStage>
      )}

      {/* Bottom hint */}
      <div style={{
        position: 'fixed', bottom: 18, left: '50%', transform: 'translateX(-50%)',
        zIndex: 90, fontFamily: 'JetBrains Mono', fontSize: 10,
        color: 'rgba(200,210,230,0.4)', letterSpacing: '0.22em', textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        {FLOW[idx]?.label} · ← → to navigate · click within app to flow
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
