// MIRROROS — Mobile prototype screens (clickable flow)
// Each screen receives { go, state, setState } and triggers go('next-id')
// to advance. They reuse the .mo-* styles from prototype.html.

const M = {};

// ─── helpers ─────────────────────────────────────────────────
function MOLogoM({ size = 14, color = 'rgba(245,247,255,0.95)' }) {
  return (
    <svg width={size * 2.2} height={size} viewBox="0 0 22 10" fill="none">
      <circle cx="6.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="15.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="11" cy="5" r="1.4" fill={color} />
    </svg>
  );
}
function StatusGap() { return <div style={{ height: 62 }} />; }
function Dots({ total, active }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          width: i === active ? 22 : 6, height: 6, borderRadius: 3,
          background: i === active ? 'rgba(245,247,255,0.85)' : 'rgba(245,247,255,0.18)',
          transition: 'width .3s ease',
        }} />
      ))}
    </div>
  );
}

// ─── 01 splash ───────────────────────────────────────────────
M.Splash = function({ go }) {
  React.useEffect(() => {
    const t = setTimeout(() => go('intro'), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="mo-screen mo-tap" onClick={() => go('intro')}>
      <div className="mo-ambient" />
      <div style={{
        position: 'absolute', top: '32%', left: '50%',
        transform: 'translate(-50%, -50%)', width: 280, height: 280, opacity: 0.55,
      }}>
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="mo-grain" /><div className="mo-vignette" />
      <div style={{ position: 'absolute', top: 64, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <MOLogoM size={16} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center', padding: '0 32px' }}>
        <div className="mo-serif" style={{ fontSize: 56, lineHeight: 1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.03em' }}>
          mirror<span style={{ fontStyle: 'italic', opacity: 0.85 }}>os</span>
        </div>
        <div style={{ marginTop: 18, fontFamily: 'Geist', fontSize: 12, letterSpacing: '0.4em', color: 'rgba(200,210,230,0.55)', textTransform: 'uppercase' }}>
          An Operating System For The Self
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 10, color: 'rgba(200,210,230,0.32)', letterSpacing: '0.15em' }}>
          v 0.1 · TAP TO BEGIN
        </span>
      </div>
    </div>
  );
};

// ─── 02 intro ────────────────────────────────────────────────
M.Intro = function({ go }) {
  const [page, setPage] = React.useState(0);
  const pages = [
    { eyebrow: 'PRINCIPLE I',   title: ['Become conscious of', 'who you are.'], body: 'MIRROROS notices the small currents of your inner life — what you feel, what you repeat, what you carry without naming.' },
    { eyebrow: 'PRINCIPLE II',  title: ['Patterns reveal', 'themselves quietly.'], body: 'Across conversations and entries, a soft intelligence surfaces the shapes you live inside — gently, without verdict.' },
    { eyebrow: 'PRINCIPLE III', title: ['Grow on purpose.'], body: 'When you can see yourself clearly, change is no longer a struggle. It becomes the natural next breath.' },
  ];
  const p = pages[page];
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px' }}>
        <MOLogoM size={11} color="rgba(245,247,255,0.7)" />
        <span className="mo-tap" onClick={() => go('account')} style={{
          fontFamily: 'Geist', fontSize: 11, letterSpacing: '0.2em',
          color: 'rgba(200,210,230,0.5)', textTransform: 'uppercase',
        }}>Skip</span>
      </div>
      <div style={{ padding: '60px 30px 0' }}>
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{p.eyebrow}</span>
        <h1 className="mo-serif" style={{ margin: '20px 0 0', fontSize: 42, lineHeight: 1.05, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em' }}>
          {p.title.map((line, i) => (
            <span key={i} style={{ display: 'block', fontStyle: i === p.title.length - 1 ? 'italic' : 'normal' }}>{line}</span>
          ))}
        </h1>
        <p style={{ marginTop: 28, fontFamily: 'Geist', fontSize: 15, lineHeight: 1.55, color: 'rgba(220,225,240,0.65)', maxWidth: 280, fontWeight: 300 }}>{p.body}</p>
      </div>
      <div style={{ position: 'absolute', bottom: 200, left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div className="mo-orb" style={{ width: 120, height: 120, opacity: 0.55 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, padding: '0 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Dots total={pages.length} active={page} />
          <div className="mo-tap" onClick={() => page < pages.length - 1 ? setPage(page + 1) : go('account')} style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
            border: '0.5px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M1 7h15M11 1l6 6-6 6" stroke="rgba(245,247,255,0.95)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── 03 account ──────────────────────────────────────────────
M.Account = function({ go }) {
  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.7 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 24px' }}>
        <MOLogoM size={11} color="rgba(245,247,255,0.7)" />
      </div>
      <div style={{ padding: '90px 30px 0' }}>
        <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>BEGIN</div>
        <h1 className="mo-serif" style={{ margin: '18px 0 0', fontSize: 42, lineHeight: 1.05, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em' }}>
          A space that's<br /><span style={{ fontStyle: 'italic' }}>only yours.</span>
        </h1>
        <p style={{ marginTop: 20, fontFamily: 'Geist', fontSize: 14, lineHeight: 1.55, color: 'rgba(220,225,240,0.6)', maxWidth: 270, fontWeight: 300 }}>
          Encrypted on-device. Nothing you share leaves this mirror without you.
        </p>
      </div>
      <div style={{ position: 'absolute', bottom: 70, left: 30, right: 30, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="mo-pill primary mo-tap" onClick={() => go('intake')} style={{ width: '100%' }}>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="white" style={{ marginRight: 10 }}>
            <path d="M11.6 9.3c0-2.1 1.7-3.1 1.8-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.7-2.1.8-1.2 1.2-2.4 1.2-2.4-.1 0-2.3-.9-2.3-3.6zM9.5 3.1c.6-.7 1-1.7.9-2.7-.8 0-1.8.6-2.4 1.3-.5.6-1 1.6-.9 2.6.9.1 1.8-.5 2.4-1.2z"/>
          </svg>
          Continue with Apple
        </button>
        <button className="mo-pill mo-tap" onClick={() => go('intake')} style={{ width: '100%' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 10 }}>
            <path d="M17.6 9.2c0-.6-.1-1.3-.2-1.9H9v3.6h4.8c-.2 1.1-.8 2-1.8 2.6v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z" fill="#4285F4"/>
            <path d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.8-3.1.8-2.4 0-4.4-1.6-5.1-3.8H.9v2.3C2.4 15.9 5.5 18 9 18z" fill="#34A853"/>
            <path d="M3.9 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V4.9H.9C.3 6.1 0 7.5 0 9s.3 2.9.9 4.1l3-2.4z" fill="#FBBC05"/>
            <path d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.5-2.5C13.5.9 11.4 0 9 0 5.5 0 2.4 2.1.9 4.9l3 2.4C4.6 5.2 6.6 3.6 9 3.6z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        <button className="mo-pill mo-tap" onClick={() => go('intake')} style={{ width: '100%' }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" style={{ marginRight: 10 }}>
            <rect x="1" y="1" width="16" height="12" rx="2" stroke="rgba(245,247,255,0.95)" strokeWidth="1.2"/>
            <path d="M1.5 2L9 8l7.5-6" stroke="rgba(245,247,255,0.95)" strokeWidth="1.2"/>
          </svg>
          Continue with Email
        </button>
        <div style={{ marginTop: 14, textAlign: 'center', fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.4)' }}>
          By continuing you agree to our <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms</span> and <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy</span>.
        </div>
      </div>
    </div>
  );
};

// ─── 04 intake ───────────────────────────────────────────────
M.Intake = function({ go, state, setState }) {
  const [step, setStep] = React.useState(0);
  const questions = [
    { q: 'How do you feel most days?', eyebrow: '01 · Baseline',
      opts: ['Numb', 'Restless', 'Tender', 'Heavy', 'Anxious', 'Quiet', 'Hopeful', 'Tired'] },
    { q: 'What are you seeking?', eyebrow: '02 · Direction',
      opts: ['Clarity', 'Stillness', 'Courage', 'Closure', 'Meaning', 'Connection', 'Repair', 'Joy'] },
    { q: 'What hurts most right now?', eyebrow: '03 · Weight',
      opts: ['Loneliness', 'A loss', 'Work', 'Family', 'A relationship', 'My own mind', 'Nothing specific'] },
  ];
  const cur = questions[step];
  const picks = state.intake || [new Set(), new Set(), new Set()];
  const sel = picks[step];
  const toggle = (opt) => {
    const next = picks.map(s => new Set(s));
    next[step].has(opt) ? next[step].delete(opt) : next[step].add(opt);
    setState({ intake: next });
  };
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px' }}>
        <MOLogoM size={11} color="rgba(245,247,255,0.7)" />
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(200,210,230,0.5)' }}>
          {step + 1} / {questions.length}
        </span>
      </div>
      <div style={{ padding: '32px 28px 0' }}>
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{cur.eyebrow}</span>
        <h1 className="mo-serif" style={{ margin: '14px 0 0', fontSize: 34, lineHeight: 1.1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>{cur.q}</h1>
        <p style={{ marginTop: 10, fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5, color: 'rgba(220,225,240,0.5)', fontWeight: 300 }}>Tap as many as feel true. There is no wrong answer.</p>
      </div>
      <div style={{ padding: '24px 22px 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {cur.opts.map(opt => {
          const on = sel.has(opt);
          return (
            <div key={opt} className={`mo-glass mo-tap ${on ? 'selected' : ''}`} onClick={() => toggle(opt)} style={{
              padding: '13px 18px', borderRadius: 999,
              fontFamily: 'Geist', fontSize: 14, fontWeight: on ? 500 : 400,
              color: on ? 'rgba(255,255,255,1)' : 'rgba(245,247,255,0.78)',
              userSelect: 'none',
            }}>{opt}</div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 60, left: 28, right: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Geist', fontSize: 13, color: 'rgba(200,210,230,0.45)' }}>{sel.size} selected</span>
        <button className="mo-pill primary mo-tap" onClick={() => step < questions.length - 1 ? setStep(step + 1) : go('goals')} style={{ height: 50, padding: '0 24px', fontSize: 15 }}>
          {step < questions.length - 1 ? 'Continue' : 'Reflect'} →
        </button>
      </div>
    </div>
  );
};

// ─── 05 goals ────────────────────────────────────────────────
M.Goals = function({ go, state, setState }) {
  const goals = [
    { t: 'Find peace', d: 'Quiet the noise inside.' },
    { t: 'Stop overthinking', d: 'Loosen the loop.' },
    { t: 'Heal emotionally', d: 'Tend to what hurts.' },
    { t: 'Build confidence', d: 'Stand inside myself.' },
    { t: 'Become disciplined', d: 'Keep promises to me.' },
    { t: 'Understand myself', d: 'See clearly. Without flinching.' },
  ];
  const sel = state.goals || new Set(['Find peace', 'Understand myself']);
  const toggle = (t) => {
    const n = new Set(sel); n.has(t) ? n.delete(t) : n.add(t); setState({ goals: n });
  };
  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.7 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 24px' }}>
        <MOLogoM size={11} color="rgba(245,247,255,0.7)" />
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(200,210,230,0.5)' }}>04 / 05</span>
      </div>
      <div style={{ padding: '30px 28px 0' }}>
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>YOUR NORTH STARS</span>
        <h1 className="mo-serif" style={{ margin: '14px 0 0', fontSize: 34, lineHeight: 1.1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>
          What do you want to<br /><span style={{ fontStyle: 'italic' }}>move toward?</span>
        </h1>
      </div>
      <div style={{ padding: '22px 22px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {goals.map(g => {
          const on = sel.has(g.t);
          return (
            <div key={g.t} className={`mo-glass mo-tap ${on ? 'selected' : ''}`} onClick={() => toggle(g.t)} style={{ padding: 14, height: 110, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 12, right: 12, width: 18, height: 18, borderRadius: '50%',
                background: on ? 'radial-gradient(circle, #fff 0%, #a78bfa 50%, transparent 100%)' : 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                filter: on ? 'drop-shadow(0 0 8px rgba(167,139,250,0.7))' : 'none',
              }} />
              <div className="mo-serif" style={{ marginTop: 28, fontSize: 18, lineHeight: 1.1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>{g.t}</div>
              <div style={{ marginTop: 6, fontFamily: 'Geist', fontSize: 11.5, lineHeight: 1.4, color: 'rgba(220,225,240,0.55)', fontWeight: 300 }}>{g.d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: 60, left: 28, right: 28 }}>
        <button className="mo-pill primary mo-tap" onClick={() => go('voice-perm')} style={{ width: '100%' }}>Continue</button>
      </div>
    </div>
  );
};

// ─── 06 voice permission ─────────────────────────────────────
M.VoicePerm = function({ go }) {
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center', padding: '0 32px' }}>
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>YOUR VOICE</span>
        <h1 className="mo-serif" style={{ margin: '14px 0 0', fontSize: 32, lineHeight: 1.08, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>
          Sometimes the truest words<br />come <span style={{ fontStyle: 'italic' }}>out loud.</span>
        </h1>
      </div>
      <div style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%, -50%)', width: 220, height: 220 }}>
        <div style={{
          position: 'absolute', inset: -40, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 65%)',
          animation: 'mo-orb-breathe 5s ease-in-out infinite alternate',
        }} />
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
        <svg width="32" height="44" viewBox="0 0 32 44" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <rect x="10" y="2" width="12" height="22" rx="6" fill="rgba(255,255,255,0.95)"/>
          <path d="M4 18c0 7 5 12 12 12s12-5 12-12M16 30v8M10 42h12" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 32, right: 32, textAlign: 'center', fontFamily: 'Geist', fontSize: 13, lineHeight: 1.6, color: 'rgba(220,225,240,0.65)', fontWeight: 300 }}>
        Talk to your mirror as you would to a patient, brilliant friend.<br />
        Audio stays encrypted. You can pause, delete, or leave anytime.
      </div>
      <div style={{ position: 'absolute', bottom: 60, left: 28, right: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="mo-pill primary mo-tap" onClick={() => go('home')} style={{ width: '100%' }}>Enable microphone</button>
        <button className="mo-tap" onClick={() => go('home')} style={{ background: 'transparent', border: 0, color: 'rgba(200,210,230,0.55)', fontFamily: 'Geist', fontSize: 14, padding: 12 }}>I'll write instead</button>
      </div>
    </div>
  );
};

// ─── 07 home ─────────────────────────────────────────────────
M.Home = function({ go }) {
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.5 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 22px 0' }}>
        <div>
          <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.5)' }}>TUESDAY · 6:24 PM</div>
          <div className="mo-serif" style={{ marginTop: 6, fontSize: 26, lineHeight: 1.1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>
            Evening, <span style={{ fontStyle: 'italic' }}>Sasha.</span>
          </div>
        </div>
        <div className="mo-glass mo-tap" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Instrument Serif', fontSize: 18, color: 'rgba(245,247,255,0.9)' }}>S</span>
        </div>
      </div>
      <div style={{ padding: '22px 18px 0' }}>
        <div className="mo-glass" style={{ padding: 18, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, opacity: 0.7, background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 60%)', filter: 'blur(8px)' }} />
          <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>CHECK · IN</div>
          <div className="mo-serif" style={{ marginTop: 8, fontSize: 24, lineHeight: 1.15, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>
            What's on your mind<br /><span style={{ fontStyle: 'italic' }}>tonight?</span>
          </div>
          <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
            <button className="mo-pill mo-tap" onClick={() => go('voice')} style={{
              flex: 1, height: 44, padding: '0 14px', fontSize: 13.5,
              background: 'linear-gradient(180deg, rgba(167,139,250,0.95), rgba(111,123,255,0.95))',
              border: '0.5px solid rgba(255,255,255,0.35)',
              boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45), 0 0 18px rgba(167,139,250,0.4)',
            }}>
              <svg width="11" height="14" viewBox="0 0 11 14" style={{ marginRight: 8 }}>
                <rect x="3" y="1" width="5" height="9" rx="2.5" fill="white"/>
                <path d="M1 7c0 2.5 1.8 4.5 4.5 4.5S10 9.5 10 7M5.5 11.5V13M3.5 13h4" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>Speak
            </button>
            <button className="mo-pill mo-tap" onClick={() => go('journal')} style={{ flex: 1, height: 44, padding: '0 14px', fontSize: 13.5 }}>
              <svg width="13" height="13" viewBox="0 0 13 13" style={{ marginRight: 8 }} fill="none">
                <path d="M9 1l3 3-8 8H1V9l8-8z" stroke="rgba(245,247,255,0.9)" strokeWidth="1.2" strokeLinejoin="round"/>
              </svg>Write
            </button>
          </div>
        </div>
      </div>
      <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.55)' }}>RECENT INSIGHTS</div>
        <span style={{ fontFamily: 'Geist', fontSize: 12, color: 'rgba(200,210,230,0.4)' }}>3 new</span>
      </div>
      <div style={{ padding: '10px 18px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { tag: 'PATTERN', t: 'You soften when you speak about your sister.', d: '2 days ago' },
          { tag: 'SHIFT', t: 'Sleep correlates with how forgiving your inner voice gets.', d: '4 days ago' },
        ].map((c, i) => (
          <div key={i} className="mo-glass mo-tap" onClick={() => go('reflection')} style={{ padding: 14 }}>
            <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.8)' }}>{c.tag}</div>
            <div className="mo-serif" style={{ marginTop: 6, fontSize: 16, lineHeight: 1.3, color: 'rgba(245,247,255,0.95)', letterSpacing: '-0.01em' }}>{c.t}</div>
            <div style={{ marginTop: 6, fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.45)' }}>{c.d}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 22px 0' }}>
        <div className="mo-glass" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.8)' }}>GROWTH FOCUS · WEEK 03</div>
            <div className="mo-serif" style={{ marginTop: 4, fontSize: 16, lineHeight: 1.2, color: 'rgba(245,247,255,0.95)', letterSpacing: '-0.01em' }}>Letting things be unfinished.</div>
          </div>
          <svg width="74" height="36" viewBox="0 0 74 36">
            <path d="M1 28 C 10 24, 14 26, 20 18 S 32 6, 40 14 S 56 22, 72 8" fill="none" stroke="rgba(167,139,250,0.95)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 22, left: 18, right: 18, height: 64, borderRadius: 32,
        background: 'linear-gradient(180deg, rgba(20,18,40,0.85), rgba(10,8,20,0.85))',
        border: '0.5px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px) saturate(160%)',
        boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 4,
      }}>
        {[
          { l: 'Home', on: true, click: () => {} },
          { l: 'Journal', on: false, click: () => go('journal') },
          { l: 'Insights', on: false, click: () => go('reflection') },
          { l: 'You', on: false, click: () => {} },
        ].map(t => (
          <div key={t.l} className="mo-tap" onClick={t.click} style={{
            flex: 1, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 22, fontFamily: 'Geist', fontSize: 12, fontWeight: 500,
            color: t.on ? 'rgba(245,247,255,0.98)' : 'rgba(200,210,230,0.5)',
            background: t.on ? 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))' : 'transparent',
            border: t.on ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid transparent',
          }}>{t.l}</div>
        ))}
      </div>
    </div>
  );
};

// ─── 08 voice chat ───────────────────────────────────────────
M.VoiceChat = function({ go }) {
  const [secs, setSecs] = React.useState(272);
  React.useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60), s = secs % 60;
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 22px' }}>
        <div className="mo-glass mo-tap" onClick={() => go('home')} style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="rgba(245,247,255,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>LIVE · MIRROR</div>
          <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: 'rgba(245,247,255,0.95)' }}>
            {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
          </div>
        </div>
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="2" cy="7" r="1.4" fill="rgba(245,247,255,0.85)"/><circle cx="7" cy="7" r="1.4" fill="rgba(245,247,255,0.85)"/><circle cx="12" cy="7" r="1.4" fill="rgba(245,247,255,0.85)"/></svg>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 138, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200 }}>
        <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 65%)', animation: 'mo-orb-breathe 3.4s ease-in-out infinite alternate' }} />
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', top: 360, left: 28, right: 28, textAlign: 'center' }}>
        <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>MIRROR · LISTENING</div>
        <div className="mo-serif" style={{ marginTop: 12, fontSize: 22, lineHeight: 1.3, color: 'rgba(245,247,255,0.95)', letterSpacing: '-0.015em', textWrap: 'pretty' }}>
          "Take your time. I noticed you paused on the word <span style={{ fontStyle: 'italic', color: 'rgba(199,189,255,1)' }}>guilty</span>."
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 168, left: 32, right: 32, display: 'flex', justifyContent: 'center' }}>
        <div className="mo-wave" style={{ width: '100%', justifyContent: 'space-between' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${(i * 0.04) % 1.4}s`, opacity: 0.35 + (Math.sin(i / 2) + 1) * 0.3 }} />
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 70, left: 28, right: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="mo-glass mo-tap" style={{ width: 56, height: 56, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 15L16 1M16 1H6M16 1v10" stroke="rgba(245,247,255,0.9)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="mo-tap" onClick={() => go('reflection')} style={{
          width: 84, height: 84, borderRadius: 42, position: 'relative',
          background: 'linear-gradient(180deg, rgba(255,90,110,0.95), rgba(220,40,70,0.95))',
          border: '0.5px solid rgba(255,255,255,0.4)',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.5), 0 0 30px rgba(255,90,110,0.55), 0 12px 36px rgba(180,30,50,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, background: 'rgba(255,255,255,0.95)' }} />
        </div>
        <div className="mo-glass mo-tap" style={{ width: 56, height: 56, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M8 2v12" stroke="rgba(245,247,255,0.9)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// ─── 09 journal ──────────────────────────────────────────────
M.Journal = function({ go, state, setState }) {
  const text = state.journal ?? 'I keep coming back to that conversation. The one where I went quiet and he kept talking. I don\'t know if I was protecting him or hiding from myself.';
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.45 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 22px' }}>
        <div className="mo-glass mo-tap" onClick={() => go('home')} style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="rgba(245,247,255,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.55)' }}>TUESDAY · ENTRY 47</div>
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none"/><path d="M7 4v3l2 2" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
        </div>
      </div>
      <div className="mo-journal" style={{ padding: '28px 28px 0' }}>
        <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>UNTITLED · 6:24 PM</div>
        <textarea value={text} onChange={e => setState({ journal: e.target.value })} spellCheck={false} placeholder="What's true tonight…" style={{ marginTop: 14 }} />
      </div>
      <div style={{ position: 'absolute', bottom: 130, left: 22, right: 22 }}>
        <div className="mo-glass" style={{ padding: 14, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 14, left: -6, width: 12, height: 12, borderRadius: 6, background: 'radial-gradient(circle, #fff 0%, #a78bfa 60%, transparent 100%)', filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.6))' }} />
          <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.85)' }}>MIRROR · GENTLY</div>
          <div style={{ marginTop: 6, fontFamily: 'Instrument Serif', fontSize: 16, lineHeight: 1.35, color: 'rgba(245,247,255,0.92)' }}>
            "Protecting" and "hiding" — would you tell them apart in your body, or do they feel the same?
          </div>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 66, left: 22, right: 22, height: 56, borderRadius: 28,
        background: 'linear-gradient(180deg, rgba(20,18,40,0.85), rgba(10,8,20,0.85))',
        border: '0.5px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px) saturate(160%)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px',
      }}>
        <div style={{ fontFamily: 'Geist', fontSize: 12, color: 'rgba(200,210,230,0.5)', paddingLeft: 12 }}>
          {(text.split(/\s+/).filter(Boolean).length)} words
        </div>
        <div className="mo-tap" onClick={() => go('reflection')} style={{
          height: 40, padding: '0 18px', borderRadius: 20,
          background: 'linear-gradient(180deg, rgba(167,139,250,0.95), rgba(111,123,255,0.95))',
          border: '0.5px solid rgba(255,255,255,0.35)',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45), 0 0 18px rgba(167,139,250,0.4)',
          fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: '#fff',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Reflect
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8M7 2l4 4-4 4" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
};

// ─── 10 reflection ───────────────────────────────────────────
M.Reflection = function({ go }) {
  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.55 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <StatusGap />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 22px' }}>
        <div className="mo-glass mo-tap" onClick={() => go('home')} style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="rgba(245,247,255,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.55)' }}>REFLECTION · 47</div>
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v8M3 6l4 4 4-4M1 13h12" stroke="rgba(245,247,255,0.85)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <div style={{ padding: '20px 28px 0' }}>
        <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>WHAT I'M HEARING</div>
        <h1 className="mo-serif" style={{ margin: '12px 0 0', fontSize: 30, lineHeight: 1.12, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em' }}>
          You went quiet to keep<br />the peace, and lost a little<br /><span style={{ fontStyle: 'italic' }}>of yourself in it.</span>
        </h1>
      </div>
      <div style={{ padding: '20px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { tag: 'EMOTION', t: 'Beneath the calm: a low, steady grief.', d: 'You named protection. The body sounded more like resignation.' },
          { tag: 'PATTERN', t: 'Third time this month: silence as kindness.', d: 'It works in the moment. It charges interest by morning.' },
          { tag: 'REFRAME', t: 'What if staying soft included staying honest?', d: 'Saying it might be the gentlest thing — for both of you.' },
        ].map((c, i) => (
          <div key={i} className="mo-glass" style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 65%)', filter: 'blur(6px)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: 'radial-gradient(circle, #fff 0%, #a78bfa 60%, transparent 100%)', boxShadow: '0 0 8px rgba(167,139,250,0.7)' }} />
              <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.85)' }}>{c.tag}</div>
            </div>
            <div className="mo-serif" style={{ marginTop: 10, fontSize: 18, lineHeight: 1.25, color: 'rgba(245,247,255,0.95)', letterSpacing: '-0.015em' }}>{c.t}</div>
            <div style={{ marginTop: 6, fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.5, color: 'rgba(220,225,240,0.6)', fontWeight: 300 }}>{c.d}</div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 62, left: 22, right: 22, display: 'flex', gap: 8 }}>
        <button className="mo-pill mo-tap" onClick={() => go('home')} style={{ flex: 1, height: 50, fontSize: 14 }}>Save</button>
        <button className="mo-pill primary mo-tap" onClick={() => go('voice')} style={{ flex: 1, height: 50, fontSize: 14 }}>Talk it through</button>
      </div>
    </div>
  );
};

window.MobileScreens = M;
