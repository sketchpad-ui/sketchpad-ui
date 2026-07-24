import { accentPresets, tokensLight, tokensDark, getInkOnPaperContrastRatio } from '@sketchpad/tokens';
import { CodeBlock, DocHeader } from '../../../components/DocPage';
import type { DocItem } from '../../../lib/docs-config';

const doc: DocItem = {
  slug: 'tokens',
  name: 'Tokens',
  description: 'Semantic colors, six arcade accents, hard shadows, shape, and motion tokens.',
  status: 'shipped',
};

export const metadata = { title: 'Tokens' };

const colorKeys = Object.keys(tokensLight.colors) as (keyof typeof tokensLight.colors)[];

export default function TokensPage() {
  const lightContrast = getInkOnPaperContrastRatio('light');
  const darkContrast = getInkOnPaperContrastRatio('dark');

  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <section className="docSection">
        <h2 className="docSectionTitle">Theming</h2>
        <p className="docLead">
          Import <code className="inlineCode">@sketchpad/tokens/tokens.css</code> once. System dark mode works
          automatically via <code className="inlineCode">prefers-color-scheme</code>.
        </p>
        <CodeBlock
          code={`import '@sketchpad/tokens/tokens.css';
import { getThemeInitScript } from '@sketchpad/tokens';
import { ThemeProvider, ThemeToggle } from 'sketchpad-ui';

// In root layout <head> (before React):
// <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="system" defaultColor="blue">
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}`}
        />
        <p className="docMuted">
          Set <code className="inlineCode">defaultColor</code> to blue, yellow, pink, green,
          orange, or purple. A validated <code className="inlineCode">customAccent</code> accepts
          any six-digit hex color and derives a readable foreground.
        </p>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Contrast</h2>
        <p className="docLead">
          Light text on canvas: <strong>{lightContrast.toFixed(1)}:1</strong>{' '}
          {lightContrast >= 4.5 ? '(WCAG AA pass)' : '(fail)'}
        </p>
        <p className="docLead">
          Dark text on canvas: <strong>{darkContrast.toFixed(1)}:1</strong>{' '}
          {darkContrast >= 4.5 ? '(WCAG AA pass)' : '(fail)'}
        </p>
        <p className="docMuted">
          Accent foregrounds are selected automatically; muted colors are reserved for
          secondary text, placeholders, and disabled states.
        </p>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Colors</h2>
        <div className="tokenThemeGrid">
          {colorKeys.map((name) => (
            <div key={name} className="tokenThemeRow">
              <strong className="tokenThemeName">{name}</strong>
              <div className="tokenThemeSwatches">
                <div className="tokenSwatchPair">
                  <div
                    className="tokenSwatchColor"
                    style={{ background: tokensLight.colors[name] }}
                    title={tokensLight.colors[name]}
                  />
                  <code className="inlineCode">{tokensLight.colors[name]}</code>
                </div>
                <div className="tokenSwatchPair">
                  <div
                    className="tokenSwatchColor tokenSwatchColorDark"
                    style={{ background: tokensDark.colors[name] }}
                    title={tokensDark.colors[name]}
                  />
                  <code className="inlineCode">{tokensDark.colors[name]}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">ACCENT PRESETS</h2>
        <div className="tokenGrid">
          {Object.entries(accentPresets).map(([name, color]) => (
            <div key={name} className="tokenCard">
              <div className="tokenSwatchColor" style={{ background: color }} />
              <strong>{name}</strong>
              <code>{color}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">CSS variables</h2>
        <p className="docMuted">All semantic tokens are custom properties, e.g. var(--sk-colors-surface).</p>
        <div className="tokenGrid">
          {colorKeys.map((name) => (
            <div key={name} className="tokenCard" style={{ background: `var(--sk-colors-${name})` }}>
              <strong>{name}</strong>
              <code>{`var(--sk-colors-${name})`}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">SHAPE &amp; MOTION</h2>
        <CodeBlock code={JSON.stringify({ border: tokensLight.border, radii: tokensLight.radii, shadow: tokensLight.shadow, motion: tokensLight.motion }, null, 2)} />
      </section>
    </article>
  );
}
