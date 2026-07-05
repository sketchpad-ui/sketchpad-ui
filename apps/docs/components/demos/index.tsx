'use client';

import { useState } from 'react';
import {
  Accordion,
  Alert,
  AlertDialog,
  Attachment,
  AspectRatio,
  Avatar,
  Badge,
  Bubble,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  Chart,
  Checkbox,
  Collapsible,
  Combobox,
  Command,
  ContextMenu,
  DataTable,
  DatePicker,
  DirectionProvider,
  Drawer,
  Divider,
  DropdownMenu,
  EmptyState,
  Field,
  HoverCard,
  IconButton,
  InputGroup,
  InputOTP,
  Item,
  Kbd,
  Label,
  Marker,
  Menubar,
  Message,
  MessageScroller,
  Modal,
  NativeSelect,
  NavigationMenu,
  Pagination,
  Paper,
  Popover,
  ProgressBar,
  RadioGroup,
  Resizable,
  ScrollArea,
  Select,
  Sidebar,
  SkeletonLoader,
  Slider,
  Sonner,
  Spinner,
  StatCard,
  Switch,
  Table,
  Tabs,
  TextInput,
  Textarea,
  ToastContainer,
  Toggle,
  ToggleGroup,
  Tooltip,
  useSonner,
  useToast,
  Navbar,
  Stepper,
  SearchInput,
  Heading,
  Text,
  Lead,
  Muted,
  Code,
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
  return <DemoBlock><Switch label="Notifications" checked={on} onChange={setOn} /></DemoBlock>;
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

export function NavigationMenuDemo() {
  return (
    <DemoBlock>
      <NavigationMenu
        activeId="products"
        items={[
          { id: 'products', label: 'Products', items: [{ id: 'ui', label: 'Sketchpad UI' }, { id: 'tokens', label: 'Tokens' }] },
          { id: 'docs', label: 'Docs' },
        ]}
      />
    </DemoBlock>
  );
}

export function MenubarDemo() {
  return (
    <DemoBlock>
      <Menubar
        menus={[
          { id: 'file', label: 'File', items: [{ id: 'new', label: 'New' }, { id: 'open', label: 'Open' }] },
          { id: 'edit', label: 'Edit', items: [{ id: 'undo', label: 'Undo' }, { id: 'redo', label: 'Redo' }] },
        ]}
      />
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

export function DataTableDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <DemoBlock>
      <DataTable
        selectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'status', header: 'Status' },
        ]}
        data={[
          { id: '1', name: 'Button', status: 'Stable' },
          { id: '2', name: 'Select', status: 'Beta' },
          { id: '3', name: 'Chart', status: 'New' },
        ]}
      />
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
      <div className="demoText">
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette.
      </div>
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

export function SonnerDemo() {
  const { toasts, show, dismiss } = useSonner();
  return (
    <DemoBlock>
      <Button onClick={() => show('Changes published')}>Show sonner toast</Button>
      <Sonner toasts={toasts} onDismiss={dismiss} />
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

export function ButtonGroupDemo() {
  const [v, setV] = useState('left');
  return (
    <DemoBlock>
      <ButtonGroup
        value={v}
        onChange={setV}
        items={[
          { id: 'left', label: 'Left' },
          { id: 'center', label: 'Center' },
          { id: 'right', label: 'Right' },
        ]}
      />
    </DemoBlock>
  );
}

export function InputGroupDemo() {
  return (
    <DemoBlock>
      <Field label="Website">
        <InputGroup prefix="https://" suffix=".dev">
          <TextInput placeholder="sketchpad" seed="ig-demo" />
        </InputGroup>
      </Field>
    </DemoBlock>
  );
}

export function InputOtpDemo() {
  const [v, setV] = useState('');
  return (
    <DemoBlock>
      <InputOTP length={6} value={v} onChange={setV} />
    </DemoBlock>
  );
}

export function NativeSelectDemo() {
  return (
    <DemoBlock>
      <NativeSelect
        label="Region"
        defaultValue="us"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'eu', label: 'Europe' },
        ]}
      />
    </DemoBlock>
  );
}

