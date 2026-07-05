import { notFound } from 'next/navigation';
import { ComponentDoc } from '../../../../../components/ComponentDoc';
import { components, getComponent } from '../../../../../lib/docs-config';

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponent(slug);
  if (!doc) return {};
  return { title: doc.name, description: doc.description };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponent(slug);
  if (!doc) notFound();
  return <ComponentDoc doc={doc} />;
}
