import { DocHeader } from '../../../../components/DocPage';
import { TypographyDemo } from '../../../../components/demos';
import type { DocItem } from '../../../../lib/docs-config';

const doc: DocItem = {
  slug: 'typography',
  name: 'Typography',
  description: 'Heading, body, code, and handwritten annotation styles.',
  status: 'shipped',
};

export const metadata = { title: 'Typography' };

export default function TypographyPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />
      <TypographyDemo />
    </article>
  );
}
