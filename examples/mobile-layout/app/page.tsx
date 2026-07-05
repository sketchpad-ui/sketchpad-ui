'use client';

import {
  Button,
  Paper,
  Tabs,
  TextInput,
  Stack,
  HandwrittenNote,
  PhoneMockup,
} from 'sketchpad-ui';

export default function MobileLayoutPage() {
  return (
    <div style={{ padding: 16 }}>
      <Paper seed="mobile-hero">
        <h1 style={{ fontSize: '1.5rem', margin: '0 0 8px' }}>Mobile first</h1>
        <HandwrittenNote className="sk-hide-mobile">
          Decorative annotations hide on small screens
        </HandwrittenNote>
        <p style={{ color: 'var(--sk-colors-inkSoft)', fontSize: '0.9rem' }}>
          Roughness and stroke scale down below 480px per responsive rules.
        </p>
      </Paper>

      <div style={{ marginTop: 16 }}>
        <Tabs
          tabs={[
            { id: 'feed', label: 'Feed' },
            { id: 'saved', label: 'Saved' },
          ]}
          activeId="feed"
        />
      </div>

      <Stack gap={12} style={{ marginTop: 16 }}>
        <TextInput label="Search" placeholder="Find items…" seed="mobile-search" />
        <Button variant="primary" fullWidth seed="mobile-action">
          Continue
        </Button>
      </Stack>

      <div style={{ marginTop: 24 }}>
        <PhoneMockup width={260} height={400}>
          <Stack gap={8}>
            <Paper seed="phone-card-1" tapePinned={false}>
              <div style={{ padding: 12, fontSize: '0.85rem' }}>Card content</div>
            </Paper>
            <Paper seed="phone-card-2">
              <div style={{ padding: 12, fontSize: '0.85rem' }}>Another card</div>
            </Paper>
          </Stack>
        </PhoneMockup>
      </div>
    </div>
  );
}
