'use client';

import { HandwrittenNote } from 'sketchpad-ui';
import type { DocItem } from '../lib/docs-config';
import { CodeBlock, ComingSoon, DemoBlock, DocHeader } from './DocPage';
import { componentDemos } from './demos';

const usageExamples: Record<string, string> = {
  button: `<Button variant="primary" seed="hero-cta">Get started</Button>`,
  input: `<TextInput label="Email" placeholder="you@example.com" seed="signup-email" />`,
  select: `<Select label="Plan" value={value} onChange={setValue} options={options} />`,
  dialog: `<Modal open={open} onClose={() => setOpen(false)} title="Edit profile">\n  {/* content */}\n</Modal>`,
  toast: `const { toasts, show, dismiss } = useToast();\n\n<Button onClick={() => show('Saved!')}>Save</Button>\n<ToastContainer toasts={toasts} onDismiss={dismiss} />`,
};

export function ComponentDoc({ doc }: { doc: DocItem }) {
  const Demo = componentDemos[doc.slug];
  const snippet = doc.installSnippet ?? `import { ${doc.exportName ?? doc.name.replace(/\s/g, '')} } from 'sketchpad-ui';`;
  const example = usageExamples[doc.slug];

  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      {doc.status === 'planned' ? (
        <ComingSoon name={doc.name} />
      ) : (
        <>
          {Demo ? (
            <section className="docSection">
              <HandwrittenNote className="docSectionTitle">Preview</HandwrittenNote>
              <Demo />
            </section>
          ) : (
            <section className="docSection">
              <DemoBlock>
                <p className="docMuted">Live demo coming soon. The component is available in the package.</p>
              </DemoBlock>
            </section>
          )}

          <section className="docSection">
            <HandwrittenNote className="docSectionTitle">Installation</HandwrittenNote>
            <p className="docLead">Import from the package. Tree-shakeable, only shipped code ships.</p>
            <CodeBlock code={snippet} />
          </section>

          {example && (
            <section className="docSection">
              <HandwrittenNote className="docSectionTitle">Usage</HandwrittenNote>
              <CodeBlock code={example} />
            </section>
          )}

          {doc.status === 'partial' && (
            <section className="docSection">
              <p className="docMuted">
                This page maps to a partial implementation. See{' '}
                <a href="https://github.com/sketchpad-ui/sketchpad-ui/blob/main/ROADMAP.md" target="_blank" rel="noopener noreferrer">
                  ROADMAP.md
                </a>{' '}
                for the full component roadmap.
              </p>
            </section>
          )}
        </>
      )}
    </article>
  );
}
