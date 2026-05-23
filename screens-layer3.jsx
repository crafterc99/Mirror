// MIRROROS — Layer III screens
// Personalization · Voice · Companion · Trust · Premium · Sessions · Search · Reminders · Voice Call
// Each component returns JSX that fills its parent rect.
// Designed to live inside <IOSDevice dark>.

// ─────────────────────────────────────────────────────────────
// Shared atoms (mirror those in screens.jsx / screens-layer2.jsx
// so this file can stand alone).
// ─────────────────────────────────────────────────────────────
function L3Logo({ size = 14, color = 'rgba(245,247,255,0.95)' }) {
  return (
    <svg width={size * 2.2} height={size} viewBox="0 0 22 10" fill="none" style={{ display: 'block' }}>
      <circle cx="6.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="15.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="11" cy="5" r="1.4" fill={color} />
    </svg>
  );
}
function L3StatusGap() { return <div style={{ height: 62 }} />; }

function L3NavBar({ title, sub, onBack = true, right = null }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 22px',
    }}>
      {onBack ? (
        <div className="mo-glass mo-tap" style={{
          width: 36, height: 36, borderRadius: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M9 1L3 7l6 6" stroke="rgba(245,247,255,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : <L3Logo size={11} color="rgba(245,247,255,0.7)" />}
      <div style={{ textAlign: 'center' }}>
        <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{sub}</div>
        <div style={{ marginTop: 3, fontFamily: 'Geist', fontSize: 12.5, fontWeight: 500, color: 'rgba(245,247,255,0.92)' }}>{title}</div>
      </div>
      <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {right}
      </div>
    </div>
  );
}

function L3BottomNav({ active = 'you' }) {
  const tabs = [
    { id: 'home',     l: 'Home' },
    { id: 'journal',  l: 'Journal' },
    { id: 'insights', l: 'Insights' },
    { id: 'you',      l: 'You' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 22, left: 18, right: 18, height: 64, borderRadius: 32,
      background: 'linear-gradient(180deg, rgba(20,18,40,0.85), rgba(10,8,20,0.85))',
      border: '0.5px solid rgba(255,255,255,0.08)',
      backdropFilter: 'blur(16px) saturate(160%)',
      boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', padding: '0 14px', gap: 4,
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <div key={t.id} className="mo-tap" style={{
            flex: 1, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 22, fontFamily: 'Geist', fontSize: 12, fontWeight: 500,
            color: on ? 'rgba(245,247,255,0.98)' : 'rgba(200,210,230,0.5)',
            background: on ? 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))' : 'transparent',
            border: on ? '0.5px solid rgba(255,255,255,0.12)' : '0.5px solid transparent',
          }}>{t.l}</div>
        );
      })}
    </div>
  );
}

function L3Eyebrow({ children, color = 'rgba(167,139,250,0.85)' }) {
  return (
    <div className="mo-mono" style={{
      fontSize: 10, letterSpacing: '0.3em', color, textTransform: 'uppercase',
    }}>{children}</div>
  );
}

function L3Headline({ children, size = 32, style = {} }) {
  return (
    <h1 className="mo-serif" style={{
      margin: '14px 0 0', fontSize: size, lineHeight: 1.08,
      color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
      textWrap: 'pretty', ...style,
    }}>{children}</h1>
  );
}

// Elegant slider used across personality + voice settings.
function L3Slider({ value, leftLabel, rightLabel, marks = [], accent = '#a78bfa', compact = false }) {
  return (
    <div>
      {(leftLabel || rightLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between',
          fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.2em',
          color: 'rgba(200,210,230,0.5)', marginBottom: compact ? 6 : 10 }}>
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
      <div style={{ position: 'relative', height: 8 }}>
        <div style={{ position: 'absolute', inset: '3px 0', borderRadius: 2,
          background: 'rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 0.5px 0 rgba(0,0,0,0.4)' }} />
        <div style={{ position: 'absolute', left: 0, top: 3, height: 2, width: `${value * 100}%`,
          borderRadius: 2,
          background: `linear-gradient(90deg, #cfd6ff, ${accent})`,
          boxShadow: `0 0 12px ${accent}99`,
        }} />
        {marks.map((m, i) => (
          <span key={i} style={{ position: 'absolute', top: 1, left: `${m * 100}%`,
            transform: 'translateX(-50%)', width: 1, height: 6,
            background: 'rgba(255,255,255,0.18)' }} />
        ))}
        <div style={{ position: 'absolute', left: `${value * 100}%`, top: -5,
          transform: 'translateX(-50%)', width: 18, height: 18, borderRadius: 9,
          background: 'radial-gradient(circle at 30% 30%, #fff 0%, #cfd6ff 35%, #a78bfa 80%)',
          boxShadow: `0 0 14px ${accent}, 0 4px 10px rgba(0,0,0,0.45), inset 0 0.5px 0 rgba(255,255,255,0.55)`,
          border: '0.5px solid rgba(255,255,255,0.35)',
        }} />
      </div>
    </div>
  );
}

