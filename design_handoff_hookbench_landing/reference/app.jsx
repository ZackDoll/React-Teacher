// App shell: focused on Direction A (Split Console) full-bleed.
// Tweaks: palette + hero layout.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "ink",
  "heroLayout": "split"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Mutate BRAND in place so every component picks up the new palette on re-render.
  setTheme(t.palette);
  // Track for body bg
  React.useEffect(() => {
    document.body.style.background = BRAND.bg0;
    document.body.style.color = BRAND.text;
  }, [t.palette]);

  return (
    <>
      {/* key forces a clean remount on palette change so stale inline colors don't linger */}
      <DirectionA key={t.palette} heroLayout={t.heroLayout} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio
          label="Theme"
          value={t.palette}
          options={['ink', 'paper', 'slate']}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakSection label="Hero" />
        <TweakRadio
          label="Layout"
          value={t.heroLayout}
          options={['split', 'stacked', 'command']}
          onChange={(v) => setTweak('heroLayout', v)}
        />
      </TweaksPanel>
    </>
  );
}

// Initialize theme before first render so body bg matches
setTheme(TWEAK_DEFAULTS.palette);
document.body.style.background = BRAND.bg0;
document.body.style.color = BRAND.text;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
