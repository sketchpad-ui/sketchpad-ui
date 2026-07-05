import { DocsSidebar } from './DocsSidebar';

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="docsShell">
      <DocsSidebar />
      <div className="docsContent">
        <div className="docsContentInner">{children}</div>
      </div>
    </div>
  );
}