export function ToggleGroupDemo() {
  const [v, setV] = useState<string[]>(['bold']);
  return (
    <DemoBlock>
      <ToggleGroup
        type="multiple"
        value={v}
        onChange={(next) => setV(Array.isArray(next) ? next : [next])}
        items={[
          { id: 'bold', label: 'Bold' },
          { id: 'italic', label: 'Italic' },
          { id: 'underline', label: 'Underline' },
        ]}
      />
    </DemoBlock>
  );
}

export function DropdownMenuDemo() {
  return (
    <DemoBlock>
      <DropdownMenu
        trigger={<Button variant="ghost">Actions ▾</Button>}
        items={[
          { id: 'edit', label: 'Edit', onSelect: () => undefined },
          { id: 'dup', label: 'Duplicate', onSelect: () => undefined },
          { id: 'sep', label: '', separator: true },
          { id: 'del', label: 'Delete', destructive: true, onSelect: () => undefined },
        ]}
      />
    </DemoBlock>
  );
}

export function ContextMenuDemo() {
  return (
    <DemoBlock>
      <ContextMenu
        items={[
          { id: 'copy', label: 'Copy', onSelect: () => undefined },
          { id: 'paste', label: 'Paste', onSelect: () => undefined },
        ]}
      >
        <Paper seed="ctx" style={{ padding: 24, textAlign: 'center' }}>Right-click here</Paper>
      </ContextMenu>
    </DemoBlock>
  );
}

export function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <DemoBlock>
      <Button onClick={() => setOpen(true)}>Open command palette</Button>
      <Command
        open={open}
        onClose={() => setOpen(false)}
        items={[
          { id: 'home', label: 'Go to Introduction', hint: 'Nav', keywords: ['docs'] },
          { id: 'tokens', label: 'Open Tokens page', hint: 'Nav', keywords: ['theme'] },
          { id: 'playground', label: 'Open Playground', hint: 'QA' },
        ]}
      />
    </DemoBlock>
  );
}

export function HoverCardDemo() {
  return (
    <DemoBlock>
      <HoverCard content={<p style={{ margin: 0 }}>Sketchpad UI · hand-drawn React components with accessible defaults.</p>}>
        <Button variant="link">@sketchpad-ui</Button>
      </HoverCard>
    </DemoBlock>
  );
}

export function AspectRatioDemo() {
  return (
    <DemoBlock>
      <AspectRatio ratio={16 / 9}>
        <span style={{ color: 'var(--sk-colors-pencil)' }}>16:9 frame</span>
      </AspectRatio>
    </DemoBlock>
  );
}

export function ItemDemo() {
  return (
    <DemoBlock>
      <Item
        title="SketchBorder"
        description="SVG path engine wrapper"
        media={<Avatar placeholder pixelSize={36} seed="item-av" />}
        action={<Button size="sm" variant="ghost">Open</Button>}
      />
    </DemoBlock>
  );
}

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <DemoBlock>
      <Calendar value={date} onChange={setDate} seed="doc-cal" />
    </DemoBlock>
  );
}

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <DemoBlock>
      <DatePicker label="Due date" value={date} onChange={setDate} seed="doc-dp" />
    </DemoBlock>
  );
}

export function CarouselDemo() {
  return (
    <DemoBlock>
      <Carousel
        slides={[
          <Paper key="1" seed="c1" style={{ padding: 32, textAlign: 'center' }}>Slide one</Paper>,
          <Paper key="2" seed="c2" style={{ padding: 32, textAlign: 'center' }}>Slide two</Paper>,
          <Paper key="3" seed="c3" style={{ padding: 32, textAlign: 'center' }}>Slide three</Paper>,
        ]}
      />
    </DemoBlock>
  );
}

export function ChartDemo() {
  return (
    <DemoBlock>
      <div className="demoStack">
        <Chart
          data={[
            { label: 'Mon', value: 12 },
            { label: 'Tue', value: 28 },
            { label: 'Wed', value: 18 },
            { label: 'Thu', value: 34 },
          ]}
        />
        <Chart
          type="line"
          data={[
            { label: 'Jan', value: 8 },
            { label: 'Feb', value: 14 },
            { label: 'Mar', value: 22 },
            { label: 'Apr', value: 18 },
          ]}
        />
      </div>
    </DemoBlock>
  );
}

