import { ComingSoon, DocHeader } from '../../../../components/DocPage';
import type { DocItem } from '../../../../lib/docs-config';

const doc: DocItem = {
  slug: 'typography',
  name: 'Typography',
  description: 'Heading, body, code, and handwritten annotation styles.',
  status: 'planned',
};

export const metadata = { title: 'Typography' };

export default function TypographyPage() {
  return (
    <article className="docArticle">
      <DocHeader doc={doc} />
      <ComingSoon name={doc.name} />
    </article>
  );
}
