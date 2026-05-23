// MIRROROS — Layer II screens
// Insight · Memory · Pattern · Growth · Observation
// Each returns JSX filling a parent rect. Designed to live inside <IOSDevice dark>.

// ─────────────────────────────────────────────────────────────
// Shared atoms (mirror those in screens.jsx so this file stands alone)
// ─────────────────────────────────────────────────────────────
function L2Logo({ size = 14, color = 'rgba(245,247,255,0.95)' }) {
  return (
    <svg width={size * 2.2} height={size} viewBox="0 0 22 10" fill="none" style={{ display: 'block' }}>
      <circle cx="6.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="15.5" cy="5" r="4.4" stroke={color} strokeWidth="0.7" />
      <circle cx="11" cy="5" r="1.4" fill={color} />
    </svg>
  );
}
function L2StatusGap() { return <div style={{ height: 62 }} />; }

function L2NavBar({ title, sub, onBack = true, right = null }) {
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
      ) : <L2Logo size={11} color="rgba(245,247,255,0.7)" />}
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

function L2BottomNav({ active = 'insights' }) {
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

// Small particle/glow dot used as a "node" marker
function L2GlowDot({ size = 8, hue = 'violet' }) {
  const map = {
    violet: 'radial-gradient(circle, #fff 0%, #a78bfa 55%, transparent 100%)',
    indigo: 'radial-gradient(circle, #fff 0%, #818cf8 55%, transparent 100%)',
    teal:   'radial-gradient(circle, #fff 0%, #67e8f9 55%, transparent 100%)',
    rose:   'radial-gradient(circle, #fff 0%, #fda4af 55%, transparent 100%)',
    sun:    'radial-gradient(circle, #fff 0%, #fcd34d 55%, transparent 100%)',
  };
  const glow = {
    violet: 'rgba(167,139,250,0.6)',
    indigo: 'rgba(129,140,248,0.55)',
    teal:   'rgba(103,232,249,0.55)',
    rose:   'rgba(253,164,175,0.55)',
    sun:    'rgba(252,211,77,0.55)',
  };
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: map[hue], filter: `drop-shadow(0 0 6px ${glow[hue]})`,
    }} />
  );
}

// Reusable eyebrow
function L2Eyebrow({ children, color = 'rgba(167,139,250,0.85)' }) {
  return (
    <div className="mo-mono" style={{
      fontSize: 10, letterSpacing: '0.3em', color, textTransform: 'uppercase',
    }}>{children}</div>
  );
}

// Reusable serif heading
function L2Headline({ children, size = 32, style = {} }) {
  return (
    <h1 className="mo-serif" style={{
      margin: '14px 0 0', fontSize: size, lineHeight: 1.08,
      color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.025em',
      textWrap: 'pretty', ...style,
    }}>{children}</h1>
  );
}