export function ComboboxDemo() {
  const [value, setValue] = useState<string>();
  return (
    <DemoBlock>
      <Combobox
        label="Framework"
        value={value}
        onChange={setValue}
        options={[
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
          { value: 'svelte', label: 'Svelte' },
        ]}
      />
    </DemoBlock>
  );
}

export function ToggleDemo() {
  const [bold, setBold] = useState(false);
  return (
    <DemoBlock>
      <Toggle pressed={bold} onPressedChange={setBold}>Bold</Toggle>
    </DemoBlock>
  );
}

export function ResizableDemo() {
  return (
    <DemoBlock>
      <Resizable
        left={<Paper seed="rl" style={{ padding: 16, height: '100%' }}>Left panel</Paper>}
        right={<Paper seed="rr" style={{ padding: 16, height: '100%' }}>Right panel</Paper>}
      />
    </DemoBlock>
  );
}

export function ScrollAreaDemo() {
  return (
    <DemoBlock>
      <ScrollArea maxHeight={160}>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} style={{ margin: '0 0 8px' }}>Scrollable line {i + 1}</p>
        ))}
      </ScrollArea>
    </DemoBlock>
  );
}

export function DirectionDemo() {
  return (
    <DemoBlock title="RTL preview">
      <DirectionProvider dir="rtl">
        <Paper seed="dir" style={{ padding: 16 }}>
          <p style={{ margin: 0 }}>محتوى من اليمين إلى اليسار</p>
        </Paper>
      </DirectionProvider>
    </DemoBlock>
  );
}

export function TypographyDemo() {
  return (
    <DemoBlock>
      <div className="demoStack">
        <Heading level={1}>Heading one</Heading>
        <Heading level={2}>Heading two</Heading>
        <Lead>Lead text for introductions and hero copy.</Lead>
        <Text>Body text with comfortable reading size and line height.</Text>
        <Muted>Muted secondary text for captions and hints.</Muted>
        <div className="demoText">Inline <Code>npm install sketchpad-ui</Code> snippet.</div>
      </div>
    </DemoBlock>
  );
}

export const componentDemos: Record<string, React.ComponentType> = {
  accordion: AccordionDemo,
  alert: AlertDemo,
  'aspect-ratio': AspectRatioDemo,
  attachment: AttachmentDemo,
  bubble: BubbleDemo,
  button: ButtonDemo,
  badge: BadgeDemo,
  'button-group': ButtonGroupDemo,
  avatar: AvatarDemo,
  calendar: CalendarDemo,
  card: CardDemo,
  carousel: CarouselDemo,
  chart: ChartDemo,
  collapsible: CollapsibleDemo,
  combobox: ComboboxDemo,
  command: CommandDemo,
  'context-menu': ContextMenuDemo,
  'data-table': DataTableDemo,
  'date-picker': DatePickerDemo,
  direction: DirectionDemo,
  'dropdown-menu': DropdownMenuDemo,
  field: FieldDemo,
  'hover-card': HoverCardDemo,
  input: InputDemo,
  'input-group': InputGroupDemo,
  'input-otp': InputOtpDemo,
  item: ItemDemo,
  kbd: KbdDemo,
  label: LabelDemo,
  marker: MarkerDemo,
  menubar: MenubarDemo,
  message: MessageDemo,
  'message-scroller': MessageScrollerDemo,
  'native-select': NativeSelectDemo,
  textarea: TextareaDemo,
  select: SelectDemo,
  checkbox: CheckboxDemo,
  'radio-group': RadioGroupDemo,
  switch: SwitchDemo,
  slider: SliderDemo,
  spinner: SpinnerDemo,
  toggle: ToggleDemo,
  'toggle-group': ToggleGroupDemo,
  tabs: TabsDemo,
  breadcrumb: BreadcrumbDemo,
  pagination: PaginationDemo,
  sidebar: SidebarDemo,
  'navigation-menu': NavigationMenuDemo,
  resizable: ResizableDemo,
  'scroll-area': ScrollAreaDemo,
  stepper: StepperDemo,
  table: TableDemo,
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
  sonner: SonnerDemo,
  separator: SeparatorDemo,
};
