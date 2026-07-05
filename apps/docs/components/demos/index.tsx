'use client';

import { useState } from 'react';
import {
  Accordion,
  Alert,
  AlertDialog,
  Attachment,
  Avatar,
  Badge,
  Bubble,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Collapsible,
  Drawer,
  Divider,
  EmptyState,
  Field,
  IconButton,
  Kbd,
  Label,
  Marker,
  Message,
  MessageScroller,
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
  Spinner,
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
      <div className="demoStack" style={{ maxWidth: 420 }}>
        <Card title="Project summary" description="Sketch-framed card with header and footer slots." footer={<Button size="sm">Save</Button>}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--sk-colors-inkSoft)' }}>
            Use Card for grouped content. Paper and StatCard remain available for simpler layouts.
          </p>
        </Card>
        <div className="demoRow">
          <Paper seed="doc-card" style={{ padding: 16, minWidth: 160 }}>Paper</Paper>
          <StatCard value="1.2k" label="Users" trend="up" />
        </div>
      </div>
    </DemoBlock>
  );
}

export function AlertDemo() {
  return (
    <DemoBlock>
      <div className="demoStack">
        <Alert title="Heads up">Your sketch export is ready to download.</Alert>
        <Alert variant="destructive" title="Error">Something went wrong. Try again.</Alert>
      </div>
    </DemoBlock>
  );
}

export function SpinnerDemo() {
  return (
    <DemoBlock>
      <div className="demoRow">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    </DemoBlock>
  );
}

export function KbdDemo() {
  return (
    <DemoBlock>
      <p style={{ margin: 0 }}>
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
      </p>
    </DemoBlock>
  );
}

export function LabelDemo() {
  return (
    <DemoBlock>
      <Label htmlFor="demo-label-input" required>
        Username
      </Label>
      <TextInput id="demo-label-input" placeholder="batman" seed="label-demo" />
    </DemoBlock>
  );
}

export function FieldDemo() {
  return (
    <DemoBlock>
      <Field label="Email" hint="We never share your email." error="">
        <TextInput placeholder="you@example.com" seed="field-demo" />
      </Field>
    </DemoBlock>
  );
}

export function AccordionDemo() {
  return (
    <DemoBlock>
      <Accordion
        items={[
          { id: 'a', title: 'What is Sketchpad UI?', content: 'A hand-sketched React component library.' },
          { id: 'b', title: 'Is it accessible?', content: 'Components follow WCAG patterns with keyboard support.' },
        ]}
      />
    </DemoBlock>
  );
}

export function CollapsibleDemo() {
  return (
    <DemoBlock>
      <Collapsible trigger="Show details">
        <p style={{ margin: 0 }}>Extra content revealed with a sketch chevron trigger.</p>
      </Collapsible>
    </DemoBlock>
  );
}

export function BubbleDemo() {
  return (
    <DemoBlock>
      <div className="demoStack">
        <Bubble variant="received">Hey, did you see the new components?</Bubble>
        <Bubble variant="sent">Yes. They look great in dark mode.</Bubble>
      </div>
    </DemoBlock>
  );
}

export function MessageDemo() {
  return (
    <DemoBlock>
      <Message author="Alex" time="2:41 PM" align="received">
        Sketch borders on every message.
      </Message>
    </DemoBlock>
  );
}

export function MessageScrollerDemo() {
  return (
    <DemoBlock>
      <MessageScroller
        messages={[
          { id: '1', content: 'Morning!', author: 'Alex', time: '9:00', align: 'received' },
          { id: '2', content: 'Ready to ship v0.2?', author: 'You', time: '9:01', align: 'sent', status: 'read' },
          { id: '3', content: 'Almost. Adding chat components now.', author: 'You', time: '9:02', align: 'sent', status: 'delivered' },
        ]}
      />
    </DemoBlock>
  );
}

export function AttachmentDemo() {
  return (
    <DemoBlock>
      <Attachment name="wireframe-v2.png" fileSize="240 KB" onRemove={() => undefined} />
    </DemoBlock>
  );
}

export function MarkerDemo() {
  return (
    <DemoBlock>
      <div className="demoRow">
        <Marker status="sent" />
        <Marker status="delivered" />
        <Marker status="read" />
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
  accordion: AccordionDemo,
  alert: AlertDemo,
  attachment: AttachmentDemo,
  bubble: BubbleDemo,
  button: ButtonDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  card: CardDemo,
  collapsible: CollapsibleDemo,
  field: FieldDemo,
  input: InputDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  marker: MarkerDemo,
  message: MessageDemo,
  'message-scroller': MessageScrollerDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  checkbox: CheckboxDemo,
  'radio-group': RadioGroupDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  spinner: SpinnerDemo,
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
