import { CodeBlock } from '../../../../components/DocPage';
import { DocHeader } from '../../../../components/DocPage';
import type { DocItem } from '../../../../lib/docs-config';

const doc: DocItem = {
  slug: 'installation',
  name: 'Installation',
  description: 'Add Sketchpad UI to a React 18+ or Next.js project.',
  status: 'shipped',
};

export const metadata = { title: 'Installation' };

export default function InstallationPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <section className="docSection">
        <h2 className="docSectionTitle">Install packages</h2>
        <CodeBlock code={`npm install sketchpad-ui @sketchpad/tokens\n# or\npnpm add sketchpad-ui @sketchpad/tokens`} />
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Import styles</h2>
        <p className="docLead">Load design tokens and component styles once in your app entry or root layout.</p>
        <CodeBlock
          code={`import '@sketchpad/tokens/tokens.css';\nimport 'sketchpad-ui/styles.css';`}
        />
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Use a component</h2>
        <CodeBlock
          code={`import { Button } from 'sketchpad-ui';\n\nexport function App() {\n  return <Button variant="primary">Sketch me</Button>;\n}`}
        />
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">Monorepo / workspace</h2>
        <p className="docLead">
          This repo uses pnpm workspaces. Clone{' '}
          <a href="https://github.com/sketchpad-ui/sketchpad-ui" target="_blank" rel="noopener noreferrer">
            sketchpad-ui/sketchpad-ui
          </a>{' '}
          and run <code className="inlineCode">pnpm install && pnpm dev</code>. Docs at{' '}
          <code className="inlineCode">localhost:3000</code>.
        </p>
      </section>
    </article>
  );
}
