'use client';

import {
  Table,
  Timeline,
  StatCard,
  ProgressBar,
  SkeletonLoader,
  EmptyState,
  Paper,
} from 'sketchpad-ui';

const tableData = [
  { name: 'Button', status: 'Stable' },
  { name: 'Select', status: 'Beta' },
  { name: 'Modal', status: 'Stable' },
];

export default function DataPage() {
  return (
    <div>
      <h1>Data display</h1>
      <Paper className="demoBox" seed="data-demo">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <StatCard value="1,234" label="Users" trend="up" />
          <StatCard value="89%" label="Uptime" trend="down" seed="stat-2" />
        </div>
        <ProgressBar value={65} />
        <div style={{ marginTop: 24 }}>
          <Table
            columns={[
              { key: 'name', header: 'Component' },
              { key: 'status', header: 'Status' },
            ]}
            data={tableData}
          />
        </div>
        <div style={{ marginTop: 24 }}>
          <Timeline
            events={[
              { title: 'Project started', date: 'Jan 2026' },
              { title: 'sketch-core shipped', description: 'Path engine v0.1' },
            ]}
          />
        </div>
        <div style={{ marginTop: 24 }}>
          <SkeletonLoader lines={3} seed="demo-skel" />
        </div>
        <div style={{ marginTop: 24 }}>
          <EmptyState title="No items yet" description="Add your first component to get started" />
        </div>
      </Paper>
    </div>
  );
}
