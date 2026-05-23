// MIRROROS — Desktop prototype screens.
// Each screen receives { go, state, setState } and fills the parent
// (absolute inset:0). Designed for 1440×900 canvas, scaled.

const D = {};

function MOLogoD({ size = 14, color = 'rgba(245,247,255,0.95)' }) {
  return (
    <svg width={size * 2.2} height={size} viewBox="0 0 22 10" fill="none">
      <circle cx="6.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="15.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="11" cy="5" r="1.4" fill={color} />
    </svg>
  );
}
function DotsD({ total, active }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{
          width: i === active ? 28 : 8, height: 8, borderRadius: 4,
          background: i === active ? 'rgba(245,247,255,0.85)' : 'rgba(245,247,255,0.18)',
          transition: 'width .3s ease',
        }} />
      ))}
    </div>
  );
}

// shared top brand bar for non-app onboarding screens
function TopBrandBar({ skipTo, go }) {
  return (
    <div style={{
      position: 'absolute', top: 36, left: 48, right: 48,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <MOLogoD size={14} color="rgba(245,247,255,0.78)" />
      {skipTo && (
        <span className="mo-tap" onClick={() => go(skipTo)} style={{
          fontFamily: 'Geist', fontSize: 12, letterSpacing: '0.22em',
          color: 'rgba(200,210,230,0.5)', textTransform: 'uppercase', cursor: 'pointer',
        }}>Skip</span>
      )}
    </div>
  );
}

// ─── 01 splash ───────────────────────────────────────────────
D.Splash = function({ go }) {
  React.useEffect(() => {
    const t = setTimeout(() => go('intro'), 2800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="mo-screen mo-tap" onClick={() => go('intro')}>
      <div className="mo-ambient" />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -55%)', width: 560, height: 560, opacity: 0.6,
      }}>
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="mo-grain" /><div className="mo-vignette" />
      <TopBrandBar />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 130, textAlign: 'center', padding: '0 64px',
      }}>
        <div className="mo-serif" style={{
          fontSize: 124, lineHeight: 1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.035em',
        }}>
          mirror<span style={{ fontStyle: 'italic', opacity: 0.85 }}>os</span>
        </div>
        <div style={{
          marginTop: 24, fontFamily: 'Geist', fontSize: 13, letterSpacing: '0.5em',
          color: 'rgba(200,210,230,0.55)', textTransform: 'uppercase',
        }}>
          An Operating System For The Self
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 11, color: 'rgba(200,210,230,0.32)', letterSpacing: '0.2em' }}>
          v 0.1 · CLICK ANYWHERE TO BEGIN
        </span>
      </div>
    </div>
  );
};

