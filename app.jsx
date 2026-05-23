// MIRROROS app shell — lays all 10 screens onto the design canvas
// inside iOS device frames.

const SCREENS = [
  { id: '01-splash',     label: '01 · Splash',           comp: Screen01_Splash },
  { id: '02-intro',      label: '02 · Intro / Philosophy', comp: Screen02_Intro },
  { id: '03-account',    label: '03 · Account',           comp: Screen03_Account },
  { id: '04-intake',     label: '04 · Emotional Intake',  comp: Screen04_Intake },
  { id: '05-goals',      label: '05 · Goals',             comp: Screen05_Goals },
  { id: '06-voice-perm', label: '06 · Voice Intro',       comp: Screen06_Voice },
  { id: '07-home',       label: '07 · Home Dashboard',    comp: Screen07_Home },
  { id: '08-voice-chat', label: '08 · Voice Conversation', comp: Screen08_VoiceChat },
  { id: '09-journal',    label: '09 · Text Journaling',   comp: Screen09_Journal },
  { id: '10-reflection', label: '10 · AI Reflection',     comp: Screen10_Reflection },
];

const PHONE_W = 360;
const PHONE_H = 780;

function App() {
  return (
    <DesignCanvas>
      <DCSection
        id="mirroros-core"
        title="MIRROROS · Core Flow"
        subtitle="Ten screens. One emotional operating system."
      >
        {SCREENS.map(s => (
          <DCArtboard
            key={s.id}
            id={s.id}
            label={s.label}
            width={PHONE_W}
            height={PHONE_H}
            data-screen-label={s.label}
          >
            <IOSDevice dark width={PHONE_W} height={PHONE_H}>
              <s.comp />
            </IOSDevice>
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
