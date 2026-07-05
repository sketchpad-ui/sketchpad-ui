import { tokensLight, tokensDark, themes, getInkOnPaperContrastRatio } from '@sketchpad/tokens';
import { CodeBlock, DocHeader } from '../../../components/DocPage';
import type { DocItem } from '../../../lib/docs-config';

const doc: DocItem = {
  slug: 'tokens',
  name: 'Tokens',
  description: 'Colors, roughness, stroke weights, and CSS custom properties for light and dark themes.',
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
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}`}
        />
        <p className="docMuted">
          Manual overrides set <code className="inlineCode">data-sk-theme=&quot;light&quot;</code> or{' '}
          <code className="inlineCode">&quot;dark&quot;</code> on <code className="inlineCode">&lt;html&gt;</code>.
          Use the sidebar toggle to try it on this site.
        </p>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Contrast</h2>
        <p className="docLead">
          Light ink on paper: <strong>{lightContrast.toFixed(1)}:1</strong>{' '}
          {lightContrast >= 4.5 ? '(WCAG AA pass)' : '(fail)'}
        </p>
        <p className="docLead">
          Dark ink on paper: <strong>{darkContrast.toFixed(1)}:1</strong>{' '}
          {darkContrast >= 4.5 ? '(WCAG AA pass)' : '(fail)'}
        </p>
        <p className="docMuted">
          <code className="inlineCode">pencil</code> is intentionally low-contrast. Use for placeholders and disabled
          states only.
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
        <h2 className="docSectionTitle">CSS variables</h2>
        <p className="docMuted">All color tokens are available as custom properties, e.g. var(--sk-colors-paper).</p>
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
        <h2 className="docSectionTitle">Roughness</h2>
        <CodeBlock code={JSON.stringify(themes.light.roughness, null, 2)} />
      </section>
    </article>
  );
}