// ─── 02 intro ────────────────────────────────────────────────
D.Intro = function({ go }) {
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
      <TopBrandBar skipTo="account" go={go} />

      {/* Orb left */}
      <div style={{
        position: 'absolute', top: '50%', left: '28%', transform: 'translate(-50%, -50%)',
        width: 420, height: 420,
      }}>
        <div style={{
          position: 'absolute', inset: -60, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 60%)',
        }} />
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Text right */}
      <div style={{
        position: 'absolute', top: '50%', right: 100, transform: 'translateY(-50%)',
        maxWidth: 520,
      }}>
        <span className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>{p.eyebrow}</span>
        <h1 className="mo-serif" style={{
          margin: '24px 0 0', fontSize: 72, lineHeight: 1.02,
          color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.03em',
        }}>
          {p.title.map((line, i) => (
            <span key={i} style={{ display: 'block', fontStyle: i === p.title.length - 1 ? 'italic' : 'normal' }}>{line}</span>
          ))}
        </h1>
        <p style={{
          marginTop: 32, fontFamily: 'Geist', fontSize: 18, lineHeight: 1.55,
          color: 'rgba(220,225,240,0.7)', maxWidth: 460, fontWeight: 300,
        }}>{p.body}</p>
      </div>

      <div style={{
        position: 'absolute', bottom: 56, left: 48, right: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <DotsD total={pages.length} active={page} />
        <div style={{ display: 'flex', gap: 12 }}>
          {page > 0 && (
            <button className="mo-pill mo-tap" onClick={() => setPage(page - 1)} style={{ height: 52, padding: '0 28px' }}>← Back</button>
          )}
          <button className="mo-pill primary mo-tap" onClick={() => page < pages.length - 1 ? setPage(page + 1) : go('account')} style={{ height: 52, padding: '0 32px' }}>
            {page < pages.length - 1 ? 'Continue' : 'Begin'} →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── 03 account ──────────────────────────────────────────────
D.Account = function({ go }) {
  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.7 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <TopBrandBar />

      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 540, padding: '52px 56px', borderRadius: 28,
      }} className="mo-glass">
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 240, opacity: 0.4,
          background: 'radial-gradient(circle, rgba(167,139,250,0.7) 0%, transparent 60%)',
          filter: 'blur(20px)', pointerEvents: 'none',
        }} />
        <div className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>BEGIN</div>
        <h1 className="mo-serif" style={{
          margin: '16px 0 0', fontSize: 48, lineHeight: 1.05,
          color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
        }}>
          A space that's<br /><span style={{ fontStyle: 'italic' }}>only yours.</span>
        </h1>
        <p style={{
          marginTop: 16, fontFamily: 'Geist', fontSize: 15, lineHeight: 1.55,
          color: 'rgba(220,225,240,0.62)', fontWeight: 300,
        }}>
          Encrypted on-device. Nothing you share leaves this mirror without you.
        </p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="mo-pill primary mo-tap" onClick={() => go('intake')} style={{ width: '100%', height: 56 }}>
            <svg width="16" height="18" viewBox="0 0 16 18" fill="white" style={{ marginRight: 10 }}>
              <path d="M11.6 9.3c0-2.1 1.7-3.1 1.8-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.7-2.1.8-1.2 1.2-2.4 1.2-2.4-.1 0-2.3-.9-2.3-3.6zM9.5 3.1c.6-.7 1-1.7.9-2.7-.8 0-1.8.6-2.4 1.3-.5.6-1 1.6-.9 2.6.9.1 1.8-.5 2.4-1.2z"/>
            </svg>
            Continue with Apple
          </button>
          <button className="mo-pill mo-tap" onClick={() => go('intake')} style={{ width: '100%', height: 56 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ marginRight: 10 }}>
              <path d="M17.6 9.2c0-.6-.1-1.3-.2-1.9H9v3.6h4.8c-.2 1.1-.8 2-1.8 2.6v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5z" fill="#4285F4"/>
              <path d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.8-3.1.8-2.4 0-4.4-1.6-5.1-3.8H.9v2.3C2.4 15.9 5.5 18 9 18z" fill="#34A853"/>
              <path d="M3.9 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V4.9H.9C.3 6.1 0 7.5 0 9s.3 2.9.9 4.1l3-2.4z" fill="#FBBC05"/>
              <path d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.5-2.5C13.5.9 11.4 0 9 0 5.5 0 2.4 2.1.9 4.9l3 2.4C4.6 5.2 6.6 3.6 9 3.6z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button className="mo-pill mo-tap" onClick={() => go('intake')} style={{ width: '100%', height: 56 }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" style={{ marginRight: 10 }}>
              <rect x="1" y="1" width="16" height="12" rx="2" stroke="rgba(245,247,255,0.95)" strokeWidth="1.2"/>
              <path d="M1.5 2L9 8l7.5-6" stroke="rgba(245,247,255,0.95)" strokeWidth="1.2"/>
            </svg>
            Continue with Email
          </button>
        </div>

        <div style={{
          marginTop: 24, textAlign: 'center', fontFamily: 'Geist', fontSize: 12,
          color: 'rgba(200,210,230,0.4)',
        }}>
          By continuing you agree to our <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms</span> and <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy</span>.
        </div>
      </div>
    </div>
  );
};

