import Link from 'next/link';
import { Badge, Button, Card, Kbd, ProgressBar } from 'sketchpad-ui';
import { BrandLogo } from '../../components/BrandLogo';
import { CodeBlock } from '../../components/DocPage';
import { components } from '../../lib/docs-config';

export const metadata = { title: 'Introduction' };

export default function IntroductionPage() {
  return (
    <article className="docArticle">
      <section className="introHero">
        <div className="heroEyebrow">
          <Badge variant="marker" accent="yellow">REACT + FLUTTER</Badge>
          <span>64 COMPONENTS · 6 COLORS · LIGHT/DARK</span>
        </div>
        <div className="heroHeader">
          <BrandLogo size={82} showWordmark={false} asLink={false} className="heroLogo" />
          <div>
            <h1 className="docTitle heroTitle">GAME UI.<br />LOUD &amp; CLEAR.</h1>
            <p className="docDescription">
              Accessible Neubrutalist components for the games and playful products you build
              with React, Next.js, and Flutter.
            </p>
          </div>
        </div>
        <div className="introActions">
          <Link href="/docs/installation"><Button variant="primary">START BUILDING</Button></Link>
          <Link href="/docs/components"><Button variant="filled">BROWSE {components.length}</Button></Link>
        </div>
        <div className="heroHud" aria-label="Example player status">
          <div><span>PLAYER</span><strong>BATMAN_01</strong></div>
          <div><span>ENERGY</span><ProgressBar value={78} /></div>
          <Kbd>⌘ K</Kbd>
        </div>
      </section>

      <section className="docSection">
        <h2 className="docSectionTitle">ONE SYSTEM. TWO NATIVE APIS.</h2>
        <div className="featureGrid">
          <Card title="React / Next.js" description="Typed, tree-shakeable components with SSR-safe themes.">
            <CodeBlock code="npm install sketchpad-ui" />
          </Card>
          <Card title="Flutter Mobile" description="Adaptive widgets, Semantics, focus, touch, and safe areas.">
            <CodeBlock code="flutter pub add sketchpad_ui" />
          </Card>
          <Card title="Arcade themes" description="Blue, yellow, pink, green, orange, purple—and your own accent.">
            <div className="paletteStrip" aria-label="Six included color presets">
              {['blue', 'yellow', 'pink', 'green', 'orange', 'purple'].map((name) => (
                <span key={name} className={`palette-${name}`} />
              ))}
            </div>
          </Card>
        </div>
      </section>
    </article>
  );
}
