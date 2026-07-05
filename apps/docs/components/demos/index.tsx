'use client';

import { useState } from 'react';
import {
  AlertDialog,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  Drawer,
  Divider,
  EmptyState,
  IconButton,
  Modal,
  Pagination,
  Paper,
  Popover,
  ProgressBar,
  RadioGroup,
  Select,
  Sidebar,
  SkeletonLoader,
  Slider,
  StatCard,
  Table,
  Tabs,
  TextInput,
  Textarea,
  ToastContainer,
  Toggle,
  Tooltip,
  useToast,
  Navbar,
  Stepper,
  SearchInput,
} from 'sketchpad-ui';
import { DemoBlock } from '../DocPage';

export function ButtonDemo() {
  const [count, setCount] = useState(0);
  return (
    <>
      <DemoBlock title="Variants">
        <div className="demoRow">
          <Button variant="primary">Primary</Button>
          <Button variant="filled">Filled</Button>
          <Button variant="accent" accent="blue">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <IconButton aria-label="Add">+</IconButton>
        </div>
      </DemoBlock>
      <DemoBlock title="States">
        <div className="demoRow">
          <Button onClick={() => setCount((c) => c + 1)}>Count: {count}</Button>
          <Button disabled>Disabled</Button>
        </div>
      </DemoBlock>
    </>
  );
}

export function BadgeDemo() {
  return (
    <DemoBlock>
      <div className="demoRow">
        <Badge>New</Badge>
        <Badge variant="stamp">Draft</Badge>
        <Badge variant="marker" accent="yellow">Highlight</Badge>
      </div>
    </DemoBlock>
  );
}

export function AvatarDemo() {
  return (
    <DemoBlock>
      <Avatar placeholder pixelSize={56} seed="doc-avatar" />
    </DemoBlock>
  );
}

export function InputDemo() {
  return (
    <DemoBlock>
      <div className="demoStack">
        <TextInput label="Email" placeholder="you@example.com" seed="doc-input" />
        <SearchInput seed="doc-search" />
      </div>
    </DemoBlock>
  );
}

export function TextareaDemo() {
  return <DemoBlock><Textarea label="Notes" placeholder="Write something…" seed="doc-ta" /></DemoBlock>;
}

export function SelectDemo() {
  const [v, setV] = useState('');
  return (
    <DemoBlock>
      <Select
        label="Plan"
        value={v}
        onChange={setV}
        options={[
          { value: 'starter', label: 'Starter' },
          { value: 'pro', label: 'Pro' },
        ]}
      />
    </DemoBlock>
  );
}

export function CheckboxDemo() {
  const [c, setC] = useState(false);
  return <DemoBlock><Checkbox label="Accept terms" checked={c} onChange={setC} /></DemoBlock>;
}

export function RadioGroupDemo() {
  const [v, setV] = useState('a');
  return (
    <DemoBlock>
      <RadioGroup name="demo" value={v} onChange={setV} options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ]} />
    </DemoBlock>
  );
}

export function SwitchDemo() {
  const [on, setOn] = useState(false);
  return <DemoBlock><Toggle label="Notifications" checked={on} onChange={setOn} /></DemoBlock>;
}

export function SliderDemo() {
  const [v, setV] = useState(40);
  return <DemoBlock><Slider label="Volume" value={v} onChange={setV} /></DemoBlock>;
}

export function TabsDemo() {
  const [id, setId] = useState('one');
  return (
    <DemoBlock>
      <Tabs tabs={[{ id: 'one', label: 'Tab one' }, { id: 'two', label: 'Tab two' }]} activeId={id} onSelect={setId} />
    </DemoBlock>
  );
}

export function BreadcrumbDemo() {
  return (
    <DemoBlock>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Components', href: '/docs/components' }, { label: 'Breadcrumb' }]} />
    </DemoBlock>
  );
}

export function PaginationDemo() {
  const [p, setP] = useState(1);
  return <DemoBlock><Pagination page={p} totalPages={5} onChange={setP} /></DemoBlock>;
}

