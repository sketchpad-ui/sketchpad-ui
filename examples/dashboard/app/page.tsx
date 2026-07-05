'use client';

import { useState } from 'react';
import {
  Sidebar,
  StatCard,
  Table,
  Paper,
  Grid,
  ProgressBar,
  Navbar,
} from 'sketchpad-ui';

const sidebarItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'settings', label: 'Settings' },
];

const cards = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  label: `Metric ${i + 1}`,
  value: ((i * 137 + 421) % 900) + 100,
}));

export default function DashboardPage() {
  const [active, setActive] = useState('overview');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar items={sidebarItems} activeId={active} onSelect={setActive} />
      <main style={{ flex: 1, padding: 24 }}>
        <Navbar
          items={[{ id: 'dash', label: 'Dashboard' }]}
          activeId="dash"
        />
        <div style={{ marginTop: 24 }}>
        <Grid columns={4} gap={16}>
          <StatCard value="12.4k" label="Total users" trend="up" seed="dash-stat-1" />
          <StatCard value="98.2%" label="Uptime" seed="dash-stat-2" />
          <StatCard value="$4.2k" label="Revenue" trend="up" seed="dash-stat-3" />
          <StatCard value="342" label="Active now" seed="dash-stat-4" />
        </Grid>
        </div>
        <ProgressBar value={72} seed="dash-progress" />
        <div style={{ marginTop: 24 }}>
        <Grid columns={4} gap={12}>
          {cards.map((card) => (
            <Paper key={card.id} seed={`card-${card.id}`}>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--sk-colors-pencil)' }}>{card.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{card.value}</div>
              </div>
            </Paper>
          ))}
        </Grid>
        </div>
        <div style={{ marginTop: 32 }}>
          <Table
            columns={[
              { key: 'name', header: 'Name' },
              { key: 'role', header: 'Role' },
              { key: 'status', header: 'Status' },
            ]}
            data={[
              { name: 'Alice', role: 'Admin', status: 'Active' },
              { name: 'Bob', role: 'Editor', status: 'Active' },
              { name: 'Carol', role: 'Viewer', status: 'Away' },
            ]}
            seed="dash-table"
          />
        </div>
      </main>
    </div>
  );
}