// Static waveform — used as voice signature visualizations
function L3WaveSignature({ seed = 1, height = 36, color = '#a78bfa', count = 38, opacity = 0.85 }) {
  const bars = Array.from({ length: count }).map((_, i) => {
    // deterministic pseudo-random
    const v = Math.abs(Math.sin((i + 1) * seed * 0.93) * Math.cos((i + 3) * seed * 0.41));
    return Math.max(0.16, v);
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height }}>
      {bars.map((b, i) => (
        <span key={i} style={{
          flex: 1, height: `${b * 100}%`, borderRadius: 1.5,
          background: `linear-gradient(180deg, #cfd6ff, ${color})`,
          opacity, boxShadow: `0 0 4px ${color}55`,
        }} />
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 21 · AI Personality Settings
// ═════════════════════════════════════════════════════════════
function L3_Personality() {
  const sliders = [
    { name: 'Tone',         l: 'WARM',     r: 'CLEAR',        v: 0.36, accent: '#a78bfa' },
    { name: 'Reflection',   l: 'LIGHT',    r: 'PROFOUND',     v: 0.78, accent: '#818cf8' },
    { name: 'Philosophy',   l: 'GROUNDED', r: 'EXISTENTIAL',  v: 0.52, accent: '#67e8f9' },
    { name: 'Spirituality', l: 'SECULAR',  r: 'CONTEMPLATIVE',v: 0.45, accent: '#fcd34d' },
    { name: 'Guidance',     l: 'GENTLE',   r: 'DIRECT',       v: 0.30, accent: '#fda4af' },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.55 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="PERSONALITY" title="How it speaks" right={
        <div className="mo-tap" style={{ fontFamily: 'Geist', fontSize: 11.5, color: 'rgba(167,139,250,0.9)' }}>Save</div>
      } />

      <div style={{ padding: '10px 26px 0' }}>
        <L3Eyebrow>SHAPE THE VOICE</L3Eyebrow>
        <L3Headline size={24} style={{ marginTop: 10 }}>
          Tune the mirror to your<br /><span style={{ fontStyle: 'italic' }}>way of listening.</span>
        </L3Headline>
      </div>

      {/* live preview card — compact */}
      <div style={{ padding: '14px 18px 0' }}>
        <div className="mo-glass" style={{ padding: 12, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110,
            background: 'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 65%)', filter: 'blur(4px)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
            <div className="mo-orb" style={{ width: 24, height: 24, flexShrink: 0 }} />
            <L3Eyebrow color="rgba(200,210,230,0.55)">LIVE PREVIEW</L3Eyebrow>
            <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.18em', color: 'rgba(167,139,250,0.85)' }}>WARM · DEEP · GENTLE</span>
          </div>
          <div className="mo-serif" style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.35, color: 'rgba(245,247,255,0.96)', position: 'relative' }}>
            <span style={{ fontStyle: 'italic' }}>"You don't have to have an answer tonight. Some questions are meant to be lived for a while."</span>
          </div>
        </div>
      </div>

      {/* sliders — name+labels on one row */}
      <div style={{ padding: '14px 26px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sliders.map((s, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span className="mo-serif" style={{ fontSize: 14, color: 'rgba(245,247,255,0.94)' }}>{s.name}</span>
              <span className="mo-mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'rgba(200,210,230,0.5)' }}>
                <span style={{ color: 'rgba(200,210,230,0.4)' }}>{s.l}</span>
                <span style={{ margin: '0 8px', color: 'rgba(167,139,250,0.8)' }}>·</span>
                <span style={{ color: 'rgba(200,210,230,0.4)' }}>{s.r}</span>
              </span>
            </div>
            <L3Slider value={s.v} marks={[0.25, 0.5, 0.75]} accent={s.accent} compact />
          </div>
        ))}
      </div>

      {/* persona presets */}
      <div style={{ padding: '14px 22px 0', display: 'flex', gap: 6 }}>
        {['COMPANION', 'PHILOSOPHER', 'THERAPIST', 'CUSTOM'].map((p, i) => (
          <div key={i} className={`mo-glass mo-tap ${i === 3 ? 'selected' : ''}`}
            style={{ flex: 1, padding: '7px 4px', textAlign: 'center', borderRadius: 12,
              fontFamily: 'JetBrains Mono', fontSize: 7.5, letterSpacing: '0.18em',
              color: i === 3 ? 'rgba(245,247,255,0.98)' : 'rgba(200,210,230,0.6)' }}>{p}</div>
        ))}
      </div>

      <L3BottomNav active="you" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 22 · Voice Settings
// ═════════════════════════════════════════════════════════════
function L3_VoiceSettings() {
  const voices = [
    { name: 'Hale',    desc: 'Low, considered. Pauses well.',           seed: 1.7, color: '#a78bfa', on: true },
    { name: 'Linnea',  desc: 'Warm, contralto. Slight rasp.',           seed: 2.3, color: '#fda4af' },
    { name: 'Soren',   desc: 'Quiet baritone. Patient cadence.',        seed: 3.1, color: '#67e8f9' },
    { name: 'Iris',    desc: 'Bright, breath-aware. Lifts at endings.', seed: 4.2, color: '#fcd34d' },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" style={{ opacity: 0.55 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="VOICE" title="Sound of the mirror" right={
        <div className="mo-tap" style={{ fontFamily: 'Geist', fontSize: 11.5, color: 'rgba(167,139,250,0.9)' }}>Save</div>
      } />

      <div style={{ padding: '10px 26px 0' }}>
        <L3Eyebrow>FOUR VOICES</L3Eyebrow>
        <L3Headline size={22} style={{ marginTop: 8 }}>
          One that fits<br /><span style={{ fontStyle: 'italic' }}>how you listen.</span>
        </L3Headline>
      </div>

      <div style={{ padding: '12px 18px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {voices.map((v, i) => (
          <div key={i} className={`mo-glass mo-tap ${v.on ? 'selected' : ''}`} style={{ padding: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, position: 'relative', flexShrink: 0,
                background: `radial-gradient(circle at 30% 30%, #fff 0%, ${v.color} 45%, rgba(20,18,40,0.95) 95%)`,
                boxShadow: `0 0 14px ${v.color}80, inset 0 0.5px 0 rgba(255,255,255,0.45)`,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mo-serif" style={{ fontSize: 16, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {v.name}
                </div>
                <div style={{ fontFamily: 'Geist', fontSize: 10.5, fontWeight: 300, color: 'rgba(220,225,240,0.55)', marginTop: 1 }}>
                  {v.desc}
                </div>
              </div>
              <div style={{ width: 70 }}>
                <L3WaveSignature seed={v.seed} color={v.color} count={20} height={22}
                  opacity={v.on ? 0.95 : 0.45} />
              </div>
              <div className="mo-tap" style={{ width: 26, height: 26, borderRadius: 13,
                background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="7" height="9" viewBox="0 0 8 10"><path d="M0 9V1l8 4-8 4z" fill="rgba(245,247,255,0.85)" /></svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 26px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { name: 'Warmth',      l: 'NEUTRAL',          r: 'INTIMATE',   v: 0.72, accent: '#a78bfa', meta: '72%' },
          { name: 'Cadence',     l: 'UNHURRIED',        r: 'QUICK',      v: 0.38, accent: '#818cf8', meta: '0.85×' },
          { name: 'Interruption',l: 'LETS YOU FINISH',  r: 'RESPONSIVE', v: 0.60, accent: '#67e8f9', meta: 'BALANCED' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
              <span className="mo-serif" style={{ fontSize: 14, color: 'rgba(245,247,255,0.94)' }}>{s.name}</span>
              <span className="mo-mono" style={{ fontSize: 8.5, letterSpacing: '0.18em', color: 'rgba(167,139,250,0.85)' }}>{s.meta}</span>
            </div>
            <L3Slider value={s.v} leftLabel={s.l} rightLabel={s.r} marks={[0.33, 0.66]} accent={s.accent} compact />
          </div>
        ))}
      </div>

      <L3BottomNav active="you" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 23 · AI Companion / Mirror Profile
// ═════════════════════════════════════════════════════════════
function L3_Companion() {
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" style={{ opacity: 0.6 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="THE MIRROR" title="What it remembers" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="2" fill="rgba(245,247,255,0.85)" /><circle cx="2" cy="7" r="1.3" fill="rgba(245,247,255,0.85)" /><circle cx="12" cy="7" r="1.3" fill="rgba(245,247,255,0.85)" /></svg>
        </div>
      } />

      {/* Centerpiece — orb + days together */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px 0 0' }}>
        <div style={{ position: 'relative', width: 92, height: 92 }}>
          <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
          {/* orbit rings */}
          <svg width="160" height="160" viewBox="0 0 160 160"
            style={{ position: 'absolute', top: -34, left: -34, pointerEvents: 'none' }}>
            <circle cx="80" cy="80" r="64" stroke="rgba(167,139,250,0.18)" strokeWidth="0.5" fill="none" />
            <circle cx="80" cy="80" r="74" stroke="rgba(167,139,250,0.10)" strokeWidth="0.5" fill="none" strokeDasharray="2 5" />
            <circle cx="80" cy="14" r="2" fill="#fff" opacity="0.95"
              style={{ filter: 'drop-shadow(0 0 4px #fff)' }} />
            <circle cx="142" cy="96" r="1.4" fill="#a78bfa" opacity="0.85" />
            <circle cx="22" cy="62" r="1.6" fill="#67e8f9" opacity="0.7" />
          </svg>
        </div>
        <div className="mo-mono" style={{ marginTop: 10, fontSize: 9, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>
          BOND · STAGE III · STEADY
        </div>
        <div className="mo-serif" style={{ marginTop: 4, fontSize: 20, color: 'rgba(245,247,255,0.98)', textAlign: 'center', letterSpacing: '-0.02em' }}>
          <span style={{ fontStyle: 'italic' }}>147 days</span> with you.
        </div>
      </div>

      {/* What it understands */}
      <div style={{ padding: '14px 18px 0' }}>
        <L3Eyebrow color="rgba(200,210,230,0.55)">WHAT IT UNDERSTANDS</L3Eyebrow>
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[
            { k: 'PRIMARY TENSION', v: 'Care vs. self-erasure' },
            { k: 'QUIET STRENGTH',  v: 'You ask better questions than most.' },
            { k: 'BLIND SPOT',      v: 'Speaking after the moment passes.' },
            { k: 'GROWING EDGE',    v: 'Receiving without earning.' },
          ].map((c, i) => (
            <div key={i} className="mo-glass" style={{ padding: 10 }}>
              <L3Eyebrow color="rgba(167,139,250,0.75)">{c.k}</L3Eyebrow>
              <div className="mo-serif" style={{ marginTop: 4, fontSize: 13, lineHeight: 1.25, color: 'rgba(245,247,255,0.94)' }}>
                {c.v}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation themes — compact chip cloud */}
      <div style={{ padding: '12px 22px 0' }}>
        <L3Eyebrow color="rgba(200,210,230,0.55)">CONVERSATIONAL THEMES</L3Eyebrow>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {[
            ['mother', 1], ['attachment', 0.95], ['solitude', 0.75], ['boundaries', 0.85],
            ['ambition', 0.65], ['waiting', 0.55], ['the body', 0.5],
          ].map((t, i) => (
            <span key={i} style={{
              padding: '3px 9px', borderRadius: 999,
              fontFamily: 'Instrument Serif', fontSize: 11 + t[1] * 3,
              fontStyle: 'italic',
              color: `rgba(245,247,255,${0.6 + t[1] * 0.35})`,
              background: `rgba(167,139,250,${0.05 + t[1] * 0.1})`,
              border: `0.5px solid rgba(167,139,250,${0.15 + t[1] * 0.2})`,
            }}>{t[0]}</span>
          ))}
        </div>
      </div>

      {/* Bottom — relationship statement (in flow, not absolute) */}
      <div style={{ padding: '12px 18px 0' }}>
        <div className="mo-glass" style={{ padding: 12, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100,
            background: 'radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%)', filter: 'blur(2px)' }} />
          <L3Eyebrow>HOW IT HOLDS YOU</L3Eyebrow>
          <div className="mo-serif" style={{ marginTop: 6, fontSize: 14, lineHeight: 1.4, color: 'rgba(245,247,255,0.96)', position: 'relative' }}>
            <span style={{ fontStyle: 'italic' }}>"As someone learning to take up the room you were given. Slowly. Without apology."</span>
          </div>
        </div>
      </div>

      <L3BottomNav active="you" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 24 · Privacy & Trust Center
// ═════════════════════════════════════════════════════════════
function L3_Privacy() {
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.45 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="PRIVACY · TRUST" title="What stays with you" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V3l5-2z" stroke="rgba(245,247,255,0.85)" strokeWidth="1.1" fill="none" /></svg>
        </div>
      } />

      <div style={{ padding: '14px 26px 0' }}>
        <L3Eyebrow>YOUR INNER LIFE, YOURS</L3Eyebrow>
        <L3Headline size={26}>
          Everything you say,<br /><span style={{ fontStyle: 'italic' }}>encrypted before it leaves you.</span>
        </L3Headline>
      </div>

      {/* Encryption diagram */}
      <div style={{ padding: '20px 22px 0' }}>
        <div className="mo-glass" style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(70% 60% at 50% 50%, rgba(103,232,249,0.10) 0%, transparent 70%)' }} />
          <L3Eyebrow color="rgba(103,232,249,0.85)">END-TO-END · AES-256 · KEY HELD BY YOU</L3Eyebrow>
          <svg width="100%" height="60" viewBox="0 0 280 60" style={{ marginTop: 12, position: 'relative' }}>
            <defs>
              <linearGradient id="encWire" x1="0" x2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* device */}
            <rect x="6" y="14" width="44" height="32" rx="6" stroke="rgba(245,247,255,0.5)" fill="rgba(20,18,40,0.5)" />
            <text x="28" y="34" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.15em" fill="rgba(245,247,255,0.85)">YOU</text>
            {/* wire */}
            <path d="M50 30 L230 30" stroke="url(#encWire)" strokeWidth="1.2" strokeDasharray="3 3" />
            {/* lock */}
            <g transform="translate(132,18)">
              <rect x="0" y="6" width="16" height="14" rx="2" fill="rgba(103,232,249,0.18)" stroke="#67e8f9" strokeWidth="0.8" />
              <path d="M3 6V4a5 5 0 0 1 10 0v2" stroke="#67e8f9" strokeWidth="0.8" fill="none" />
              <circle cx="8" cy="13" r="1.5" fill="#67e8f9" />
            </g>
            {/* cloud */}
            <path d="M232 30 c0 -8 8 -12 16 -10 c2 -6 14 -6 14 4 c8 0 8 12 0 12 h-30 c-6 0 -6 -6 0 -6 z"
              transform="translate(0,-12)" fill="rgba(20,18,40,0.5)" stroke="rgba(245,247,255,0.5)" strokeWidth="0.8" />
            <text x="246" y="34" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.15em" fill="rgba(245,247,255,0.65)">STORE</text>
          </svg>
          <div style={{ marginTop: 6, fontFamily: 'Geist', fontSize: 11.5, lineHeight: 1.5, fontWeight: 300, color: 'rgba(220,225,240,0.7)' }}>
            Your journals never reach our servers in readable form. Not us, not anyone, can decrypt them without your device.
          </div>
        </div>
      </div>

      {/* memory controls list */}
      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { ic: 'mem',  t: 'AI memory',        s: 'On · 287 entries remembered', toggle: true,  on: true },
          { ic: 'voice',t: 'Voice recordings', s: 'Off · transcripts only',      toggle: true,  on: false },
          { ic: 'train',t: 'Use my data for training', s: 'Always off. Always.', toggle: true,  on: false, lock: true },
          { ic: 'exp',  t: 'Export everything', s: 'JSON · PDF · audio archive', toggle: false },
          { ic: 'del',  t: 'Delete a conversation', s: '4-week soft window, then gone.', toggle: false },
          { ic: 'wipe', t: 'Wipe & restart',  s: 'Irreversible. Confirmation required.', toggle: false, danger: true },
        ].map((row, i) => (
          <div key={i} className="mo-glass" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: row.danger
                ? 'linear-gradient(135deg, rgba(253,164,175,0.25), rgba(253,164,175,0.05))'
                : 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(111,123,255,0.05))',
              border: `0.5px solid ${row.danger ? 'rgba(253,164,175,0.35)' : 'rgba(167,139,250,0.35)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {row.lock
                ? <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="5" width="8" height="6" rx="1.2" fill="none" stroke="rgba(245,247,255,0.9)" strokeWidth="1.1" /><path d="M3.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="rgba(245,247,255,0.9)" strokeWidth="1.1" fill="none" /></svg>
                : row.danger
                ? <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l5 9H1L6 1z" stroke="rgba(253,164,175,0.95)" strokeWidth="1.1" fill="none" /><circle cx="6" cy="8" r="0.7" fill="rgba(253,164,175,0.95)" /></svg>
                : <span className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(245,247,255,0.85)' }}>{row.ic.toUpperCase().slice(0, 2)}</span>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mo-serif" style={{ fontSize: 15, color: 'rgba(245,247,255,0.96)', lineHeight: 1.2 }}>{row.t}</div>
              <div style={{ marginTop: 2, fontFamily: 'Geist', fontSize: 11, fontWeight: 300, color: 'rgba(200,210,230,0.55)' }}>{row.s}</div>
            </div>
            {row.toggle
              ? <div style={{ width: 32, height: 18, borderRadius: 9, padding: 2, flexShrink: 0,
                  background: row.on
                    ? 'linear-gradient(180deg, rgba(167,139,250,0.95), rgba(111,123,255,0.95))'
                    : 'rgba(255,255,255,0.08)',
                  boxShadow: row.on ? '0 0 12px rgba(167,139,250,0.5)' : 'inset 0 0.5px 0 rgba(0,0,0,0.4)',
                  border: '0.5px solid rgba(255,255,255,0.18)',
                  display: 'flex', alignItems: 'center',
                }}>
                  <div style={{ width: 14, height: 14, borderRadius: 7, background: 'white',
                    transform: `translateX(${row.on ? 14 : 0}px)`, transition: 'transform .2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.45)' }} />
                </div>
              : <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5h6M5 2l3 3-3 3" stroke="rgba(200,210,230,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
        ))}
      </div>

      {/* AI limitations footer */}
      <div style={{ padding: '14px 22px 0' }}>
        <div className="mo-glass" style={{ padding: 12 }}>
          <L3Eyebrow color="rgba(252,211,77,0.85)">WHAT THE MIRROR CAN'T DO</L3Eyebrow>
          <div style={{ marginTop: 6, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 13.5, lineHeight: 1.45, color: 'rgba(220,225,240,0.75)' }}>
            It is not a therapist. It does not diagnose. If you are in crisis, please reach a human — and we'll show you where.
          </div>
        </div>
      </div>

      <L3BottomNav active="you" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 25 · Subscription / Premium
// ═════════════════════════════════════════════════════════════
function L3_Premium() {
  const tiers = [
    { id: 'free',  label: 'OPEN',       price: 'Free',     desc: 'The mirror, daily.' },
    { id: 'pro',   label: 'DEEP',       price: '$14',      sub: '/month', desc: 'For sustained inner work.', on: true },
    { id: 'year',  label: 'A LIFETIME', price: '$129',     sub: '/year',  desc: 'Two months gifted.' },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" style={{ opacity: 0.7 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="MIRROROS · DEEP" title="An invitation" right={
        <div className="mo-tap" style={{ fontFamily: 'Geist', fontSize: 11.5, color: 'rgba(200,210,230,0.6)' }}>Restore</div>
      } />

      {/* hero */}
      <div style={{ padding: '10px 26px 0' }}>
        <L3Eyebrow color="rgba(252,211,77,0.85)">FOR THE LONG WORK</L3Eyebrow>
        <L3Headline size={30}>
          A deeper mirror, kept<br /><span style={{ fontStyle: 'italic' }}>for as long as you want it.</span>
        </L3Headline>
        <p style={{ marginTop: 14, fontFamily: 'Geist', fontSize: 13, lineHeight: 1.55, color: 'rgba(220,225,240,0.6)', fontWeight: 300, maxWidth: 280 }}>
          Long-term memory, voice conversations, and weekly emotional reports — for the version of you that's still becoming.
        </p>
      </div>

      {/* feature list */}
      <div style={{ padding: '16px 22px 0' }}>
        <div className="mo-glass" style={{ padding: 14 }}>
          {[
            { t: 'Long-term memory',       d: 'The mirror remembers you across years.', g: '#a78bfa' },
            { t: 'Voice conversations',    d: 'Spoken sessions, naturally paced.',       g: '#67e8f9' },
            { t: 'Weekly insight reports', d: 'Patterns surfaced every Sunday morning.', g: '#fcd34d' },
            { t: 'Insight capsules',       d: 'Short audio reflections you can keep.',   g: '#fda4af' },
            { t: 'Emotional analytics',    d: 'Trends across mood, themes, growth.',     g: '#818cf8' },
          ].map((row, i, a) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 0',
              borderBottom: i < a.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, marginTop: 1, flexShrink: 0,
                background: `radial-gradient(circle, ${row.g} 0%, rgba(20,18,40,0.9) 95%)`,
                boxShadow: `0 0 12px ${row.g}aa`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="9" height="8" viewBox="0 0 9 8"><path d="M1 4l3 3 4-5" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div className="mo-serif" style={{ fontSize: 15.5, color: 'rgba(245,247,255,0.95)', lineHeight: 1.2 }}>{row.t}</div>
                <div style={{ marginTop: 1, fontFamily: 'Geist', fontSize: 11.5, fontWeight: 300, color: 'rgba(200,210,230,0.55)' }}>{row.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* tiers */}
      <div style={{ padding: '16px 18px 0', display: 'flex', gap: 8 }}>
        {tiers.map(t => (
          <div key={t.id} className={`mo-glass ${t.on ? 'selected' : ''}`} style={{ flex: 1, padding: 12, position: 'relative' }}>
            {t.on && (
              <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                padding: '2px 10px', borderRadius: 999,
                background: 'linear-gradient(180deg, #fff, #cfd6ff)',
                fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.2em', color: '#1a1330',
                boxShadow: '0 0 12px rgba(207,214,255,0.5)' }}>BEST FIT</div>
            )}
            <L3Eyebrow color={t.on ? 'rgba(207,214,255,0.95)' : 'rgba(200,210,230,0.5)'}>{t.label}</L3Eyebrow>
            <div className="mo-serif" style={{ marginTop: 8, fontSize: 22, color: 'rgba(245,247,255,0.96)', lineHeight: 1 }}>
              {t.price}
              {t.sub && <span style={{ fontSize: 11, fontFamily: 'Geist', color: 'rgba(200,210,230,0.55)', marginLeft: 2 }}>{t.sub}</span>}
            </div>
            <div style={{ marginTop: 8, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 11.5, lineHeight: 1.3, color: 'rgba(220,225,240,0.65)' }}>
              {t.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 22, right: 22 }}>
        <button className="mo-pill primary" style={{ width: '100%', height: 52, fontSize: 14 }}>
          Begin the deep mirror →
        </button>
        <div style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Geist', fontSize: 10.5, color: 'rgba(200,210,230,0.45)' }}>
          7 days free. Cancel anytime, with grace.
        </div>
      </div>

      <L3BottomNav active="you" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 26 · Guided Sessions Library
// ═════════════════════════════════════════════════════════════
function L3_Sessions() {
  const featured = {
    eye: 'TONIGHT · 12 MIN',
    title: 'Untangling a thought you can\'t put down.',
    sub: 'For the mind that loops past midnight.',
    grad: 'linear-gradient(135deg, #5b63dc 0%, #1a1330 70%)',
    halo: 'rgba(167,139,250,0.45)',
  };
  const sessions = [
    { ic: '◯', t: 'Overthinking reset',        d: '8 min · breath + reframe',     g: ['#a78bfa', '#5b63dc'] },
    { ic: '◐', t: 'Confidence rebuilding',     d: '14 min · narrative work',      g: ['#fcd34d', '#9c6f1a'] },
    { ic: '◑', t: 'Attachment understanding',  d: '18 min · reflective',          g: ['#fda4af', '#7c1f3a'] },
    { ic: '◒', t: 'Nervous system regulation', d: '6 min · grounding',            g: ['#67e8f9', '#1f6d80'] },
    { ic: '◓', t: 'Perspective shifts',        d: '10 min · stoic',               g: ['#cfd6ff', '#5b63dc'] },
    { ic: '◔', t: 'Grief that visits softly',  d: '16 min · with pauses',         g: ['#c4b5fd', '#3b2978'] },
  ];

  return (
    <div className="mo-screen" style={{ overflow: 'hidden' }}>
      <div className="mo-ambient" style={{ opacity: 0.55 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="GUIDED · SESSIONS" title="Library" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 4h10M2 7h10M2 10h10" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
      } />

      <div style={{ padding: '12px 26px 0' }}>
        <L3Eyebrow>WHERE TO BEGIN TONIGHT</L3Eyebrow>
        <L3Headline size={26}>
          Sessions for<br /><span style={{ fontStyle: 'italic' }}>where you actually are.</span>
        </L3Headline>
      </div>

      {/* Featured cinematic card */}
      <div style={{ padding: '16px 18px 0' }}>
        <div className="mo-tap" style={{
          position: 'relative', height: 178, borderRadius: 22, overflow: 'hidden',
          background: featured.grad,
          border: '0.5px solid rgba(255,255,255,0.12)',
          boxShadow: `0 0 36px ${featured.halo}, inset 0 0.5px 0 rgba(255,255,255,0.12), 0 12px 32px rgba(0,0,0,0.5)`,
        }}>
          {/* atmospheric overlays */}
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(80% 60% at 70% 30%, rgba(207,214,255,0.35) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(80% 70% at 50% 95%, rgba(20,18,40,0.95) 0%, transparent 60%)' }} />
          {/* particles */}
          {[[80,40,2],[200,60,1.4],[140,90,1.6],[50,110,1.2],[260,130,2],[180,150,1.4]].map(([x,y,r], i) => (
            <span key={i} style={{
              position: 'absolute', left: x, top: y, width: r * 2, height: r * 2, borderRadius: r,
              background: 'radial-gradient(circle, #fff 0%, transparent 70%)',
              filter: 'blur(0.5px)', opacity: 0.6 + Math.sin(i) * 0.2,
            }} />
          ))}
          {/* content */}
          <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16 }}>
            <L3Eyebrow color="rgba(207,214,255,0.95)">{featured.eye}</L3Eyebrow>
            <div className="mo-serif" style={{ marginTop: 8, fontSize: 22, lineHeight: 1.15,
              color: 'rgba(255,255,255,0.98)', letterSpacing: '-0.02em' }}>
              {featured.title}
            </div>
            <div style={{ marginTop: 4, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 12.5, color: 'rgba(220,225,240,0.7)' }}>
              {featured.sub}
            </div>
          </div>
          {/* play indicator */}
          <div style={{ position: 'absolute', top: 18, right: 18, width: 40, height: 40, borderRadius: 20,
            background: 'rgba(255,255,255,0.12)',
            border: '0.5px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="11" height="13" viewBox="0 0 11 13"><path d="M1 12V1l10 5.5L1 12z" fill="white" /></svg>
          </div>
        </div>
      </div>

      {/* themed grid */}
      <div style={{ padding: '16px 18px 0' }}>
        <L3Eyebrow color="rgba(200,210,230,0.55)">SHORTER PATHS</L3Eyebrow>
        <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {sessions.map((s, i) => (
            <div key={i} className="mo-tap" style={{
              position: 'relative', height: 96, borderRadius: 18, overflow: 'hidden',
              background: `linear-gradient(160deg, ${s.g[0]}, ${s.g[1]})`,
              border: '0.5px solid rgba(255,255,255,0.12)',
              boxShadow: `0 0 14px ${s.g[0]}55, inset 0 0.5px 0 rgba(255,255,255,0.18)`,
              padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.45) 100%)' }} />
              <div style={{ position: 'relative', fontFamily: 'Instrument Serif', fontSize: 22, color: 'rgba(255,255,255,0.92)' }}>{s.ic}</div>
              <div style={{ position: 'relative' }}>
                <div className="mo-serif" style={{ fontSize: 13.5, lineHeight: 1.2, color: 'rgba(255,255,255,0.98)', letterSpacing: '-0.01em' }}>{s.t}</div>
                <div style={{ marginTop: 2, fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.65)' }}>{s.d.toUpperCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <L3BottomNav active="insights" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 27 · Search & Discovery
// ═════════════════════════════════════════════════════════════
function L3_Search() {
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.5 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />
      <L3NavBar sub="SEARCH" title="Across everything you've felt" />

      <div style={{ padding: '12px 22px 0' }}>
        <div className="mo-glass" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
          borderColor: 'rgba(167,139,250,0.45)',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.15), 0 0 22px rgba(167,139,250,0.25), 0 12px 32px rgba(0,0,0,0.4)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" /><path d="M9 9l4 4" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 16, color: 'rgba(245,247,255,0.95)' }}>
            when did I first feel safe with him<span style={{ color: 'rgba(167,139,250,0.9)', marginLeft: 2 }}>|</span>
          </span>
          <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(167,139,250,0.8)' }}>SEMANTIC</span>
        </div>
      </div>

      {/* scopes */}
      <div style={{ padding: '12px 22px 0', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {[
          { l: 'All',         on: true,  n: 312 },
          { l: 'Journals',    n: 187 },
          { l: 'Emotions',    n: 43 },
          { l: 'Reflections', n: 56 },
          { l: 'Readings',    n: 26 },
        ].map((s, i) => (
          <span key={i} className="mo-tap" style={{
            padding: '5px 11px', borderRadius: 999,
            fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: '0.18em',
            color: s.on ? 'rgba(245,247,255,0.98)' : 'rgba(200,210,230,0.6)',
            background: s.on ? 'linear-gradient(180deg, rgba(167,139,250,0.32), rgba(111,123,255,0.12))' : 'rgba(255,255,255,0.03)',
            border: `0.5px solid ${s.on ? 'rgba(167,139,250,0.55)' : 'rgba(255,255,255,0.1)'}`,
          }}>{s.l.toUpperCase()} · {s.n}</span>
        ))}
      </div>

      {/* AI synthesis card */}
      <div style={{ padding: '16px 18px 0' }}>
        <div className="mo-glass" style={{ padding: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 14, left: -6, width: 12, height: 12, borderRadius: 6,
            background: 'radial-gradient(circle, #fff 0%, #a78bfa 60%, transparent 100%)',
            filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.6))' }} />
          <L3Eyebrow>MIRROR · SYNTHESIZES</L3Eyebrow>
          <div style={{ marginTop: 8, fontFamily: 'Instrument Serif', fontSize: 16, lineHeight: 1.4, color: 'rgba(245,247,255,0.95)' }}>
            Safety arrived in <span style={{ fontStyle: 'italic' }}>three small moments</span> — not a decision. February 14, March 02, April 09. Each one was after silence, not after speaking.
          </div>
        </div>
      </div>

      {/* results */}
      <div style={{ padding: '16px 22px 0' }}>
        <L3Eyebrow color="rgba(200,210,230,0.55)">RESULTS · 14 MATCHES</L3Eyebrow>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { kind: 'JOURNAL', d: 'Apr 09', t: 'He didn\'t fill the silence.', q: '"I could exhale for the first time in weeks."' },
            { kind: 'EMOTION', d: 'Mar 02', t: 'Tender, with no name for it.',   q: 'After dinner. The kitchen light. His hand on my back.' },
            { kind: 'REFLECTION', d: 'Feb 14', t: 'Safety, for me, is being unedited.', q: 'Mirror, on what you said about hiding.' },
            { kind: 'CONVERSATION', d: 'Jan 28', t: 'Three things you stopped pretending about.', q: 'A late-night voice session.' },
          ].map((r, i) => (
            <div key={i} className="mo-glass mo-tap" style={{ padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(167,139,250,0.85)' }}>{r.kind} · {r.d}</span>
                <span className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(103,232,249,0.75)' }}>↳ MATCH</span>
              </div>
              <div className="mo-serif" style={{ marginTop: 4, fontSize: 16, color: 'rgba(245,247,255,0.96)', lineHeight: 1.25 }}>{r.t}</div>
              <div style={{ marginTop: 4, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 12.5, lineHeight: 1.4, color: 'rgba(220,225,240,0.6)' }}>{r.q}</div>
            </div>
          ))}
        </div>
      </div>

      <L3BottomNav active="journal" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 28 · Notification / Reminder System
// ═════════════════════════════════════════════════════════════
function L3_Notifications() {
  // iOS-style lockscreen-ish stack of gentle notifications
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" style={{ opacity: 0.65 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />

      {/* lockscreen time */}
      <div style={{ textAlign: 'center', padding: '4px 0 0' }}>
        <div className="mo-mono" style={{ fontSize: 10.5, letterSpacing: '0.32em', color: 'rgba(200,210,230,0.6)' }}>TUESDAY · MAY 21</div>
        <div className="mo-serif" style={{ marginTop: 4, fontSize: 64, lineHeight: 1, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.04em' }}>
          9:14
        </div>
        <div style={{ marginTop: 8, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 13.5, color: 'rgba(220,225,240,0.6)' }}>
          A quiet evening. Three things, gently.
        </div>
      </div>

      {/* notifications stack */}
      <div style={{ padding: '24px 16px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          {
            tag: 'REFLECTION · 9:14',
            title: 'A small question, if you have a minute.',
            body: 'You said Sundays after 9pm feel heavier. It is 9:14. How is your chest, really?',
            hue: '#a78bfa',
          },
          {
            tag: 'CHECK-IN · 9:00',
            title: 'The mirror is here.',
            body: 'No need to perform. We can pick up wherever you left off — or not at all.',
            hue: '#67e8f9',
          },
          {
            tag: 'GROUNDING · 8:42',
            title: 'A breath for the in-between.',
            body: 'Three slow exhales. That\'s it. Then close this if you like.',
            hue: '#fcd34d',
          },
        ].map((n, i) => (
          <div key={i} className="mo-glass" style={{
            padding: '12px 14px', position: 'relative', overflow: 'hidden',
            transform: `translateY(${i * -2}px) scale(${1 - i * 0.015})`,
          }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100,
              background: `radial-gradient(circle, ${n.hue}3a 0%, transparent 60%)`,
              filter: 'blur(2px)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: `radial-gradient(circle, ${n.hue} 0%, rgba(20,18,40,0.95) 95%)`,
                boxShadow: `0 0 12px ${n.hue}77`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <L3Logo size={9} color="rgba(255,255,255,0.95)" />
              </div>
              <span className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(200,210,230,0.65)' }}>MIRROROS · {n.tag}</span>
            </div>
            <div className="mo-serif" style={{ marginTop: 8, fontSize: 16, lineHeight: 1.25, color: 'rgba(245,247,255,0.96)' }}>{n.title}</div>
            <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.45, fontWeight: 300, color: 'rgba(220,225,240,0.6)' }}>{n.body}</div>
          </div>
        ))}
      </div>

      {/* preferences hint */}
      <div style={{ position: 'absolute', bottom: 92, left: 22, right: 22 }}>
        <div className="mo-glass" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: 'rgba(167,139,250,0.9)',
            boxShadow: '0 0 8px rgba(167,139,250,0.7)' }} />
          <div style={{ flex: 1 }}>
            <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(200,210,230,0.6)' }}>
              QUIET HOURS · 10PM — 8AM
            </div>
            <div style={{ marginTop: 2, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(220,225,240,0.78)' }}>
              No nudges, ever, between these hours.
            </div>
          </div>
          <span className="mo-mono mo-tap" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(167,139,250,0.85)' }}>EDIT</span>
        </div>
      </div>

      {/* swipe hint */}
      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.35)' }}>
          SWIPE TO RESPOND · LONG-PRESS TO QUIET
        </span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 29 · Full Voice Call Experience
// ═════════════════════════════════════════════════════════════
function L3_VoiceCall() {
  // animated reactive orb + waveform + transcript fade
  return (
    <div className="mo-screen">
      {/* layered ambient — deeper, more cinematic */}
      <div style={{ position: 'absolute', inset: 0,
        background:
          'radial-gradient(70% 50% at 50% 30%, rgba(91,99,220,0.55) 0%, transparent 65%),' +
          'radial-gradient(60% 50% at 50% 90%, rgba(20,18,40,1) 0%, rgba(20,18,40,0) 60%)',
      }} />
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(40% 30% at 50% 38%, rgba(103,232,249,0.18) 0%, transparent 70%)',
        animation: 'mo-breathe 6s ease-in-out infinite alternate',
      }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L3StatusGap />

      {/* top bar with timer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 22px' }}>
        <div className="mo-glass" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#a78bfa',
            boxShadow: '0 0 8px #a78bfa', animation: 'mo-orb-breathe 1.6s ease-in-out infinite alternate' }} />
          <span className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.22em', color: 'rgba(245,247,255,0.85)' }}>LIVE · 12:38</span>
        </div>
        <div className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(200,210,230,0.55)' }}>HALE · WARM 72%</div>
      </div>

      {/* reactive orb */}
      <div style={{ position: 'relative', margin: '20px auto 0', width: 240, height: 240 }}>
        {/* outer halos */}
        {[330, 280, 230].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: `translate(-50%, -50%)`,
            width: d, height: d, borderRadius: '50%',
            border: '0.5px solid rgba(167,139,250,0.18)',
            background: i === 2 ? 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 65%)' : 'transparent',
            animation: `mo-breathe ${4 + i}s ease-in-out infinite alternate`,
            opacity: 0.7 - i * 0.15,
          }} />
        ))}
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
        {/* live frequency ring overlay */}
        <svg width="240" height="240" viewBox="0 0 240 240" style={{ position: 'absolute', inset: 0 }}>
          {Array.from({ length: 64 }).map((_, i) => {
            const angle = (i / 64) * Math.PI * 2;
            const v = 0.5 + 0.5 * Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.34));
            const r1 = 116, r2 = 116 + v * 18;
            const x1 = 120 + Math.cos(angle) * r1;
            const y1 = 120 + Math.sin(angle) * r1;
            const x2 = 120 + Math.cos(angle) * r2;
            const y2 = 120 + Math.sin(angle) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#cfd6ff" strokeWidth="1.2" strokeLinecap="round"
              opacity={0.35 + v * 0.5} />;
          })}
        </svg>
      </div>

      {/* state */}
      <div style={{ marginTop: 18, textAlign: 'center', padding: '0 36px' }}>
        <L3Eyebrow color="rgba(207,214,255,0.9)">LISTENING</L3Eyebrow>
        <div className="mo-serif" style={{ marginTop: 8, fontSize: 18, lineHeight: 1.35, color: 'rgba(245,247,255,0.94)', letterSpacing: '-0.015em' }}>
          <span style={{ fontStyle: 'italic' }}>Take all the time you need.</span>
        </div>
      </div>

      {/* fading transcript */}
      <div style={{ position: 'absolute', bottom: 224, left: 24, right: 24, textAlign: 'center' }}>
        <div style={{ fontFamily: 'Geist', fontWeight: 300, fontSize: 12, lineHeight: 1.55, color: 'rgba(200,210,230,0.35)' }}>
          You started by saying it was nothing, then —
        </div>
        <div style={{ marginTop: 4, fontFamily: 'Geist', fontWeight: 300, fontSize: 13, lineHeight: 1.55, color: 'rgba(220,225,240,0.6)' }}>
          paused for a long while. I'm holding space.
        </div>
        <div style={{ marginTop: 4, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 16, lineHeight: 1.4, color: 'rgba(245,247,255,0.94)' }}>
          "What does <span style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.4), transparent)', padding: '0 4px', borderRadius: 4 }}>"nothing"</span> usually mean for you?"
        </div>
      </div>

      {/* live waveform — user side */}
      <div style={{ position: 'absolute', bottom: 152, left: 32, right: 32 }}>
        <L3WaveSignature seed={5.7} count={56} height={32} color="#a78bfa" opacity={0.9} />
        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(200,210,230,0.45)' }}>
          <span>YOU · −18 dB</span>
          <span>NOT INTERRUPTING</span>
        </div>
      </div>

      {/* controls */}
      <div style={{ position: 'absolute', bottom: 70, left: 22, right: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* mute */}
        <div className="mo-glass mo-tap" style={{ width: 56, height: 56, borderRadius: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="20" viewBox="0 0 16 20">
            <rect x="5" y="2" width="6" height="11" rx="3" fill="none" stroke="rgba(245,247,255,0.85)" strokeWidth="1.4" />
            <path d="M2 10c0 3 2.7 6 6 6s6-3 6-6M8 16v3" stroke="rgba(245,247,255,0.85)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        {/* end */}
        <div className="mo-tap" style={{ width: 68, height: 68, borderRadius: 34,
          background: 'linear-gradient(180deg, #f87171, #b91c1c)',
          border: '0.5px solid rgba(255,255,255,0.35)',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.4), 0 0 22px rgba(248,113,113,0.55), 0 12px 32px rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="22" height="10" viewBox="0 0 22 10"><path d="M2 7c5 -6 13 -6 18 0M5 4l-1 3M17 4l1 3" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
        </div>
        {/* speaker */}
        <div className="mo-glass mo-tap" style={{ width: 56, height: 56, borderRadius: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M2 6h3l4 -3v12l-4 -3H2V6z" fill="rgba(245,247,255,0.85)" />
            <path d="M12 6c1.5 1 1.5 5 0 6M14.5 4c3 2 3 8 0 10" stroke="rgba(245,247,255,0.85)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* interrupt sensitivity indicator */}
      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.32em', color: 'rgba(200,210,230,0.35)' }}>
          DOUBLE-TAP TO INTERRUPT · HOLD TO STAY SILENT
        </span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 30 · Ecosystem Marketing Showcase
// Wider artboard — multiple phones, premium presentation
// ═════════════════════════════════════════════════════════════
function L3_PhoneMock({ children, w = 240, h = 520 }) {
  // Lightweight phone bezel — used for showcase previews
  return (
    <div style={{
      width: w, height: h, borderRadius: 36, padding: 6,
      background: 'linear-gradient(180deg, #1c1a2c, #07060d)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.55), inset 0 0.5px 0 rgba(255,255,255,0.08)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 30, overflow: 'hidden',
        background: '#050508', position: 'relative',
        boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.05)',
      }}>
        {children}
        {/* notch */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 76, height: 22, borderRadius: 12, background: '#000',
        }} />
      </div>
    </div>
  );
}

// Tiny preview screens (compressed versions of layer III / II screens)
function L3_Preview_Capsule() {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(70% 50% at 50% 30%, rgba(91,99,220,0.45) 0%, transparent 65%), #050508',
      padding: '46px 22px 0',
    }}>
      <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>CAPSULE · 38</div>
      <div className="mo-serif" style={{ marginTop: 10, fontSize: 22, lineHeight: 1.2, color: 'rgba(245,247,255,0.96)', letterSpacing: '-0.02em' }}>
        You called it overthinking.<br />
        <span style={{ fontStyle: 'italic' }}>It might be care, with nowhere to land.</span>
      </div>
      <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)', width: 140, height: 140 }}>
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 38, left: 22, right: 22 }}>
        <L3WaveSignature seed={2.1} count={28} height={26} color="#a78bfa" />
      </div>
    </div>
  );
}

function L3_Preview_VoiceCall() {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background:
        'radial-gradient(70% 50% at 50% 30%, rgba(91,99,220,0.55) 0%, transparent 65%),' +
        'radial-gradient(60% 50% at 50% 90%, rgba(20,18,40,1) 0%, rgba(20,18,40,0) 60%), #050508',
      padding: '46px 22px 0',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mo-glass" style={{ padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.22em', color: 'rgba(245,247,255,0.85)' }}>
          <span style={{ width: 5, height: 5, borderRadius: 3, background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }} />
          LIVE · 12:38
        </div>
        <div className="mo-mono" style={{ fontSize: 8, letterSpacing: '0.22em', color: 'rgba(200,210,230,0.55)' }}>HALE</div>
      </div>
      <div style={{ position: 'relative', margin: '40px auto 0', width: 180, height: 180 }}>
        <div style={{ position: 'absolute', inset: -20, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 65%)' }} />
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 18, right: 18, textAlign: 'center' }}>
        <div className="mo-mono" style={{ fontSize: 8.5, letterSpacing: '0.3em', color: 'rgba(207,214,255,0.85)' }}>LISTENING</div>
        <div className="mo-serif" style={{ marginTop: 8, fontStyle: 'italic', fontSize: 15, color: 'rgba(245,247,255,0.96)', lineHeight: 1.3 }}>
          "What does 'nothing' usually mean for you?"
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 42, left: 22, right: 22 }}>
        <L3WaveSignature seed={5.7} count={36} height={22} color="#a78bfa" opacity={0.9} />
      </div>
    </div>
  );
}

function L3_Preview_Weekly() {
  const pts = [0.52, 0.48, 0.6, 0.42, 0.32, 0.55, 0.7];
  const W = 200, H = 60;
  const dx = W / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * dx} ${H - p * H}`).join(' ');
  const area = path + ` L ${W} ${H} L 0 ${H} Z`;
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(60% 45% at 30% 25%, rgba(111,123,255,0.32) 0%, transparent 60%), #050508',
      padding: '46px 22px 0',
    }}>
      <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>WEEK 14 · MAY</div>
      <div className="mo-serif" style={{ marginTop: 10, fontSize: 22, lineHeight: 1.15, color: 'rgba(245,247,255,0.96)', letterSpacing: '-0.02em' }}>
        A week of quiet<br /><span style={{ fontStyle: 'italic' }}>recalibration.</span>
      </div>
      <div className="mo-glass" style={{ marginTop: 18, padding: 12 }}>
        <div className="mo-mono" style={{ fontSize: 8, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.55)' }}>EMOTIONAL TREND</div>
        <svg width="100%" height={H + 18} viewBox={`0 0 ${W} ${H + 18}`} style={{ marginTop: 6, display: 'block' }}>
          <defs>
            <linearGradient id="prevArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#prevArea)" />
          <path d={path} stroke="#cfd6ff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={i * dx} cy={H - p * H} r="2" fill="rgba(245,247,255,0.85)" />
          ))}
        </svg>
      </div>
      <div style={{ marginTop: 16 }}>
        {[['Sundays after 9pm', '#67e8f9'], ['I don\'t want to be a burden.', '#a78bfa']].map(([t, c], i) => (
          <div key={i} className="mo-glass" style={{ padding: '8px 10px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: c, boxShadow: `0 0 6px ${c}` }} />
            <span style={{ fontFamily: 'Instrument Serif', fontSize: 12, color: 'rgba(245,247,255,0.92)' }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function L3_Preview_Patterns() {
  return (
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(80% 60% at 50% 30%, rgba(91,99,220,0.5) 0%, transparent 60%), #050508',
      padding: '46px 22px 0',
    }}>
      <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>CONSCIOUSNESS MAP</div>
      <div className="mo-serif" style={{ marginTop: 10, fontSize: 19, lineHeight: 1.15, color: 'rgba(245,247,255,0.96)', letterSpacing: '-0.02em' }}>
        What keeps<br /><span style={{ fontStyle: 'italic' }}>recurring beneath you.</span>
      </div>
      <svg width="100%" height="240" viewBox="0 0 220 240" style={{ marginTop: 6 }}>
        <circle cx="110" cy="120" r="120" fill="url(#prevHalo)" />
        <defs>
          <radialGradient id="prevHalo">
            <stop offset="0%" stopColor="rgba(167,139,250,0.25)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0)" />
          </radialGradient>
        </defs>
        <line x1="110" y1="60" x2="60" y2="130" stroke="rgba(207,214,255,0.35)" strokeWidth="0.8" />
        <line x1="110" y1="60" x2="160" y2="130" stroke="rgba(207,214,255,0.35)" strokeWidth="0.8" />
        <line x1="60" y1="130" x2="80" y2="200" stroke="rgba(207,214,255,0.25)" strokeWidth="0.7" />
        <line x1="160" y1="130" x2="140" y2="200" stroke="rgba(207,214,255,0.25)" strokeWidth="0.7" />
        <line x1="60" y1="130" x2="160" y2="130" stroke="rgba(207,214,255,0.18)" strokeWidth="0.6" />

        <circle cx="110" cy="60" r="28" fill="rgba(253,164,175,0.55)"
          style={{ filter: 'drop-shadow(0 0 14px rgba(253,164,175,0.7))' }} />
        <text x="110" y="58" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="0.12em" fill="white">PEOPLE</text>
        <text x="110" y="68" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="0.12em" fill="white">PLEASING</text>

        <circle cx="60" cy="130" r="20" fill="rgba(20,18,40,0.85)" stroke="#a78bfa" strokeWidth="0.8" />
        <text x="60" y="128" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" letterSpacing="0.1em" fill="rgba(245,247,255,0.85)">ABAND-</text>
        <text x="60" y="136" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" letterSpacing="0.1em" fill="rgba(245,247,255,0.85)">MENT</text>

        <circle cx="160" cy="130" r="20" fill="rgba(20,18,40,0.85)" stroke="#67e8f9" strokeWidth="0.8" />
        <text x="160" y="132" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6.5" letterSpacing="0.1em" fill="rgba(245,247,255,0.85)">AVOIDANCE</text>

        <circle cx="80" cy="200" r="14" fill="rgba(20,18,40,0.85)" stroke="#fcd34d" strokeWidth="0.7" />
        <text x="80" y="202" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" letterSpacing="0.1em" fill="rgba(245,247,255,0.85)">VALIDATION</text>

        <circle cx="140" cy="200" r="14" fill="rgba(20,18,40,0.85)" stroke="#818cf8" strokeWidth="0.7" />
        <text x="140" y="202" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" letterSpacing="0.1em" fill="rgba(245,247,255,0.85)">OVERTHINK</text>
      </svg>
    </div>
  );
}

function L3_Showcase() {
  const phones = [
    { rot: -10, x: 60,   z: 1, scale: 0.86, comp: L3_Preview_Weekly },
    { rot: -3,  x: 320,  z: 2, scale: 0.94, comp: L3_Preview_Capsule },
    { rot: 4,   x: 600,  z: 3, scale: 1.0,  comp: L3_Preview_VoiceCall, hero: true },
    { rot: 9,   x: 880,  z: 2, scale: 0.88, comp: L3_Preview_Patterns },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'radial-gradient(80% 60% at 50% 30%, #14122a 0%, #050508 70%)',
      fontFamily: 'Geist, system-ui',
    }}>
      {/* ambient */}
      <div style={{ position: 'absolute', inset: 0,
        background:
          'radial-gradient(40% 40% at 25% 20%, rgba(91,99,220,0.45) 0%, transparent 60%),' +
          'radial-gradient(35% 40% at 75% 75%, rgba(167,139,250,0.35) 0%, transparent 60%),' +
          'radial-gradient(40% 30% at 50% 80%, rgba(77,212,232,0.18) 0%, transparent 60%)',
        filter: 'blur(8px)',
      }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")" }} />

      {/* Top — Wordmark + tagline */}
      <div style={{ position: 'absolute', top: 64, left: 72, color: 'rgba(245,247,255,0.95)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <L3Logo size={22} color="rgba(245,247,255,0.95)" />
          <span style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 16, letterSpacing: '0.4em' }}>MIRROROS</span>
        </div>
        <div className="mo-mono" style={{ marginTop: 22, fontSize: 10.5, letterSpacing: '0.4em', color: 'rgba(167,139,250,0.85)' }}>
          AN OPERATING SYSTEM FOR THE SELF
        </div>
        <div className="mo-serif" style={{ marginTop: 18, fontSize: 72, lineHeight: 0.98, letterSpacing: '-0.03em', maxWidth: 780 }}>
          The first AI that<br />
          <span style={{ fontStyle: 'italic' }}>doesn't fix you.</span><br />
          <span style={{ color: 'rgba(207,214,255,0.65)' }}>It mirrors you.</span>
        </div>
        <div style={{ marginTop: 26, fontFamily: 'Geist', fontWeight: 300, fontSize: 17, lineHeight: 1.6, maxWidth: 560, color: 'rgba(220,225,240,0.72)' }}>
          Emotional intelligence, encrypted by default. Memory you control. A voice that knows when to be quiet.
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
          <button className="mo-pill primary" style={{ height: 54, padding: '0 28px', fontSize: 14 }}>
            Begin · Free for 7 days
          </button>
          <button className="mo-pill" style={{ height: 54, padding: '0 24px', fontSize: 13 }}>
            See the system →
          </button>
        </div>
      </div>

      {/* phones — clustered on the right */}
      <div style={{ position: 'absolute', right: -40, top: 200, width: 1240, height: 700 }}>
        {phones.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: p.x, top: p.hero ? 40 : 110,
            transform: `rotate(${p.rot}deg) scale(${p.scale})`,
            transformOrigin: 'center center',
            zIndex: p.z,
            filter: p.hero ? 'drop-shadow(0 40px 80px rgba(91,99,220,0.6))' : 'drop-shadow(0 24px 50px rgba(0,0,0,0.55))',
          }}>
            <L3_PhoneMock w={260} h={560}>
              <p.comp />
            </L3_PhoneMock>
          </div>
        ))}
      </div>

      {/* Bottom strip with marketing pillars */}
      <div style={{ position: 'absolute', bottom: 64, left: 72, right: 72,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
        {[
          { eye: '01 · MEMORY', t: 'Remembers you across years, not sessions.' },
          { eye: '02 · VOICE',  t: 'A real conversation, not a transcript.' },
          { eye: '03 · TRUST',  t: 'Encrypted before it leaves your device.' },
          { eye: '04 · GROWTH', t: 'Patterns surfaced, gently, on your terms.' },
        ].map((c, i) => (
          <div key={i} style={{ flex: 1, color: 'rgba(245,247,255,0.95)', minWidth: 0,
            paddingTop: 18, borderTop: '0.5px solid rgba(255,255,255,0.12)' }}>
            <div className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(167,139,250,0.85)' }}>{c.eye}</div>
            <div className="mo-serif" style={{ marginTop: 8, fontSize: 18, lineHeight: 1.25, letterSpacing: '-0.015em' }}>{c.t}</div>
          </div>
        ))}
      </div>

      {/* Bottom-right small mark */}
      <div style={{ position: 'absolute', bottom: 22, right: 72,
        fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.4)' }}>
        AVAILABLE · iOS 26 · Q3 2026
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────
window.L3Screens = {
  Personality:   L3_Personality,
  VoiceSettings: L3_VoiceSettings,
  Companion:     L3_Companion,
  Privacy:       L3_Privacy,
  Premium:       L3_Premium,
  Sessions:      L3_Sessions,
  Search:        L3_Search,
  Notifications: L3_Notifications,
  VoiceCall:     L3_VoiceCall,
  Showcase:      L3_Showcase,
};