export function SidebarDemo() {
  return (
    <DemoBlock>
      <Sidebar items={[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Settings' }]} activeId="a" />
    </DemoBlock>
  );
}

export function NavbarDemo() {
  return (
    <DemoBlock>
      <Navbar items={[{ id: 'home', label: 'Home' }, { id: 'docs', label: 'Docs' }]} activeId="docs" />
    </DemoBlock>
  );
}

export function StepperDemo() {
  return (
    <DemoBlock>
      <Stepper steps={[
        { label: 'Start', status: 'done' },
        { label: 'Build', status: 'current' },
        { label: 'Ship', status: 'upcoming' },
      ]} />
    </DemoBlock>
  );
}

export function TableDemo() {
  return (
    <DemoBlock>
      <Table columns={[{ key: 'n', header: 'Name' }, { key: 's', header: 'Status' }]} data={[
        { n: 'Button', s: 'Stable' },
        { n: 'Select', s: 'Beta' },
      ]} />
    </DemoBlock>
  );
}

export function ProgressDemo() {
  return <DemoBlock><ProgressBar value={65} /></DemoBlock>;
}

export function SkeletonDemo() {
  return <DemoBlock><SkeletonLoader lines={3} seed="doc-skel" /></DemoBlock>;
}

export function EmptyDemo() {
  return <DemoBlock><EmptyState title="No items" description="Add your first component to get started." /></DemoBlock>;
}

export function CardDemo() {
  return (
    <DemoBlock>
      <div className="demoRow">
        <Paper seed="doc-card" style={{ padding: 16, minWidth: 200 }}>Paper surface</Paper>
        <StatCard value="1.2k" label="Users" trend="up" />
      </div>
    </DemoBlock>
  );
}

export function TooltipDemo() {
  return (
    <DemoBlock>
      <Tooltip content="Sketch tooltip"><Button variant="ghost">Hover me</Button></Tooltip>
    </DemoBlock>
  );
}

export function PopoverDemo() {
  return (
    <DemoBlock>
      <Popover content={<p style={{ margin: 0 }}>Paper-note popover content.</p>}>
        <Button variant="ghost">Open popover</Button>
      </Popover>
    </DemoBlock>
  );
}

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoBlock>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Dialog">
        <p>Modal content on stacked paper sheets.</p>
      </Modal>
    </DemoBlock>
  );
}

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoBlock>
      <Button variant="accent" accent="red" onClick={() => setOpen(true)}>Delete</Button>
      <AlertDialog open={open} onClose={() => setOpen(false)} title="Are you sure?" description="This action cannot be undone." onConfirm={() => setOpen(false)}>
        {null}
      </AlertDialog>
    </DemoBlock>
  );
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoBlock>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}><p>Drawer panel content.</p></Drawer>
    </DemoBlock>
  );
}

export function ToastDemo() {
  const { toasts, show, dismiss } = useToast();
  return (
    <DemoBlock>
      <Button onClick={() => show('Saved successfully')}>Show toast</Button>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </DemoBlock>
  );
}

export function SeparatorDemo() {
  return (
    <DemoBlock>
      <p>Above</p>
      <Divider seed="doc-sep" />
      <p>Below</p>
    </DemoBlock>
  );
}

export const componentDemos: Record<string, React.ComponentType> = {
  button: ButtonDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  input: InputDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  checkbox: CheckboxDemo,
  'radio-group': RadioGroupDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  tabs: TabsDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  sidebar: SidebarDemo,
  'navigation-menu': NavbarDemo,
  stepper: StepperDemo,
  table: TableDemo,
  'data-table': TableDemo,
  progress: ProgressDemo,
  skeleton: SkeletonDemo,
  empty: EmptyDemo,
  card: CardDemo,
  tooltip: TooltipDemo,
  popover: PopoverDemo,
  dialog: DialogDemo,
  'alert-dialog': AlertDialogDemo,
  drawer: DrawerDemo,
  sheet: DrawerDemo,
  toast: ToastDemo,
  sonner: ToastDemo,
  separator: SeparatorDemo,
};