// ─── 04 intake ───────────────────────────────────────────────
D.Intake = function({ go, state, setState }) {
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
      <TopBrandBar />

      <div style={{
        position: 'absolute', top: 36, right: 48,
        fontFamily: 'JetBrains Mono', fontSize: 12, letterSpacing: '0.22em',
        color: 'rgba(200,210,230,0.5)',
      }}>
        QUESTION {step + 1} / {questions.length}
      </div>

      <div style={{
        position: 'absolute', top: '32%', left: '50%', transform: 'translate(-50%, -50%)',
        textAlign: 'center', width: '100%', padding: '0 80px',
      }}>
        <span className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>{cur.eyebrow}</span>
        <h1 className="mo-serif" style={{
          margin: '20px 0 0', fontSize: 64, lineHeight: 1.05,
          color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
        }}>{cur.q}</h1>
        <p style={{
          marginTop: 16, fontFamily: 'Geist', fontSize: 15, lineHeight: 1.5,
          color: 'rgba(220,225,240,0.5)', fontWeight: 300,
        }}>Choose any that feel true. There is no wrong answer.</p>
      </div>

      <div style={{
        position: 'absolute', top: '60%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center',
        maxWidth: 800,
      }}>
        {cur.opts.map(opt => {
          const on = sel.has(opt);
          return (
            <div key={opt} className={`mo-glass mo-tap ${on ? 'selected' : ''}`} onClick={() => toggle(opt)} style={{
              padding: '16px 28px', borderRadius: 999,
              fontFamily: 'Geist', fontSize: 17, fontWeight: on ? 500 : 400,
              color: on ? 'rgba(255,255,255,1)' : 'rgba(245,247,255,0.78)',
              userSelect: 'none',
            }}>{opt}</div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', bottom: 56, left: 48, right: 48,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Geist', fontSize: 14, color: 'rgba(200,210,230,0.45)' }}>{sel.size} selected</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {step > 0 && (
            <button className="mo-pill mo-tap" onClick={() => setStep(step - 1)} style={{ height: 52, padding: '0 28px' }}>← Back</button>
          )}
          <button className="mo-pill primary mo-tap" onClick={() => step < questions.length - 1 ? setStep(step + 1) : go('goals')} style={{ height: 52, padding: '0 32px' }}>
            {step < questions.length - 1 ? 'Continue' : 'Toward goals'} →
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── 05 goals ────────────────────────────────────────────────
D.Goals = function({ go, state, setState }) {
  const goals = [
    { t: 'Find peace', d: 'Quiet the noise inside.' },
    { t: 'Stop overthinking', d: 'Loosen the loop.' },
    { t: 'Heal emotionally', d: 'Tend to what hurts.' },
    { t: 'Build confidence', d: 'Stand inside myself.' },
    { t: 'Become disciplined', d: 'Keep promises to me.' },
    { t: 'Understand myself', d: 'See clearly. Without flinching.' },
  ];
  const sel = state.goals || new Set(['Find peace', 'Understand myself']);
  const toggle = (t) => { const n = new Set(sel); n.has(t) ? n.delete(t) : n.add(t); setState({ goals: n }); };
  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.65 }} /><div className="mo-grain" /><div className="mo-vignette" />
      <TopBrandBar />

      <div style={{ position: 'absolute', top: 130, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>YOUR NORTH STARS</span>
        <h1 className="mo-serif" style={{
          margin: '16px 0 0', fontSize: 56, lineHeight: 1.05,
          color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
        }}>
          What do you want to <span style={{ fontStyle: 'italic' }}>move toward?</span>
        </h1>
      </div>

      <div style={{
        position: 'absolute', top: 340, left: '50%', transform: 'translateX(-50%)',
        display: 'grid', gridTemplateColumns: 'repeat(3, 240px)', gap: 18, width: 'fit-content',
      }}>
        {goals.map(g => {
          const on = sel.has(g.t);
          return (
            <div key={g.t} className={`mo-glass mo-tap ${on ? 'selected' : ''}`} onClick={() => toggle(g.t)} style={{ padding: 22, height: 180, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 18, right: 18, width: 24, height: 24, borderRadius: '50%',
                background: on ? 'radial-gradient(circle, #fff 0%, #a78bfa 50%, transparent 100%)' : 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)',
                filter: on ? 'drop-shadow(0 0 10px rgba(167,139,250,0.7))' : 'none',
              }} />
              <div className="mo-serif" style={{ marginTop: 56, fontSize: 26, lineHeight: 1.05, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em' }}>{g.t}</div>
              <div style={{ marginTop: 8, fontFamily: 'Geist', fontSize: 13, lineHeight: 1.45, color: 'rgba(220,225,240,0.55)', fontWeight: 300 }}>{g.d}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 56, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 12 }}>
        <button className="mo-pill mo-tap" onClick={() => go('intake')} style={{ height: 52, padding: '0 28px' }}>← Back</button>
        <button className="mo-pill primary mo-tap" onClick={() => go('voice-perm')} style={{ height: 52, padding: '0 36px' }}>Continue →</button>
      </div>
    </div>
  );
};

// ─── 06 voice perm ───────────────────────────────────────────
D.VoicePerm = function({ go }) {
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" /><div className="mo-grain" /><div className="mo-vignette" />
      <TopBrandBar />

      {/* big orb left */}
      <div style={{
        position: 'absolute', top: '50%', left: '32%', transform: 'translate(-50%, -50%)',
        width: 460, height: 460,
      }}>
        <div style={{
          position: 'absolute', inset: -80, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 60%)',
          animation: 'mo-orb-breathe 5s ease-in-out infinite alternate',
        }} />
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
        <svg width="68" height="92" viewBox="0 0 32 44" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <rect x="10" y="2" width="12" height="22" rx="6" fill="rgba(255,255,255,0.95)"/>
          <path d="M4 18c0 7 5 12 12 12s12-5 12-12M16 30v8M10 42h12" stroke="rgba(255,255,255,0.95)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      <div style={{
        position: 'absolute', top: '50%', right: 100, transform: 'translateY(-50%)', maxWidth: 540,
      }}>
        <span className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>YOUR VOICE</span>
        <h1 className="mo-serif" style={{
          margin: '24px 0 0', fontSize: 60, lineHeight: 1.04,
          color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.03em',
        }}>
          Sometimes the truest words<br /><span style={{ fontStyle: 'italic' }}>come out loud.</span>
        </h1>
        <p style={{
          marginTop: 28, fontFamily: 'Geist', fontSize: 16, lineHeight: 1.6,
          color: 'rgba(220,225,240,0.7)', fontWeight: 300, maxWidth: 460,
        }}>
          Talk to your mirror as you would to a patient, brilliant friend. Audio stays encrypted on-device. You can pause, delete, or leave anytime.
        </p>
        <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
          <button className="mo-pill primary mo-tap" onClick={() => go('home')} style={{ height: 56, padding: '0 32px' }}>Enable microphone</button>
          <button className="mo-tap" onClick={() => go('home')} style={{
            background: 'transparent', border: 0, color: 'rgba(200,210,230,0.6)',
            fontFamily: 'Geist', fontSize: 15, padding: '0 16px', cursor: 'pointer',
          }}>I'll write instead</button>
        </div>
      </div>
    </div>
  );
};

// ─── desktop app chrome: sidebar + topbar ────────────────────
function DesktopAppShell({ go, active, children }) {
  const items = [
    { id: 'home',     l: 'Today',     ic: <circle cx="8" cy="8" r="6"/> },
    { id: 'journal',  l: 'Journal',   ic: <path d="M3 2h8a2 2 0 012 2v9l-3-2-3 2-3-2-3 2V4a2 2 0 012-2z"/> },
    { id: 'voice',    l: 'Voice',     ic: <><rect x="6" y="1" width="4" height="8" rx="2"/><path d="M3 8c0 3 2 5 5 5s5-2 5-5M8 13v2"/></> },
    { id: 'reflection', l: 'Reflections', ic: <><path d="M2 4l6 4 6-4M2 4v8l6 4 6-4V4"/></> },
    { id: 'patterns', l: 'Patterns',  ic: <path d="M1 14c2-2 3-8 5-8s3 4 5 4 3-6 4-6"/>, disabled: true },
    { id: 'you',      l: 'You',       ic: <><circle cx="8" cy="6" r="3"/><path d="M2 15c1-3 3-5 6-5s5 2 6 5"/></>, disabled: true },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.45 }} /><div className="mo-grain" /><div className="mo-vignette" />

      {/* Left rail */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: 220,
        background: 'linear-gradient(180deg, rgba(15,12,30,0.7), rgba(8,6,18,0.7))',
        borderRight: '0.5px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
        padding: '36px 18px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '0 8px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <MOLogoD size={12} />
          <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 500, letterSpacing: '0.28em', color: 'rgba(245,247,255,0.95)' }}>
            MIRROROS
          </span>
        </div>

        <div className="mo-mono" style={{ padding: '8px 12px 8px', fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.4)' }}>NAVIGATE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map(it => {
            const on = it.id === active;
            return (
              <div key={it.id} className="mo-tap" onClick={() => !it.disabled && go(it.id === 'voice' ? 'voice' : it.id === 'reflection' ? 'reflection' : it.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 10,
                background: on ? 'linear-gradient(180deg, rgba(167,139,250,0.18), rgba(111,123,255,0.08))' : 'transparent',
                border: on ? '0.5px solid rgba(167,139,250,0.35)' : '0.5px solid transparent',
                color: it.disabled ? 'rgba(200,210,230,0.3)' : on ? 'rgba(245,247,255,0.98)' : 'rgba(220,225,240,0.7)',
                fontFamily: 'Geist', fontSize: 13.5, fontWeight: on ? 500 : 400,
                cursor: it.disabled ? 'not-allowed' : 'pointer',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                  stroke={on ? 'rgba(199,189,255,1)' : 'rgba(220,225,240,0.7)'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {it.ic}
                </svg>
                <span style={{ flex: 1 }}>{it.l}</span>
                {it.disabled && <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(200,210,230,0.35)' }}>SOON</span>}
              </div>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* growth focus mini */}
        <div className="mo-glass" style={{ padding: 14, borderRadius: 16 }}>
          <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.85)' }}>FOCUS · WK 03</div>
          <div className="mo-serif" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.2, color: 'rgba(245,247,255,0.95)' }}>
            Letting things be unfinished.
          </div>
          <svg width="100%" height="22" viewBox="0 0 100 22" style={{ marginTop: 8 }}>
            <path d="M1 18 C 14 14, 20 16, 28 10 S 44 4, 54 8 S 76 14, 99 4" fill="none" stroke="rgba(167,139,250,0.95)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>

        <div style={{ marginTop: 18, padding: '0 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="mo-glass" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Instrument Serif', fontSize: 14, color: 'rgba(245,247,255,0.95)' }}>S</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Geist', fontSize: 12.5, fontWeight: 500, color: 'rgba(245,247,255,0.95)' }}>Sasha M.</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, color: 'rgba(200,210,230,0.45)', letterSpacing: '0.1em' }}>47 ENTRIES</div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 220, right: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

// ─── 07 home ─────────────────────────────────────────────────
D.Home = function({ go }) {
  return (
    <DesktopAppShell go={go} active="home">
      <div style={{ padding: '36px 56px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.28em', color: 'rgba(200,210,230,0.55)' }}>TUESDAY · 6:24 PM</div>
            <div className="mo-serif" style={{
              marginTop: 8, fontSize: 48, lineHeight: 1.05,
              color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
            }}>
              Evening, <span style={{ fontStyle: 'italic' }}>Sasha.</span>
            </div>
          </div>
          <div className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(200,210,230,0.4)' }}>
            ⌘ K · COMMAND PALETTE
          </div>
        </div>

        {/* Hero check-in row */}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, flex: 1, minHeight: 0 }}>

          {/* Big check-in */}
          <div className="mo-glass" style={{ padding: 36, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, opacity: 0.7,
              background: 'radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 60%)', filter: 'blur(16px)' }} />
            <div className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>CHECK · IN</div>
            <div className="mo-serif" style={{
              marginTop: 14, fontSize: 44, lineHeight: 1.08,
              color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
            }}>
              What's on your mind<br /><span style={{ fontStyle: 'italic' }}>tonight?</span>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="mo-pill primary mo-tap" onClick={() => go('voice')} style={{ height: 54, padding: '0 24px' }}>
                <svg width="13" height="16" viewBox="0 0 11 14" style={{ marginRight: 10 }}>
                  <rect x="3" y="1" width="5" height="9" rx="2.5" fill="white"/>
                  <path d="M1 7c0 2.5 1.8 4.5 4.5 4.5S10 9.5 10 7M5.5 11.5V13M3.5 13h4" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                </svg>
                Speak with Mirror
              </button>
              <button className="mo-pill mo-tap" onClick={() => go('journal')} style={{ height: 54, padding: '0 24px' }}>
                <svg width="14" height="14" viewBox="0 0 13 13" style={{ marginRight: 10 }} fill="none">
                  <path d="M9 1l3 3-8 8H1V9l8-8z" stroke="rgba(245,247,255,0.9)" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                Write an entry
              </button>
              <div style={{ flex: 1 }} />
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Geist',
                fontSize: 12, color: 'rgba(200,210,230,0.55)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
                Mirror is online
              </div>
            </div>
          </div>

          {/* Side stack: emotional trend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
            <div className="mo-glass" style={{ padding: 22, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>EMOTIONAL TREND · 7D</div>
                <span style={{ fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.4)' }}>↑ softer</span>
              </div>
              <div className="mo-serif" style={{ marginTop: 8, fontSize: 22, lineHeight: 1.15, color: 'rgba(245,247,255,0.95)' }}>
                <span style={{ fontStyle: 'italic' }}>Tender</span> · Quiet · Hopeful
              </div>
              <svg width="100%" height="80" viewBox="0 0 280 80" style={{ marginTop: 14 }}>
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#a78bfa" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#a78bfa" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0 60 C 30 50, 50 65, 80 40 S 130 20, 160 35 S 210 55, 280 18 L 280 80 L 0 80 Z" fill="url(#trendFill)"/>
                <path d="M0 60 C 30 50, 50 65, 80 40 S 130 20, 160 35 S 210 55, 280 18" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
                {/* days */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <text key={i} x={i * 46 + 8} y="78" fontSize="9" fill="rgba(200,210,230,0.4)" fontFamily="JetBrains Mono">
                    {['M','T','W','T','F','S','S'][i]}
                  </text>
                ))}
              </svg>
            </div>

            <div className="mo-glass" style={{ padding: 22 }}>
              <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>GROWTH FOCUS · WK 03</div>
              <div className="mo-serif" style={{ marginTop: 8, fontSize: 22, lineHeight: 1.15, color: 'rgba(245,247,255,0.95)' }}>
                Letting things be <span style={{ fontStyle: 'italic' }}>unfinished.</span>
              </div>
              <div style={{ marginTop: 10, fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.5, color: 'rgba(220,225,240,0.6)' }}>
                A small daily prompt to soften your relationship with completion.
              </div>
            </div>
          </div>
        </div>

        {/* Recent insights */}
        <div style={{ marginTop: 22, marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <div className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.55)' }}>RECENT INSIGHTS</div>
            <span className="mo-tap" style={{ fontFamily: 'Geist', fontSize: 12, color: 'rgba(167,139,250,0.85)', cursor: 'pointer' }}>See all 47 →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { tag: 'PATTERN', t: 'You soften when you speak about your sister.', d: '2 days ago' },
              { tag: 'SHIFT', t: 'Sleep correlates with how forgiving your inner voice gets.', d: '4 days ago' },
              { tag: 'NOTICE', t: 'You haven\'t used the word "should" in eleven days.', d: '5 days ago' },
            ].map((c, i) => (
              <div key={i} className="mo-glass mo-tap" onClick={() => go('reflection')} style={{ padding: 18 }}>
                <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{c.tag}</div>
                <div className="mo-serif" style={{ marginTop: 8, fontSize: 17, lineHeight: 1.25, color: 'rgba(245,247,255,0.95)' }}>{c.t}</div>
                <div style={{ marginTop: 8, fontFamily: 'Geist', fontSize: 11.5, color: 'rgba(200,210,230,0.45)' }}>{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopAppShell>
  );
};

// ─── 08 voice chat ───────────────────────────────────────────
D.VoiceChat = function({ go }) {
  const [secs, setSecs] = React.useState(272);
  React.useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(secs / 60), s = secs % 60;

  const transcript = [
    { who: 'mirror', t: 'When you said you were "fine" earlier — what did you mean by fine?' },
    { who: 'you',    t: 'Like... functional. Not breaking.' },
    { who: 'mirror', t: 'Functional is a word people use about machines. Did you feel like a machine today?' },
    { who: 'you',    t: 'A little. I just kept moving. I didn\'t want to feel guilty for stopping.' },
    { who: 'mirror', t: 'Take your time. I noticed you paused on the word guilty.', live: true },
  ];

  return (
    <DesktopAppShell go={go} active="voice">
      <div style={{ position: 'relative', height: '100%' }}>
        <div className="mo-ambient deep" style={{ position: 'absolute' }} />
        <div className="mo-grain" /><div className="mo-vignette" />

        {/* top chrome */}
        <div style={{
          position: 'absolute', top: 24, left: 32, right: 32,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div className="mo-glass mo-tap" onClick={() => go('home')} style={{
            height: 38, padding: '0 16px', borderRadius: 19, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="12" height="12" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="rgba(245,247,255,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily: 'Geist', fontSize: 13, color: 'rgba(245,247,255,0.85)' }}>End session</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>LIVE · MIRROR</div>
            <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 14, fontWeight: 500, color: 'rgba(245,247,255,0.95)' }}>
              {String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="mo-glass mo-tap" style={{ height: 38, padding: '0 14px', borderRadius: 19, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: '#ff5a6e', boxShadow: '0 0 6px #ff5a6e' }} />
              <span style={{ fontFamily: 'Geist', fontSize: 12, color: 'rgba(245,247,255,0.85)' }}>Recording</span>
            </div>
          </div>
        </div>

        {/* huge orb center-left */}
        <div style={{
          position: 'absolute', top: '46%', left: '36%', transform: 'translate(-50%, -50%)',
          width: 380, height: 380,
        }}>
          <div style={{
            position: 'absolute', inset: -80, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 60%)',
            animation: 'mo-orb-breathe 3.4s ease-in-out infinite alternate',
          }} />
          <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* mirror's live word */}
        <div style={{
          position: 'absolute', top: '78%', left: '36%', transform: 'translate(-50%, -50%)',
          textAlign: 'center', width: 460,
        }}>
          <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(167,139,250,0.85)' }}>MIRROR · LISTENING</div>
          <div className="mo-serif" style={{
            marginTop: 12, fontSize: 24, lineHeight: 1.3,
            color: 'rgba(245,247,255,0.92)', letterSpacing: '-0.015em', textWrap: 'pretty',
          }}>
            "I noticed you paused on the word <span style={{ fontStyle: 'italic', color: 'rgba(199,189,255,1)' }}>guilty</span>."
          </div>
        </div>

        {/* Transcript right rail */}
        <div style={{
          position: 'absolute', top: 80, right: 32, bottom: 130,
          width: 380, display: 'flex', flexDirection: 'column',
        }}>
          <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.55)', marginBottom: 14 }}>
            LIVE TRANSCRIPT
          </div>
          <div style={{
            flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, paddingRight: 4,
          }}>
            {transcript.map((t, i) => (
              <div key={i} className={t.who === 'mirror' ? 'mo-glass' : ''} style={{
                padding: t.who === 'mirror' ? 14 : '4px 4px',
                opacity: t.live ? 1 : 0.85,
                border: t.live ? '0.5px solid rgba(167,139,250,0.4)' : undefined,
                boxShadow: t.live ? '0 0 24px rgba(167,139,250,0.25)' : undefined,
              }}>
                <div className="mo-mono" style={{
                  fontSize: 9.5, letterSpacing: '0.28em',
                  color: t.who === 'mirror' ? 'rgba(167,139,250,0.85)' : 'rgba(200,210,230,0.5)',
                }}>
                  {t.who === 'mirror' ? 'MIRROR' : 'YOU'}
                </div>
                <div style={{
                  marginTop: 6,
                  fontFamily: t.who === 'mirror' ? 'Instrument Serif' : 'Geist',
                  fontSize: t.who === 'mirror' ? 16.5 : 14.5,
                  lineHeight: 1.45, color: 'rgba(245,247,255,0.92)',
                  fontStyle: t.who === 'mirror' ? 'normal' : 'normal',
                  fontWeight: 300,
                }}>{t.t}</div>
              </div>
            ))}
            {/* live waveform pseudo-message */}
            <div className="mo-wave" style={{ height: 32 }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <i key={i} style={{ animationDelay: `${(i * 0.05) % 1.4}s` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div style={{
          position: 'absolute', bottom: 28, left: '36%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 18,
        }}>
          <div className="mo-glass mo-tap" style={{ width: 56, height: 56, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Mute">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="6" y="2" width="6" height="9" rx="3" stroke="rgba(245,247,255,0.9)" strokeWidth="1.4"/>
              <path d="M3 9c0 3 2.5 5 6 5s6-2 6-5M9 14v3" stroke="rgba(245,247,255,0.9)" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
              <path d="M2 2l14 14" stroke="rgba(255,90,110,0.9)" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="mo-tap" onClick={() => go('reflection')} style={{
            width: 96, height: 96, borderRadius: 48,
            background: 'linear-gradient(180deg, rgba(255,90,110,0.95), rgba(220,40,70,0.95))',
            border: '0.5px solid rgba(255,255,255,0.4)',
            boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.5), 0 0 40px rgba(255,90,110,0.6), 0 12px 36px rgba(180,30,50,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }} title="End session">
            <div style={{ width: 28, height: 28, borderRadius: 5, background: 'rgba(255,255,255,0.95)' }} />
          </div>
          <div className="mo-glass mo-tap" style={{ width: 56, height: 56, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Switch to writing">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 2l5 5-9 9H2v-5l9-9z" stroke="rgba(245,247,255,0.9)" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </DesktopAppShell>
  );
};

// ─── 09 journal ──────────────────────────────────────────────
D.Journal = function({ go, state, setState }) {
  const text = state.journal ?? 'I keep coming back to that conversation. The one where I went quiet and he kept talking. I don\'t know if I was protecting him or hiding from myself.';
  return (
    <DesktopAppShell go={go} active="journal">
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', height: '100%' }}>
        {/* writing area */}
        <div style={{ padding: '52px 56px 32px', overflowY: 'auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>TUESDAY · ENTRY 47 · 6:24 PM</div>
              <div className="mo-serif" style={{ marginTop: 8, fontSize: 32, lineHeight: 1.1, color: 'rgba(245,247,255,0.95)', letterSpacing: '-0.02em' }}>
                <span style={{ opacity: 0.55 }}>Untitled</span>
              </div>
            </div>
            <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(200,210,230,0.4)' }}>
              {text.split(/\s+/).filter(Boolean).length} WORDS · AUTOSAVED
            </div>
          </div>
          <textarea
            value={text}
            onChange={e => setState({ journal: e.target.value })}
            spellCheck={false}
            placeholder="What's true tonight…"
            style={{
              marginTop: 36, width: '100%', minHeight: 480, border: 0, outline: 0, resize: 'none',
              background: 'transparent', color: 'rgba(245,247,255,0.95)',
              fontFamily: 'Instrument Serif, serif',
              fontSize: 30, lineHeight: 1.55, letterSpacing: '-0.01em',
            }}
          />
        </div>

        {/* mirror panel */}
        <div style={{
          position: 'relative',
          borderLeft: '0.5px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(180deg, rgba(20,15,40,0.4), rgba(8,6,18,0.4))',
          padding: '52px 36px 32px', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="mo-orb" style={{ width: 28, height: 28 }} />
            <div>
              <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>MIRROR</div>
              <div style={{ fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.5)' }}>Listening softly</div>
            </div>
          </div>

          <div className="mo-glass" style={{ padding: 18, position: 'relative' }}>
            <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.85)' }}>GENTLY</div>
            <div style={{ marginTop: 8, fontFamily: 'Instrument Serif', fontSize: 18, lineHeight: 1.4, color: 'rgba(245,247,255,0.92)' }}>
              "Protecting" and "hiding" — would you tell them apart in your body, or do they feel the same?
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <span className="mo-tap" style={{ fontFamily: 'Geist', fontSize: 12, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'rgba(245,247,255,0.85)', border: '0.5px solid rgba(255,255,255,0.1)' }}>Sit with it</span>
              <span className="mo-tap" style={{ fontFamily: 'Geist', fontSize: 12, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: 'rgba(245,247,255,0.85)', border: '0.5px solid rgba(255,255,255,0.1)' }}>Tell me more</span>
            </div>
          </div>

          <div>
            <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.55)' }}>WORDS YOU REPEAT</div>
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { w: 'quiet', n: 11 }, { w: 'fine', n: 9 }, { w: 'should', n: 7 },
                { w: 'tired', n: 6 }, { w: 'small', n: 4 },
              ].map(({ w, n }) => (
                <span key={w} style={{
                  fontFamily: 'Geist', fontSize: 12,
                  padding: '5px 10px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.05)',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  color: 'rgba(245,247,255,0.78)',
                }}>{w} <span style={{ color: 'rgba(167,139,250,0.8)' }}>· {n}</span></span>
              ))}
            </div>
          </div>

          <div>
            <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.55)' }}>SOFT PROMPTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {[
                'What did the silence cost you?',
                'Who taught you that quiet keeps the peace?',
                'If your body could speak in his place — what would it say?',
              ].map((p, i) => (
                <div key={i} className="mo-tap" style={{
                  padding: '12px 14px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.03)',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  fontFamily: 'Instrument Serif', fontSize: 15.5, lineHeight: 1.35,
                  color: 'rgba(220,225,240,0.85)',
                }}>{p}</div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="mo-pill mo-tap" onClick={() => go('voice')} style={{ flex: 1, height: 50, fontSize: 13.5 }}>
              <svg width="11" height="14" viewBox="0 0 11 14" style={{ marginRight: 8 }}>
                <rect x="3" y="1" width="5" height="9" rx="2.5" fill="rgba(245,247,255,0.9)"/>
                <path d="M1 7c0 2.5 1.8 4.5 4.5 4.5S10 9.5 10 7M5.5 11.5V13M3.5 13h4" stroke="rgba(245,247,255,0.9)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              Speak instead
            </button>
            <button className="mo-pill primary mo-tap" onClick={() => go('reflection')} style={{ flex: 1, height: 50, fontSize: 13.5 }}>
              Reflect →
            </button>
          </div>
        </div>
      </div>
    </DesktopAppShell>
  );
};

// ─── 10 reflection ───────────────────────────────────────────
D.Reflection = function({ go }) {
  return (
    <DesktopAppShell go={go} active="reflection">
      <div style={{ padding: '40px 56px 40px', height: '100%', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="mo-mono" style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>WHAT I'M HEARING</div>
            <h1 className="mo-serif" style={{ margin: '14px 0 0', fontSize: 56, lineHeight: 1.05, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.03em', maxWidth: 900 }}>
              You went quiet to keep the peace,<br />and lost a little <span style={{ fontStyle: 'italic' }}>of yourself in it.</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="mo-pill mo-tap" style={{ height: 44, padding: '0 18px', fontSize: 13 }}>
              <svg width="12" height="12" viewBox="0 0 14 14" style={{ marginRight: 6 }}>
                <path d="M7 1v8M3 6l4 4 4-4M1 13h12" stroke="rgba(245,247,255,0.85)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export
            </button>
            <button className="mo-pill mo-tap" style={{ height: 44, padding: '0 18px', fontSize: 13 }}>Save</button>
            <button className="mo-pill primary mo-tap" onClick={() => go('voice')} style={{ height: 44, padding: '0 18px', fontSize: 13 }}>Talk it through →</button>
          </div>
        </div>

        {/* Three insight cards */}
        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
            { tag: 'EMOTION', t: 'Beneath the calm: a low, steady grief.', d: 'You named protection. The body sounded more like resignation.', meter: 0.62, color: '#a78bfa' },
            { tag: 'PATTERN', t: 'Third time this month: silence as kindness.', d: 'It works in the moment. It charges interest by morning.', meter: 0.48, color: '#6f7bff' },
            { tag: 'REFRAME', t: 'What if staying soft included staying honest?', d: 'Saying it might be the gentlest thing — for both of you.', meter: 0.78, color: '#7dd9ff' },
          ].map((c, i) => (
            <div key={i} className="mo-glass" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, background: `radial-gradient(circle, ${c.color}55 0%, transparent 65%)`, filter: 'blur(10px)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: `radial-gradient(circle, #fff 0%, ${c.color} 60%, transparent 100%)`, boxShadow: `0 0 10px ${c.color}` }} />
                <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{c.tag}</div>
              </div>
              <div className="mo-serif" style={{ marginTop: 14, fontSize: 24, lineHeight: 1.2, color: 'rgba(245,247,255,0.97)', letterSpacing: '-0.02em' }}>{c.t}</div>
              <div style={{ marginTop: 10, fontFamily: 'Geist', fontSize: 13.5, lineHeight: 1.55, color: 'rgba(220,225,240,0.6)', fontWeight: 300 }}>{c.d}</div>

              {/* confidence meter */}
              <div style={{ marginTop: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 9.5, color: 'rgba(200,210,230,0.5)', letterSpacing: '0.15em', marginBottom: 6 }}>
                  <span>CONFIDENCE</span>
                  <span>{Math.round(c.meter * 100)}%</span>
                </div>
                <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${c.meter * 100}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}aa)`, boxShadow: `0 0 8px ${c.color}80` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pattern timeline */}
        <div className="mo-glass" style={{ marginTop: 22, padding: 28, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>PATTERN · "SILENCE AS KINDNESS"</div>
              <div className="mo-serif" style={{ marginTop: 8, fontSize: 22, color: 'rgba(245,247,255,0.95)', letterSpacing: '-0.015em' }}>
                Three instances across <span style={{ fontStyle: 'italic' }}>thirty-one days.</span>
              </div>
            </div>
            <span style={{ fontFamily: 'Geist', fontSize: 12, color: 'rgba(200,210,230,0.45)' }}>Hover a dot to revisit ↗</span>
          </div>
          <div style={{ marginTop: 22, position: 'relative', height: 60 }}>
            <div style={{ position: 'absolute', top: 28, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            {[
              { x: '8%',  d: 'Apr 21', text: 'Stayed quiet at dinner.' },
              { x: '48%', d: 'May 09', text: 'Didn\'t correct him.' },
              { x: '92%', d: 'May 20', text: 'Tonight\'s conversation.' },
            ].map((p, i) => (
              <div key={i} style={{ position: 'absolute', top: 0, left: p.x, transform: 'translateX(-50%)', textAlign: 'center' }}>
                <div style={{
                  margin: '0 auto', width: 14, height: 14, borderRadius: 7, marginTop: 21,
                  background: 'radial-gradient(circle, #fff 0%, #a78bfa 60%, transparent 100%)',
                  boxShadow: '0 0 14px rgba(167,139,250,0.8)',
                }} />
                <div className="mo-mono" style={{ marginTop: 10, fontSize: 9.5, color: 'rgba(200,210,230,0.55)', letterSpacing: '0.15em' }}>{p.d}</div>
                <div style={{ marginTop: 4, fontFamily: 'Instrument Serif', fontSize: 13, color: 'rgba(245,247,255,0.85)', whiteSpace: 'nowrap' }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DesktopAppShell>
  );
};

window.DesktopScreens = D;