// ═════════════════════════════════════════════════════════════
// 11 · Weekly Insight Report — "Your Inner Patterns"
// ═════════════════════════════════════════════════════════════
function L2_WeeklyReport() {
  // Build a smooth emotional trend path
  const pts = [0.52, 0.48, 0.6, 0.42, 0.32, 0.55, 0.7];
  const w = 320, h = 80;
  const dx = w / (pts.length - 1);
  const path = pts.map((p, i) => {
    const x = i * dx;
    const y = h - p * h;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.55 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar onBack={false} sub="WEEK 14" title="Apr 29 — May 05" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 14 14"><path d="M7 1v8M3 6l4 4 4-4M1 13h12" stroke="rgba(245,247,255,0.85)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      } />

      <div style={{ padding: '18px 26px 0' }}>
        <L2Eyebrow>YOUR INNER PATTERNS</L2Eyebrow>
        <L2Headline size={34}>
          A week of quiet<br /><span style={{ fontStyle: 'italic' }}>recalibration.</span>
        </L2Headline>
        <p style={{ marginTop: 14, fontFamily: 'Geist', fontSize: 13, lineHeight: 1.55, color: 'rgba(220,225,240,0.6)', fontWeight: 300, maxWidth: 280 }}>
          Below the surface, three currents repeated. Two softened. One asked to be looked at.
        </p>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <div className="mo-glass" style={{ padding: 18, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <L2Eyebrow color="rgba(200,210,230,0.55)">EMOTIONAL TREND</L2Eyebrow>
            <span style={{ fontFamily: 'Geist', fontSize: 11.5, color: 'rgba(167,139,250,0.85)', fontWeight: 500 }}>+18% steadier</span>
          </div>
          <svg width="100%" height={h + 32} viewBox={`0 0 ${w} ${h + 32}`} style={{ marginTop: 10, display: 'block' }}>
            <defs>
              <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%"  stopColor="#a78bfa" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="trendLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#cfd6ff" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <filter id="trendGlow"><feGaussianBlur stdDeviation="2.2" /></filter>
            </defs>
            <g transform="translate(0, 8)">
              {[0.25, 0.5, 0.75].map((y, i) => (
                <line key={i} x1="0" x2={w} y1={y * h} y2={y * h} stroke="rgba(255,255,255,0.05)" />
              ))}
              <path d={area} fill="url(#trendArea)" />
              <path d={path} stroke="url(#trendLine)" strokeWidth="1.8" fill="none" filter="url(#trendGlow)" opacity="0.6" />
              <path d={path} stroke="url(#trendLine)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {pts.map((p, i) => (
                <circle key={i} cx={i * dx} cy={h - p * h} r={i === 4 ? 4 : 2.5}
                  fill={i === 4 ? '#fff' : 'rgba(245,247,255,0.85)'}
                  stroke={i === 4 ? '#a78bfa' : 'none'} strokeWidth="1.5" />
              ))}
              {/* annotation at low point */}
              <line x1={4 * dx} x2={4 * dx} y1={h - 0.32 * h - 6} y2={h - 0.32 * h - 22} stroke="rgba(167,139,250,0.5)" strokeDasharray="2 2" />
            </g>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <text key={i} x={i * dx} y={h + 24} fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.15em"
                fill="rgba(200,210,230,0.45)" textAnchor="middle">{d}</text>
            ))}
          </svg>
          <div style={{ marginTop: 6, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 14, lineHeight: 1.4, color: 'rgba(220,225,240,0.7)' }}>
            Thursday was your quietest day. Sunday, you returned.
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 18px 0' }}>
        <L2Eyebrow color="rgba(200,210,230,0.55)">RECURRING LOOPS</L2Eyebrow>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { t: 'I should have said something.', n: 11, hue: 'rose' },
            { t: 'I don\'t want to be a burden.',  n: 7,  hue: 'violet' },
            { t: 'I\'m fine. I\'ll handle it.',     n: 5,  hue: 'indigo' },
          ].map((l, i) => (
            <div key={i} className="mo-glass" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <L2GlowDot size={9} hue={l.hue} />
              <div style={{ flex: 1, fontFamily: 'Instrument Serif', fontSize: 16, color: 'rgba(245,247,255,0.95)', lineHeight: 1.3 }}>"{l.t}"</div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(200,210,230,0.5)' }}>×{l.n}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div className="mo-glass" style={{ padding: 12 }}>
          <L2Eyebrow color="rgba(103,232,249,0.85)">TRIGGER</L2Eyebrow>
          <div style={{ marginTop: 6, fontFamily: 'Instrument Serif', fontSize: 15, lineHeight: 1.25, color: 'rgba(245,247,255,0.95)' }}>Sundays after 9pm.</div>
          <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.5)' }}>Anticipation spike, 4 of 4 weeks.</div>
        </div>
        <div className="mo-glass" style={{ padding: 12 }}>
          <L2Eyebrow color="rgba(252,211,77,0.85)">CONTRADICTION</L2Eyebrow>
          <div style={{ marginTop: 6, fontFamily: 'Instrument Serif', fontSize: 15, lineHeight: 1.25, color: 'rgba(245,247,255,0.95)' }}>Said "rest." Did 51 hours.</div>
          <div style={{ marginTop: 4, fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.5)' }}>Goal vs. behavior, this week.</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 22, right: 22 }}>
        <button className="mo-pill primary" style={{ width: '100%', height: 50, fontSize: 14 }}>
          Read the full mirror →
        </button>
      </div>

      <L2BottomNav active="insights" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 12 · Emotional Timeline — major life moments / shifts
// ═════════════════════════════════════════════════════════════
function L2_Timeline() {
  const items = [
    { date: 'TODAY',         tag: 'SHIFT',       t: 'Spoke a fear out loud.',           sub: 'To the mirror. First time in months.', hue: 'violet', anchor: true },
    { date: 'APR 12',        tag: 'BREAKTHROUGH', t: 'Stopped editing myself for him.',  sub: 'Three sentences. He stayed.',          hue: 'sun' },
    { date: 'MAR 28',        tag: 'GRIEF',       t: 'Mom\'s birthday. The first one.',  sub: 'I lit two candles instead of one.',    hue: 'rose' },
    { date: 'FEB 02',        tag: 'PATTERN',     t: 'Began saying "I don\'t know" again.', sub: 'It felt like coming up for air.',    hue: 'indigo' },
    { date: 'JAN · NEW YEAR', tag: 'THRESHOLD',  t: 'Began MIRROROS.',                   sub: 'Entry 01 — "I want to know myself."',  hue: 'teal' },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" style={{ opacity: 0.55 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="A SOFT CHRONOLOGY" title="Your Timeline" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" /><path d="M9 9l4 4" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
      } />
      <div style={{ padding: '18px 26px 0' }}>
        <L2Eyebrow>2024 — 2025</L2Eyebrow>
        <L2Headline size={32}>
          The shape of a<br /><span style={{ fontStyle: 'italic' }}>year that changed you.</span>
        </L2Headline>
      </div>

      <div style={{ position: 'relative', padding: '24px 28px 0', height: 460, overflow: 'hidden' }}>
        {/* Vertical thread */}
        <div style={{
          position: 'absolute', top: 30, bottom: 0, left: 48, width: 1,
          background: 'linear-gradient(180deg, rgba(167,139,250,0.6) 0%, rgba(167,139,250,0.15) 70%, rgba(167,139,250,0) 100%)',
        }} />
        {/* breathing glow trailing the thread */}
        <div style={{
          position: 'absolute', top: 30, bottom: 60, left: 30, width: 36,
          background: 'radial-gradient(closest-side, rgba(167,139,250,0.2), transparent 70%)',
          filter: 'blur(8px)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {items.map((it, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: 36 }}>
              <div style={{ position: 'absolute', left: 12, top: 8, width: 14, height: 14, borderRadius: 7,
                background: it.anchor
                  ? 'radial-gradient(circle, #fff 0%, #a78bfa 50%, transparent 100%)'
                  : 'rgba(20,18,40,0.95)',
                border: it.anchor ? '0px' : '1px solid rgba(167,139,250,0.7)',
                boxShadow: it.anchor ? '0 0 16px rgba(167,139,250,0.9)' : '0 0 8px rgba(167,139,250,0.4)',
              }}>
                {!it.anchor && <span style={{
                  position: 'absolute', inset: 4, borderRadius: 3,
                  background: 'radial-gradient(circle, #fff 0%, transparent 70%)', opacity: 0.6,
                }} />}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(200,210,230,0.55)' }}>{it.date}</span>
                <span className="mo-mono" style={{ fontSize: 9.5, letterSpacing: '0.28em', color: 'rgba(167,139,250,0.85)' }}>· {it.tag}</span>
              </div>
              <div className="mo-serif" style={{ marginTop: 4, fontSize: 19, lineHeight: 1.2, color: 'rgba(245,247,255,0.96)', letterSpacing: '-0.015em' }}>{it.t}</div>
              <div style={{ marginTop: 3, fontFamily: 'Geist', fontSize: 12, lineHeight: 1.5, color: 'rgba(220,225,240,0.55)', fontWeight: 300 }}>{it.sub}</div>
            </div>
          ))}
        </div>
        {/* Fade at bottom suggesting continuation */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 80,
          background: 'linear-gradient(180deg, transparent, #050508 90%)', pointerEvents: 'none',
        }} />
      </div>

      <L2BottomNav active="insights" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 13 · Pattern Recognition — interconnected nodes
// ═════════════════════════════════════════════════════════════
function L2_Patterns() {
  // Nodes laid out manually within an SVG viewport.
  const W = 320, H = 320;
  const nodes = [
    { id: 'people',  x: 160, y: 70,  r: 30, label: 'PEOPLE\nPLEASING',   hue: '#fda4af', primary: true },
    { id: 'aband',   x: 70,  y: 150, r: 22, label: 'ABANDON-\nMENT',     hue: '#a78bfa' },
    { id: 'avoid',   x: 250, y: 150, r: 22, label: 'AVOIDANCE',          hue: '#67e8f9' },
    { id: 'valid',   x: 100, y: 250, r: 18, label: 'VALIDATION',         hue: '#fcd34d' },
    { id: 'over',    x: 220, y: 250, r: 18, label: 'OVERTHINKING',       hue: '#818cf8' },
    { id: 'suppr',   x: 160, y: 200, r: 14, label: 'SUPPRESSION',        hue: '#cfd6ff', subtle: true },
  ];
  const edges = [
    ['people', 'aband', 0.9], ['people', 'avoid', 0.55], ['people', 'valid', 0.7],
    ['aband', 'valid', 0.6], ['avoid', 'over', 0.7], ['suppr', 'people', 0.45],
    ['suppr', 'avoid', 0.4], ['over', 'people', 0.5],
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="CONSCIOUSNESS MAP" title="Pattern Recognition" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" /><circle cx="7" cy="7" r="2.5" fill="rgba(245,247,255,0.85)" /></svg>
        </div>
      } />
      <div style={{ padding: '14px 26px 0' }}>
        <L2Eyebrow>SIX SHAPES YOU LIVE INSIDE</L2Eyebrow>
        <L2Headline size={26} style={{ marginTop: 10 }}>
          What keeps recurring,<br /><span style={{ fontStyle: 'italic' }}>quietly, beneath you.</span>
        </L2Headline>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="primaryNode">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#fda4af" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7c1f3a" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="ambientHalo">
              <stop offset="0%" stopColor="rgba(167,139,250,0.25)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0)" />
            </radialGradient>
          </defs>

          {/* Ambient halo behind the cluster */}
          <circle cx={W / 2} cy={170} r={170} fill="url(#ambientHalo)" />

          {/* edges */}
          {edges.map(([a, b, w], i) => {
            const A = byId[a], B = byId[b];
            return (
              <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                stroke={`rgba(207,214,255,${0.18 + w * 0.4})`} strokeWidth={0.6 + w * 1.0}
                strokeLinecap="round" />
            );
          })}

          {/* nodes */}
          {nodes.map(n => (
            <g key={n.id} filter={n.primary ? 'url(#nodeGlow)' : ''}>
              <circle cx={n.x} cy={n.y} r={n.r + 8} fill={n.primary ? 'url(#primaryNode)' : `${n.hue}`} opacity={n.primary ? 1 : 0.12} />
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.primary ? 'url(#primaryNode)' : 'rgba(20,18,40,0.7)'}
                stroke={n.hue} strokeOpacity={n.subtle ? 0.4 : 0.85} strokeWidth="1" />
              {!n.primary && <circle cx={n.x - n.r * 0.35} cy={n.y - n.r * 0.35} r={2} fill={n.hue} opacity="0.9" />}
              {n.label.split('\n').map((line, j) => (
                <text key={j} x={n.x} y={n.y + (j - (n.label.split('\n').length - 1) / 2) * 10 + 3}
                  fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.12em"
                  fill={n.primary ? '#fff' : 'rgba(245,247,255,0.88)'} textAnchor="middle">
                  {line}
                </text>
              ))}
            </g>
          ))}
        </svg>
      </div>

      <div style={{ padding: '0 18px' }}>
        <div className="mo-glass" style={{ padding: 14, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 14, left: -6, width: 12, height: 12, borderRadius: 6, background: 'radial-gradient(circle, #fff 0%, #a78bfa 60%, transparent 100%)', filter: 'drop-shadow(0 0 6px rgba(167,139,250,0.6))' }} />
          <L2Eyebrow>MIRROR · OBSERVES</L2Eyebrow>
          <div style={{ marginTop: 6, fontFamily: 'Instrument Serif', fontSize: 16, lineHeight: 1.35, color: 'rgba(245,247,255,0.92)' }}>
            Pleasing is the brightest node — and it pulls from the fear of being left. Tend to one, and the other softens.
          </div>
        </div>
      </div>

      <L2BottomNav active="insights" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 14 · Observer Mode — metacognition / pause
// ═════════════════════════════════════════════════════════════
function L2_Observer() {
  const [phase, setPhase] = React.useState('in');
  React.useEffect(() => {
    const seq = ['in', 'hold', 'out', 'hold2'];
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % seq.length; setPhase(seq[i]); }, 4000);
    return () => clearInterval(t);
  }, []);
  const label = { in: 'BREATHE IN', hold: 'HOLD', out: 'BREATHE OUT', hold2: 'REST' }[phase];
  const scale = { in: 1.18, hold: 1.18, out: 0.82, hold2: 0.82 }[phase];

  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" style={{ opacity: 0.85 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="OBSERVER MODE" title="A pause, on purpose." />

      {/* concentric circles, slow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {[280, 220, 160].map((d, i) => (
          <div key={i} style={{
            position: 'absolute', top: -d / 2, left: -d / 2, width: d, height: d, borderRadius: '50%',
            border: '0.5px solid rgba(167,139,250,0.18)',
            transform: `scale(${scale})`, transition: 'transform 4s cubic-bezier(.4,0,.2,1)',
            opacity: 0.6 - i * 0.1,
          }} />
        ))}
        <div className="mo-orb" style={{
          width: 100, height: 100, position: 'absolute', top: -50, left: -50,
          transform: `scale(${scale})`, transition: 'transform 4s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>

      <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, transform: 'translateY(140px)', textAlign: 'center' }}>
        <L2Eyebrow>{label}</L2Eyebrow>
      </div>

      <div style={{ position: 'absolute', top: 200, left: 0, right: 0, textAlign: 'center', padding: '0 36px' }}>
        <div className="mo-serif" style={{ fontSize: 22, lineHeight: 1.3, color: 'rgba(245,247,255,0.92)', letterSpacing: '-0.015em', textWrap: 'pretty' }}>
          You are not the thought.<br />
          <span style={{ fontStyle: 'italic', opacity: 0.85 }}>You are the one watching it pass.</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 200, left: 32, right: 32, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          'Notice where in your body you feel this.',
          'Name one thought without believing it.',
          'Soften your jaw, your shoulders, your eyes.',
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
            background: 'rgba(255,255,255,0.03)', borderRadius: 14,
            border: '0.5px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(167,139,250,0.7)', boxShadow: '0 0 6px rgba(167,139,250,0.5)' }} />
            <span style={{ fontFamily: 'Instrument Serif', fontSize: 14, color: 'rgba(220,225,240,0.78)', lineHeight: 1.3 }}>{p}</span>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button className="mo-pill" style={{ height: 46, padding: '0 22px', fontSize: 13 }}>End softly</button>
        <button className="mo-pill primary" style={{ height: 46, padding: '0 22px', fontSize: 13 }}>3 more minutes</button>
      </div>

      <div style={{ position: 'absolute', bottom: 28, left: 0, right: 0, textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.35)' }}>SESSION · 02:47</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 15 · Daily Insight Feed — intentional, not social
// ═════════════════════════════════════════════════════════════
function L2_DailyFeed() {
  const items = [
    {
      kind: 'PHILOSOPHY · STOIC',
      meta: 'Marcus Aurelius',
      body: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
      tone: 'serif',
    },
    {
      kind: 'FOR YOU · PROMPT',
      meta: 'A question to sit with',
      body: 'What is one small thing you stopped doing for yourself this week — and why did it feel necessary?',
      tone: 'serif-italic',
    },
    {
      kind: 'PSYCHOLOGY',
      meta: 'On emotional suppression',
      body: 'Feelings unattended do not leave. They find quieter rooms to live in — your shoulders, your sleep, your tone.',
      tone: 'sans',
    },
    {
      kind: 'YOUR REFLECTION',
      meta: 'From entry · Mar 28',
      body: 'I lit two candles instead of one. It felt right.',
      tone: 'serif',
    },
  ];
  const toneStyle = (tone) => tone === 'serif-italic'
    ? { fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 19, lineHeight: 1.35, color: 'rgba(245,247,255,0.96)' }
    : tone === 'serif'
    ? { fontFamily: 'Instrument Serif', fontSize: 19, lineHeight: 1.35, color: 'rgba(245,247,255,0.96)' }
    : { fontFamily: 'Geist', fontWeight: 300, fontSize: 15.5, lineHeight: 1.5, color: 'rgba(230,232,245,0.85)' };
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.5 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar onBack={false} sub="TUESDAY · MAY 21" title="Today's Mirror" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="13" height="13" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" /><circle cx="7" cy="7" r="1.4" fill="rgba(245,247,255,0.85)" /></svg>
        </div>
      } />

      <div style={{ padding: '14px 26px 0' }}>
        <L2Eyebrow>FOUR ITEMS · CURATED FOR TODAY</L2Eyebrow>
        <L2Headline size={28}>
          A slow read for<br /><span style={{ fontStyle: 'italic' }}>a thinking mind.</span>
        </L2Headline>
      </div>

      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 460, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} className="mo-glass mo-tap" style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110,
              background: i === 1
                ? 'radial-gradient(circle, rgba(252,211,77,0.18) 0%, transparent 60%)'
                : 'radial-gradient(circle, rgba(167,139,250,0.16) 0%, transparent 60%)',
              filter: 'blur(8px)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <L2Eyebrow color={i === 1 ? 'rgba(252,211,77,0.85)' : 'rgba(167,139,250,0.85)'}>{it.kind}</L2Eyebrow>
              <span style={{ fontFamily: 'Geist', fontSize: 10.5, color: 'rgba(200,210,230,0.4)', letterSpacing: '0.1em' }}>{it.meta}</span>
            </div>
            <div style={{ marginTop: 10, ...toneStyle(it.tone) }}>{it.body}</div>
            <div style={{ marginTop: 12, display: 'flex', gap: 16, fontFamily: 'Geist', fontSize: 11, color: 'rgba(200,210,230,0.5)' }}>
              <span>Save</span>
              <span>Reflect</span>
              <span>Why this?</span>
            </div>
          </div>
        ))}
      </div>

      <L2BottomNav active="insights" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 16 · Growth Path — staged progression
// ═════════════════════════════════════════════════════════════
function L2_GrowthPath() {
  const stages = [
    { n: 'I',   t: 'Emotional Awareness',     d: 'Naming what you feel without flinching.', state: 'done' },
    { n: 'II',  t: 'Pattern Recognition',     d: 'Seeing the shapes you live inside.',       state: 'done' },
    { n: 'III', t: 'Emotional Regulation',    d: 'Holding intensity without becoming it.',   state: 'now', pct: 0.42 },
    { n: 'IV',  t: 'Identity Reconstruction', d: 'Choosing the self you keep.',              state: 'next' },
    { n: 'V',   t: 'Conscious Living',        d: 'Acting from clarity, not reflex.',         state: 'far' },
  ];

  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.55 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="THE LONG ARC" title="Your Growth Path" />
      <div style={{ padding: '16px 26px 0' }}>
        <L2Eyebrow>STAGE III OF V · 87 DAYS IN</L2Eyebrow>
        <L2Headline size={30}>
          You are between<br /><span style={{ fontStyle: 'italic' }}>knowing and steadying.</span>
        </L2Headline>
      </div>

      <div style={{ padding: '24px 28px 0', position: 'relative' }}>
        {/* connecting line */}
        <div style={{
          position: 'absolute', left: 56, top: 36, bottom: 16, width: 1,
          background: 'linear-gradient(180deg, rgba(167,139,250,0.7) 0%, rgba(167,139,250,0.7) 38%, rgba(167,139,250,0.25) 42%, rgba(167,139,250,0.15) 100%)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {stages.map((s, i) => {
            const done = s.state === 'done';
            const now = s.state === 'now';
            const next = s.state === 'next';
            return (
              <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', position: 'relative' }}>
                {/* node */}
                <div style={{
                  width: 36, height: 36, borderRadius: 18, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: now
                    ? 'radial-gradient(circle, #fff 0%, #a78bfa 60%, #5b63dc 100%)'
                    : done
                      ? 'linear-gradient(180deg, rgba(167,139,250,0.95), rgba(111,123,255,0.95))'
                      : 'rgba(20,18,40,0.6)',
                  border: now ? '0.5px solid rgba(255,255,255,0.5)' : '0.5px solid rgba(167,139,250,0.35)',
                  boxShadow: now
                    ? 'inset 0 0.5px 0 rgba(255,255,255,0.55), 0 0 24px rgba(167,139,250,0.6)'
                    : done ? 'inset 0 0.5px 0 rgba(255,255,255,0.35), 0 0 10px rgba(167,139,250,0.35)' : 'none',
                }}>
                  {done ? (
                    <svg width="12" height="10" viewBox="0 0 12 10"><path d="M1 5l3.5 3.5L11 1.5" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <span style={{ fontFamily: 'Instrument Serif', fontSize: 14, color: now ? '#1a1330' : 'rgba(245,247,255,0.55)' }}>{s.n}</span>
                  )}
                </div>

                <div style={{ flex: 1, paddingTop: 1, opacity: s.state === 'far' ? 0.45 : 1 }}>
                  <div className="mo-serif" style={{ fontSize: 19, lineHeight: 1.15, color: 'rgba(245,247,255,0.96)', letterSpacing: '-0.02em',
                    fontStyle: now ? 'italic' : 'normal' }}>{s.t}</div>
                  <div style={{ marginTop: 3, fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.4, color: 'rgba(220,225,240,0.55)', fontWeight: 300 }}>{s.d}</div>
                  {now && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${s.pct * 100}%`,
                          background: 'linear-gradient(90deg, #cfd6ff, #a78bfa)',
                          boxShadow: '0 0 10px rgba(167,139,250,0.7)', borderRadius: 2 }} />
                      </div>
                      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: '0.15em', color: 'rgba(200,210,230,0.55)' }}>
                        <span>STEADYING · 42%</span>
                        <span>NEXT: NAME THE TRIGGER</span>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'rgba(167,139,250,0.08)', border: '0.5px solid rgba(167,139,250,0.25)' }}>
                      <span style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(167,139,250,0.7)' }} />
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(207,214,255,0.75)' }}>WAITING FOR YOU</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <L2BottomNav active="insights" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 17 · Emotional Check-In — spectrum
// ═════════════════════════════════════════════════════════════
function L2_CheckIn() {
  // Russell circumplex-style cloud (original layout)
  const emotions = [
    { t: 'tender',    x: 25, y: 22, s: 17, on: true },
    { t: 'restless',  x: 70, y: 18, s: 14 },
    { t: 'quiet',     x: 48, y: 35, s: 22 },
    { t: 'grateful',  x: 18, y: 50, s: 14 },
    { t: 'lonely',    x: 78, y: 48, s: 16 },
    { t: 'tired',     x: 40, y: 60, s: 18 },
    { t: 'hopeful',   x: 65, y: 72, s: 13 },
    { t: 'numb',      x: 24, y: 78, s: 12 },
    { t: 'soft',      x: 52, y: 88, s: 11 },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="EVENING · 9:14" title="How is it, really?" />
      <div style={{ padding: '14px 26px 0' }}>
        <L2Eyebrow>EMOTIONAL CHECK-IN</L2Eyebrow>
        <L2Headline size={30}>
          Touch what fits.<br /><span style={{ fontStyle: 'italic' }}>Skip what doesn't.</span>
        </L2Headline>
      </div>

      {/* Emotion cloud — original word cloud over soft gradient field */}
      <div style={{ position: 'relative', height: 240, margin: '14px 22px 0',
        borderRadius: 22, overflow: 'hidden',
        background:
          'radial-gradient(80% 60% at 30% 25%, rgba(167,139,250,0.18) 0%, transparent 60%),' +
          'radial-gradient(80% 60% at 75% 75%, rgba(111,123,255,0.18) 0%, transparent 60%),' +
          'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
        border: '0.5px solid rgba(255,255,255,0.06)',
        boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.06)',
      }}>
        {/* axes labels (subtle) */}
        {[
          { t: 'CALM',     pos: { left: 12, top: '50%' }, rot: -90 },
          { t: 'ACTIVATED',pos: { right: 12, top: '50%' }, rot: 90 },
          { t: 'PLEASANT', pos: { top: 8, left: '50%' } },
          { t: 'HEAVY',    pos: { bottom: 8, left: '50%' } },
        ].map((a, i) => (
          <span key={i} className="mo-mono" style={{
            position: 'absolute', ...a.pos, transform: `${a.rot ? `rotate(${a.rot}deg)` : ''} translate(-50%, -50%)`,
            fontSize: 8.5, letterSpacing: '0.3em', color: 'rgba(200,210,230,0.4)',
          }}>{a.t}</span>
        ))}
        {emotions.map((e, i) => (
          <span key={i} className="mo-tap" style={{
            position: 'absolute', left: `${e.x}%`, top: `${e.y}%`, transform: 'translate(-50%, -50%)',
            fontFamily: 'Instrument Serif', fontStyle: e.on ? 'italic' : 'normal',
            fontSize: e.s, color: e.on ? 'rgba(245,247,255,1)' : 'rgba(220,225,240,0.55)',
            letterSpacing: '-0.01em',
            textShadow: e.on ? '0 0 18px rgba(167,139,250,0.7)' : 'none',
            padding: e.on ? '4px 10px' : 0,
            borderRadius: e.on ? 999 : 0,
            background: e.on ? 'linear-gradient(180deg, rgba(167,139,250,0.22), rgba(111,123,255,0.06))' : 'transparent',
            border: e.on ? '0.5px solid rgba(167,139,250,0.55)' : 'none',
          }}>{e.t}</span>
        ))}
      </div>

      {/* Why - small textfield */}
      <div style={{ padding: '14px 22px 0' }}>
        <div className="mo-glass" style={{ padding: 14 }}>
          <L2Eyebrow color="rgba(200,210,230,0.55)">A LINE, IF YOU HAVE ONE</L2Eyebrow>
          <div style={{ marginTop: 8, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 16, lineHeight: 1.35, color: 'rgba(220,225,240,0.7)' }}>
            "Tender, because she remembered the small thing."
          </div>
        </div>
      </div>

      {/* Energy / voice / save */}
      <div style={{ padding: '12px 22px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="mo-glass" style={{ flex: 1, padding: '10px 14px' }}>
          <L2Eyebrow color="rgba(200,210,230,0.55)">ENERGY</L2Eyebrow>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            {[1,2,3,4,5,6,7].map(n => (
              <span key={n} style={{
                flex: 1, height: 8, borderRadius: 4,
                background: n <= 3
                  ? 'linear-gradient(180deg, rgba(167,139,250,0.9), rgba(111,123,255,0.9))'
                  : 'rgba(255,255,255,0.08)',
                boxShadow: n === 3 ? '0 0 8px rgba(167,139,250,0.5)' : 'none',
              }} />
            ))}
          </div>
        </div>
        <div className="mo-glass mo-tap" style={{ width: 52, height: 52, borderRadius: 26,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(180deg, rgba(167,139,250,0.95), rgba(111,123,255,0.95))',
          border: '0.5px solid rgba(255,255,255,0.35)',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45), 0 0 18px rgba(167,139,250,0.5)',
        }}>
          <svg width="14" height="18" viewBox="0 0 14 18">
            <rect x="4" y="1" width="6" height="10" rx="3" fill="white" />
            <path d="M1 9c0 3 2.7 5.5 6 5.5s6-2.5 6-5.5M7 14.5V17" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>

      <L2BottomNav active="home" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 18 · Memory & Reflection — searchable archive
// ═════════════════════════════════════════════════════════════
function L2_Memory() {
  const months = [
    { m: 'MAY 2025', count: 18, intensity: 0.55 },
    { m: 'APR 2025', count: 24, intensity: 0.78 },
    { m: 'MAR 2025', count: 31, intensity: 0.95 },
    { m: 'FEB 2025', count: 12, intensity: 0.32 },
    { m: 'JAN 2025', count: 22, intensity: 0.68 },
  ];
  const entries = [
    { type: 'JOURNAL',      d: 'May 18', t: 'On the small bravery of asking twice.' },
    { type: 'BREAKTHROUGH', d: 'Apr 12', t: 'I stopped editing myself for him.' },
    { type: 'CONVERSATION', d: 'Apr 02', t: 'Mirror on grief that arrives in waves.' },
    { type: 'REFLECTION',   d: 'Mar 28', t: 'Two candles, instead of one.' },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient soft" style={{ opacity: 0.5 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="ARCHIVE · 287 ENTRIES" title="Memory & Reflection" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" /><path d="M9 9l4 4" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" strokeLinecap="round" /></svg>
        </div>
      } />

      <div style={{ padding: '14px 26px 0' }}>
        <L2Eyebrow>YOUR INNER ARCHIVE</L2Eyebrow>
        <L2Headline size={28}>
          Everything you've ever<br /><span style={{ fontStyle: 'italic' }}>quietly thought.</span>
        </L2Headline>
      </div>

      {/* Search bar */}
      <div style={{ padding: '16px 22px 0' }}>
        <div className="mo-glass" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" stroke="rgba(245,247,255,0.65)" strokeWidth="1.2" fill="none" /><path d="M9 9l4 4" stroke="rgba(245,247,255,0.65)" strokeWidth="1.2" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(220,225,240,0.55)' }}>"the time I felt brave…"</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.18em', color: 'rgba(167,139,250,0.7)' }}>SEMANTIC</span>
        </div>
      </div>

      {/* Month heatstrip */}
      <div style={{ padding: '14px 22px 0' }}>
        <L2Eyebrow color="rgba(200,210,230,0.55)">BY MONTH</L2Eyebrow>
        <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
          {months.map((m, i) => (
            <div key={i} className="mo-tap" style={{ flex: 1, position: 'relative' }}>
              <div style={{
                height: 64, borderRadius: 12,
                background: `linear-gradient(180deg, rgba(167,139,250,${0.08 + m.intensity * 0.35}), rgba(111,123,255,${0.04 + m.intensity * 0.2}))`,
                border: '0.5px solid rgba(167,139,250,0.25)',
                boxShadow: `inset 0 0.5px 0 rgba(255,255,255,0.12), 0 0 ${10 + m.intensity * 14}px rgba(167,139,250,${m.intensity * 0.35})`,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6,
              }}>
                <span style={{ fontFamily: 'Instrument Serif', fontSize: 18, color: 'rgba(245,247,255,0.95)' }}>{m.count}</span>
              </div>
              <div style={{ marginTop: 6, textAlign: 'center', fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.18em', color: 'rgba(200,210,230,0.5)' }}>{m.m}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 22px 0' }}>
        <L2Eyebrow color="rgba(200,210,230,0.55)">RESURFACED FOR YOU</L2Eyebrow>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entries.map((e, i) => (
            <div key={i} className="mo-glass mo-tap" style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(111,123,255,0.18))',
                border: '0.5px solid rgba(167,139,250,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 18, color: 'rgba(245,247,255,0.9)' }}>{e.type[0]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="mo-mono" style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(167,139,250,0.8)' }}>{e.type} · {e.d}</div>
                <div style={{ marginTop: 2, fontFamily: 'Instrument Serif', fontSize: 15.5, lineHeight: 1.3, color: 'rgba(245,247,255,0.94)' }}>{e.t}</div>
              </div>
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5h6M5 2l3 3-3 3" stroke="rgba(200,210,230,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          ))}
        </div>
      </div>

      <L2BottomNav active="journal" />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 19 · AI Insight Capsule — short audio reflection
// ═════════════════════════════════════════════════════════════
function L2_Capsule() {
  return (
    <div className="mo-screen">
      <div className="mo-ambient deep" />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="CAPSULE · 38 OF 124" title="A reflection for you." right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="12" height="14" viewBox="0 0 12 14"><path d="M1 12V2l10 5-10 5z" fill="rgba(245,247,255,0.85)" /></svg>
        </div>
      } />

      {/* Big serif quotation */}
      <div style={{ padding: '24px 32px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 16, left: 22, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 80, lineHeight: 1, color: 'rgba(167,139,250,0.25)' }}>"</div>
        <div className="mo-serif" style={{ marginTop: 18, fontSize: 26, lineHeight: 1.25, color: 'rgba(245,247,255,0.98)', letterSpacing: '-0.02em', textWrap: 'pretty' }}>
          You called it overthinking.<br />
          <span style={{ fontStyle: 'italic' }}>It might be care, with nowhere to land.</span>
        </div>
      </div>

      {/* Audio orb */}
      <div style={{ position: 'relative', margin: '34px auto 0', width: 220, height: 220 }}>
        <div style={{ position: 'absolute', inset: -36, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.3) 0%, transparent 65%)', animation: 'mo-orb-breathe 4s ease-in-out infinite alternate' }} />
        <div className="mo-orb" style={{ width: '100%', height: '100%' }} />
        {/* play triangle on the orb */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-46%, -50%)',
          width: 0, height: 0, borderLeft: '22px solid rgba(255,255,255,0.95)',
          borderTop: '14px solid transparent', borderBottom: '14px solid transparent',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.6))',
        }} />
      </div>

      {/* Waveform progress */}
      <div style={{ position: 'absolute', bottom: 220, left: 32, right: 32 }}>
        <div className="mo-wave" style={{ width: '100%', justifyContent: 'space-between' }}>
          {Array.from({ length: 44 }).map((_, i) => {
            const playing = i < 14;
            return (
              <i key={i} style={{
                animationDelay: `${(i * 0.04) % 1.4}s`,
                animationPlayState: playing ? 'running' : 'paused',
                opacity: playing ? 0.85 : 0.28,
                background: playing
                  ? 'linear-gradient(180deg, #cfd6ff, #a78bfa)'
                  : 'linear-gradient(180deg, #4b4d6a, #2a2a47)',
                height: 6 + (Math.sin(i / 2.2) + 1) * 14,
              }} />
            );
          })}
        </div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.15em', color: 'rgba(200,210,230,0.55)' }}>
          <span>00:42</span>
          <span>02:18</span>
        </div>
      </div>

      {/* What it's connected to */}
      <div style={{ position: 'absolute', bottom: 138, left: 22, right: 22 }}>
        <div className="mo-glass" style={{ padding: 12 }}>
          <L2Eyebrow color="rgba(200,210,230,0.55)">CONNECTED TO</L2Eyebrow>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['overthinking loop', 'self-criticism', 'entry · may 18', 'fear of being too much'].map((t, i) => (
              <span key={i} style={{
                padding: '4px 10px', borderRadius: 999, fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: '0.12em',
                background: 'rgba(167,139,250,0.1)', border: '0.5px solid rgba(167,139,250,0.3)',
                color: 'rgba(220,225,240,0.78)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ position: 'absolute', bottom: 70, left: 22, right: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="mo-glass mo-tap" style={{ width: 48, height: 48, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1v12M11 1L3 7l8 6V1z" stroke="rgba(245,247,255,0.9)" strokeWidth="1.3" fill="rgba(245,247,255,0.9)" strokeLinejoin="round" /></svg>
        </div>
        <div className="mo-tap" style={{
          width: 64, height: 64, borderRadius: 32,
          background: 'linear-gradient(180deg, rgba(167,139,250,0.95), rgba(111,123,255,0.95))',
          border: '0.5px solid rgba(255,255,255,0.4)',
          boxShadow: 'inset 0 0.5px 0 rgba(255,255,255,0.45), 0 0 24px rgba(167,139,250,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="16" viewBox="0 0 14 16">
            <rect x="1" y="1" width="4" height="14" rx="1" fill="white" />
            <rect x="9" y="1" width="4" height="14" rx="1" fill="white" />
          </svg>
        </div>
        <div className="mo-glass mo-tap" style={{ width: 48, height: 48, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M11 1v12M3 1l8 6-8 6V1z" stroke="rgba(245,247,255,0.9)" strokeWidth="1.3" fill="rgba(245,247,255,0.9)" strokeLinejoin="round" /></svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center' }}>
        <span className="mo-mono" style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(200,210,230,0.4)' }}>VOICE · MIRROR · LOW</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// 20 · Personalized Reading Recommendations
// ═════════════════════════════════════════════════════════════
function L2_Reading() {
  const books = [
    { title: 'The Wisdom of Insecurity', author: 'Alan Watts', kind: 'PHILOSOPHY',
      reason: 'For the loop of needing to be certain before you can rest.',
      pattern: 'overthinking', shift: 'From control to trust',
      tone: { from: '#a78bfa', to: '#5b63dc' } },
    { title: 'The Body Keeps the Score', author: 'Bessel van der Kolk', kind: 'PSYCHOLOGY',
      reason: 'Your shoulders carry what your mouth doesn\'t.',
      pattern: 'suppression', shift: 'Naming what the body remembers',
      tone: { from: '#fda4af', to: '#9d3957' } },
    { title: 'When Things Fall Apart', author: 'Pema Chödrön', kind: 'MINDFULNESS',
      reason: 'For Sundays. For the ache that arrives without warning.',
      pattern: 'anticipatory grief', shift: 'Staying when you want to flee',
      tone: { from: '#67e8f9', to: '#1f6d80' } },
  ];
  return (
    <div className="mo-screen">
      <div className="mo-ambient" style={{ opacity: 0.5 }} />
      <div className="mo-grain" /><div className="mo-vignette" />
      <L2StatusGap />
      <L2NavBar sub="A LIBRARY FOR YOU" title="Three quiet readings" right={
        <div className="mo-glass mo-tap" style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2h10v10H2z" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" fill="none" /><path d="M2 5h10M5 2v10" stroke="rgba(245,247,255,0.85)" strokeWidth="1.2" /></svg>
        </div>
      } />
      <div style={{ padding: '14px 26px 0' }}>
        <L2Eyebrow>CHOSEN FROM PATTERNS</L2Eyebrow>
        <L2Headline size={28}>
          Books that may meet<br /><span style={{ fontStyle: 'italic' }}>where you are.</span>
        </L2Headline>
      </div>

      <div style={{ padding: '18px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {books.map((b, i) => (
          <div key={i} className="mo-glass" style={{ padding: 14, display: 'flex', gap: 14, position: 'relative', overflow: 'hidden' }}>
            <div style={{
              flexShrink: 0, width: 72, height: 102, borderRadius: 4, position: 'relative',
              background: `linear-gradient(160deg, ${b.tone.from}, ${b.tone.to})`,
              boxShadow: `0 0 24px ${b.tone.from}55, inset 0 0.5px 0 rgba(255,255,255,0.3), 0 8px 18px rgba(0,0,0,0.4)`,
              overflow: 'hidden',
            }}>
              {/* subtle "fabric" gloss */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(255,255,255,0.18), transparent 40%, rgba(0,0,0,0.25))' }} />
              <div style={{ position: 'absolute', top: 8, left: 8, right: 8, fontFamily: 'Instrument Serif', fontSize: 11, lineHeight: 1.15, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em' }}>
                {b.title}
              </div>
              <div style={{ position: 'absolute', bottom: 8, left: 8, right: 8, fontFamily: 'JetBrains Mono', fontSize: 6.5, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.65)' }}>
                {b.author.toUpperCase()}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <L2Eyebrow>{b.kind}</L2Eyebrow>
              <div className="mo-serif" style={{ marginTop: 4, fontSize: 18, lineHeight: 1.2, color: 'rgba(245,247,255,0.96)' }}>{b.title}</div>
              <div style={{ marginTop: 2, fontFamily: 'Geist', fontSize: 11.5, color: 'rgba(200,210,230,0.55)' }}>by {b.author}</div>
              <div style={{ marginTop: 8, fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 13.5, lineHeight: 1.4, color: 'rgba(220,225,240,0.78)' }}>
                "{b.reason}"
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <span style={{ padding: '3px 8px', borderRadius: 999, fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.15em',
                  background: 'rgba(167,139,250,0.1)', border: '0.5px solid rgba(167,139,250,0.3)', color: 'rgba(220,225,240,0.78)' }}>
                  PATTERN · {b.pattern.toUpperCase()}
                </span>
                <span style={{ padding: '3px 8px', borderRadius: 999, fontFamily: 'JetBrains Mono', fontSize: 8.5, letterSpacing: '0.15em',
                  background: 'rgba(103,232,249,0.08)', border: '0.5px solid rgba(103,232,249,0.25)', color: 'rgba(220,235,245,0.78)' }}>
                  SHIFT · {b.shift.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 22, right: 22 }}>
        <button className="mo-pill" style={{ width: '100%', height: 48, fontSize: 13 }}>
          See full reading path →
        </button>
      </div>

      <L2BottomNav active="insights" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────
window.L2Screens = {
  WeeklyReport: L2_WeeklyReport,
  Timeline:     L2_Timeline,
  Patterns:     L2_Patterns,
  Observer:     L2_Observer,
  DailyFeed:    L2_DailyFeed,
  GrowthPath:   L2_GrowthPath,
  CheckIn:      L2_CheckIn,
  Memory:       L2_Memory,
  Capsule:      L2_Capsule,
  Reading:      L2_Reading,
};
