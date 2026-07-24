import { CodeBlock } from '../../../../components/DocPage';
import { DocHeader } from '../../../../components/DocPage';
import type { DocItem } from '../../../../lib/docs-config';

const doc: DocItem = {
  slug: 'installation',
  name: 'Installation',
  description: 'Add Sketchpad UI to React, Next.js, or Flutter.',
  status: 'shipped',
};

export const metadata = { title: 'Installation' };

export default function InstallationPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />

      <section className="docSection">
        <h2 className="docSectionTitle">REACT / NEXT.JS</h2>
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
          code={`import { Button, ThemeProvider } from 'sketchpad-ui';\n\nexport function App() {\n  return (\n    <ThemeProvider defaultTheme="system" defaultColor="blue">\n      <Button variant="primary">Play</Button>\n    </ThemeProvider>\n  );\n}`}
        />
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">FLUTTER</h2>
        <CodeBlock code="flutter pub add sketchpad_ui" />
        <CodeBlock code={`import 'package:sketchpad_ui/sketchpad_ui.dart';\n\nMaterialApp(\n  theme: sketchpadMaterialTheme(SketchpadThemeData.light()),\n  darkTheme: sketchpadMaterialTheme(SketchpadThemeData.dark()),\n  home: Scaffold(\n    body: SketchButton(onPressed: () {}, child: const Text('Play')),\n  ),\n);`} />
      </section>
    </article>
  );
}
