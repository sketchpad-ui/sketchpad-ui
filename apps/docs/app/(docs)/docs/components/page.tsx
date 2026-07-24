import { ComponentCard } from '../../../../components/ComponentCard';
import { components, newComponents } from '../../../../lib/docs-config';

export const metadata = { title: 'Components' };

export default function ComponentsIndexPage() {
  const partial = components.filter((c) => c.status === 'partial');
  const planned = components.filter((c) => c.status === 'planned' || c.status === 'new');

  return (
    <article className="docArticle">
      <header className="docHeader">
        <h1 className="docTitle">Components</h1>
        <p className="docDescription">
          {components.length} cross-framework components for game interfaces. Filter by phase,
          switch framework APIs, and test every palette in light or dark mode.
        </p>
      </header>

      <ComponentGroup title={`NEW COMPONENTS (${newComponents.length})`} items={newComponents} />
      <ComponentGroup title={`ALL COMPONENTS (${components.length})`} items={components} />
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
      <h2 className="docSectionTitle">{title}</h2>
      <div className={`componentGrid ${muted ? 'componentGridMuted' : ''}`}>
        {items.map((item) => (
          <ComponentCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
