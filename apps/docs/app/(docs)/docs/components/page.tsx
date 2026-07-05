import { HandwrittenNote } from 'sketchpad-ui';
import { ComponentCard } from '../../../../components/ComponentCard';
import { components } from '../../../../lib/docs-config';

export const metadata = { title: 'Components' };

export default function ComponentsIndexPage() {
  const shipped = components.filter((c) => c.status === 'shipped');
  const partial = components.filter((c) => c.status === 'partial');
  const planned = components.filter((c) => c.status === 'planned' || c.status === 'new');

  return (
    <article className="docArticle">
      <header className="docHeader">
        <h1 className="docTitle">Components</h1>
        <p className="docDescription">
          {components.length} components in the catalog. Every page is built with Sketchpad UI. Shipped components include
          live previews and copy-paste snippets.
        </p>
      </header>

      <ComponentGroup title={`Available (${shipped.length})`} items={shipped} />
      <ComponentGroup title={`Partial (${partial.length})`} items={partial} />
      <ComponentGroup title={`Planned (${planned.length})`} items={planned} muted />
    </article>
  );
}

function ComponentGroup({
  title,
  items,
  muted,
}: {
  title: string;
  items: typeof components;
  muted?: boolean;
}) {
  return (
    <section className="docSection">
      <HandwrittenNote className="docSectionTitle">{title}</HandwrittenNote>
      <div className={`componentGrid ${muted ? 'componentGridMuted' : ''}`}>
        {items.map((item) => (
          <ComponentCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
