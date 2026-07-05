import { tokens, getInkOnPaperContrastRatio } from '@sketchpad/tokens';

export default function TokensPage() {
  const contrast = getInkOnPaperContrastRatio();

  return (
    <div>
      <h1>Design tokens</h1>
      <p>
        Ink on paper contrast ratio: <strong>{contrast.toFixed(1)}:1</strong>{' '}
        {contrast >= 4.5 ? '(WCAG AA pass)' : '(fail)'}
      </p>
      <p style={{ color: 'var(--sk-colors-pencil)' }}>
        Note: <code>pencil</code> is intentionally low-contrast — use for placeholders/disabled only.
      </p>

      <h2>Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
        {Object.entries(tokens.colors).map(([name, value]) => (
          <div key={name} style={{ padding: 12, background: value, border: '1px solid var(--sk-colors-pencil)' }}>
            <strong>{name}</strong>
            <br />
            <code>{value}</code>
          </div>
        ))}
      </div>

      <h2>Roughness</h2>
      <pre className="code">{JSON.stringify(tokens.roughness, null, 2)}</pre>
    </div>
  );
}
