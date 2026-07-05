'use client';

import { useState } from 'react';
import {
  Navbar,
  Sidebar,
  Tabs,
  Breadcrumbs,
  Pagination,
  Stepper,
  Paper,
} from 'sketchpad-ui';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'docs', label: 'Docs' },
  { id: 'about', label: 'About' },
];

export default function NavigationPage() {
  const [active, setActive] = useState('home');
  const [page, setPage] = useState(1);

  return (
    <div>
      <h1>Navigation</h1>
      <Paper className="demoBox" seed="nav-demo">
        <Navbar items={navItems} activeId={active} onSelect={setActive} />
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
          <Sidebar items={navItems} activeId={active} onSelect={setActive} />
          <div>
            <Tabs tabs={navItems} activeId={active} onSelect={setActive} />
            <div style={{ marginTop: 16 }}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Components', href: '/components/button' },
                  { label: 'Navigation' },
                ]}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Pagination page={page} totalPages={5} onChange={setPage} />
        </div>
        <div style={{ marginTop: 24 }}>
          <Stepper
            steps={[
              { label: 'Start', status: 'done' },
              { label: 'Configure', status: 'current' },
              { label: 'Finish', status: 'upcoming' },
            ]}
          />
        </div>
      </Paper>
    </div>
  );
}
