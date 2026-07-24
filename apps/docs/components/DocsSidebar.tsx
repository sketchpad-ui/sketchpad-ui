'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Badge,
  Drawer,
  IconButton,
  SketchBorder,
} from 'sketchpad-ui';
import {
  components,
  gettingStarted,
  internalLinks,
  getComponentHref,
  type ComponentStatus,
  type DocItem,
} from '../lib/docs-config';
import { BrandLogo } from './BrandLogo';
import { ThemeControls } from './ThemeControls';

function StatusBadge({ status, slug }: { status: ComponentStatus; slug: string }) {
  if (status === 'shipped') return null;
  if (status === 'partial') {
    return (
      <Badge variant="stamp" seed={`sb-${slug}`} accent="blue" style={{ fontSize: '0.65rem', transform: 'rotate(-3deg)' }}>
        β
      </Badge>
    );
  }
  if (status === 'new') {
    return (
      <Badge variant="marker" seed={`sb-${slug}`} accent="green" style={{ fontSize: '0.65rem' }}>
        new
      </Badge>
    );
  }
  return (
    <span className="sidebarPlannedDot" title="Coming soon" aria-hidden="true" />
  );
}

function SidebarLink({
  slug,
  name,
  status,
  onNavigate,
}: {
  slug: string;
  name: string;
  status: ComponentStatus;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const href = getComponentHref(slug);
  const active = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link href={href} className={`sidebarNavLink ${active ? 'sidebarNavLinkActive' : ''}`} onClick={onNavigate}>
      <span className="sidebarNavLabel">{name}</span>
      <StatusBadge status={status} slug={slug} />
    </Link>
  );
}

function SidebarSection({
  title,
  hint,
  items,
  headerAction,
  onNavigate,
}: {
  title: string;
  hint?: string;
  items: DocItem[];
  headerAction?: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <div className="sidebarSection">
      <div className="sidebarSectionHead">
        <span className="sidebarSectionTitle">{title}</span>
        {headerAction}
      </div>
      {hint && <p className="sidebarSectionHint">{hint}</p>}
      {items.map((item) => (
        <SidebarLink key={item.slug} {...item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="sidebarNav">
      <SidebarSection title={gettingStarted.title} items={gettingStarted.items} onNavigate={onNavigate} />

      <SidebarSection
        title="Components"
        hint={`${components.length} in catalog`}
        items={components}
        onNavigate={onNavigate}
        headerAction={
          <Link href="/docs/components" className="sidebarSectionLink" onClick={onNavigate}>
            All →
          </Link>
        }
      />

      <SidebarSection title={internalLinks.title} items={internalLinks.items} onNavigate={onNavigate} />
    </nav>
  );
}

function SidebarPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="docsSidebarLayout">
      <div className="sidebarHeader">
        <BrandLogo size={30} />
        <ThemeControls />
      </div>

      <div className="sidebarBody sk-scrollbar">
        <SidebarNav onNavigate={onNavigate} />
      </div>

      <div className="sidebarFooter">
        <Link
          href="https://github.com/sketchpad-ui/sketchpad-ui"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebarFooterLink"
          onClick={onNavigate}
        >
          <span className="sidebarFooterText">View on GitHub ↗</span>
        </Link>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="sidebarMobileBar">
        <IconButton aria-label="Open navigation" seed="menu-btn" onClick={() => setMobileOpen(true)}>
          ☰
        </IconButton>
        <BrandLogo size={26} />
      </div>

      <aside className="docsSidebarFrame" aria-label="Documentation">
        <SketchBorder
          variant="rounded"
          fill="paper"
          className="docsSidebarBorder"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <SidebarPanel />
        </SketchBorder>
      </aside>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} side="left">
        <div className="sidebarDrawerInner">
          <SidebarPanel onNavigate={() => setMobileOpen(false)} />
        </div>
      </Drawer>
    </>
  );
}
