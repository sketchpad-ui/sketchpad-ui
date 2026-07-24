'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { DocItem } from '../lib/docs-config';
import { getComponentPhase } from '../lib/docs-config';
import { CodeBlock, ComingSoon, DemoBlock, DocHeader } from './DocPage';
import { componentDemos } from './demos';

const usageExamples: Record<string, string> = {
  button: `<Button variant="primary">Play</Button>`,
  input: `<TextInput label="Player name" placeholder="BATMAN_01" />`,
  select: `<Select label="Plan" value={value} onChange={setValue} options={options} />`,
  dialog: `<Modal open={open} onClose={() => setOpen(false)} title="Edit profile">\n  {/* content */}\n</Modal>`,
  toast: `const { toasts, show, dismiss } = useToast();\n\n<Button onClick={() => show('Saved!')}>Save</Button>\n<ToastContainer toasts={toasts} onDismiss={dismiss} />`,
};

export function ComponentDoc({ doc }: { doc: DocItem }) {
  const [framework, setFramework] = useState<'react' | 'flutter'>('react');
  const Demo = componentDemos[doc.slug];
  const snippet = doc.installSnippet ?? `import { ${doc.exportName ?? doc.name.replace(/\s/g, '')} } from 'sketchpad-ui';`;
  const example = usageExamples[doc.slug];
  const flutterName = `Sketch${doc.name.replace(/\s/g, '')}`;
  const flutterSnippet = `import 'package:sketchpad_ui/sketchpad_ui.dart';\n\n${flutterName}(/* ... */)`;

  return (
    <article className="docArticle">
      <DocHeader doc={doc} />
      <div className="frameworkTabs" role="tablist" aria-label="Framework">
        <button type="button" role="tab" aria-selected={framework === 'react'} onClick={() => setFramework('react')}>
          REACT / NEXT.JS
        </button>
        <button type="button" role="tab" aria-selected={framework === 'flutter'} onClick={() => setFramework('flutter')}>
          FLUTTER
        </button>
        <span>PHASE {getComponentPhase(doc.slug)}</span>
      </div>

      {doc.status === 'planned' ? (
        <ComingSoon name={doc.name} />
      ) : framework === 'flutter' ? (
        <>
          <section className="docSection">
            <h2 className="docSectionTitle">MOBILE API</h2>
            <div className="flutterPreview">
              <div className="flutterCapture">
                <Image
                  src="/flutter-gallery.png"
                  alt="Sketchpad UI running in the Flutter mobile gallery"
                  width={390}
                  height={844}
                />
                <div className="flutterCaptureLabel">
                  <span>VERIFIED FLUTTER GALLERY</span>
                  <strong>{doc.name}</strong>
                </div>
              </div>
            </div>
          </section>
          <section className="docSection">
            <h2 className="docSectionTitle">INSTALLATION</h2>
            <CodeBlock code="flutter pub add sketchpad_ui" />
            <CodeBlock code={flutterSnippet} />
          </section>
        </>
      ) : (
        <>
          {Demo ? (
            <section className="docSection">
              <h2 className="docSectionTitle">PREVIEW</h2>
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
            <h2 className="docSectionTitle">INSTALLATION</h2>
            <p className="docLead">Import from the package. Tree-shakeable, only shipped code ships.</p>
            <CodeBlock code={snippet} />
          </section>

          {example && (
            <section className="docSection">
              <h2 className="docSectionTitle">USAGE</h2>
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
