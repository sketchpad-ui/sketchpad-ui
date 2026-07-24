export type ComponentStatus = 'shipped' | 'partial' | 'planned' | 'new';

export interface DocItem {
  slug: string;
  name: string;
  description: string;
  status: ComponentStatus;
  exportName?: string;
  installSnippet?: string;
}

export type ComponentPhase = 1 | 2 | 3 | 4 | 5 | 6;

const phaseSlugs: Record<ComponentPhase, readonly string[]> = {
  1: ['aspect-ratio', 'avatar', 'badge', 'button', 'button-group', 'card', 'item', 'kbd', 'progress', 'separator', 'skeleton', 'spinner', 'typography'],
  2: ['calendar', 'checkbox', 'combobox', 'date-picker', 'field', 'input', 'input-group', 'input-otp', 'label', 'native-select', 'radio-group', 'select', 'slider', 'switch', 'textarea', 'toggle', 'toggle-group'],
  3: ['accordion', 'breadcrumb', 'collapsible', 'direction', 'navigation-menu', 'pagination', 'resizable', 'scroll-area', 'sidebar', 'tabs'],
  4: ['alert', 'alert-dialog', 'command', 'context-menu', 'dialog', 'drawer', 'dropdown-menu', 'hover-card', 'menubar', 'popover', 'sheet', 'sonner', 'toast', 'tooltip'],
  5: ['carousel', 'chart', 'data-table', 'empty', 'table'],
  6: ['attachment', 'bubble', 'marker', 'message', 'message-scroller'],
};

export function getComponentPhase(slug: string): ComponentPhase {
  const match = (Object.entries(phaseSlugs) as [string, readonly string[]][]).find(([, slugs]) =>
    slugs.includes(slug),
  );
  return Number(match?.[0] ?? 1) as ComponentPhase;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

export const gettingStarted: DocSection = {
  title: 'Getting Started',
  items: [
    {
      slug: 'introduction',
      name: 'Introduction',
      description: 'Game-ready Neubrutalist components for React and Flutter.',
      status: 'shipped',
    },
    {
      slug: 'installation',
      name: 'Installation',
      description: 'Install Sketchpad UI in React, Next.js, or Flutter.',
      status: 'shipped',
    },
    {
      slug: 'typography',
      name: 'Typography',
      description: 'Bold display, body, code, and muted text styles.',
      status: 'shipped',
    },
  ],
};

/** Full component catalog, alphabetical */
export const components: DocItem[] = [
  { slug: 'accordion', name: 'Accordion', description: 'Vertically stacked disclosure sections with bold triggers.', status: 'shipped', exportName: 'Accordion', installSnippet: "import { Accordion } from 'sketchpad-ui';" },
  { slug: 'alert', name: 'Alert', description: 'Inline feedback banner with icon and message.', status: 'shipped', exportName: 'Alert', installSnippet: "import { Alert } from 'sketchpad-ui';" },
  { slug: 'alert-dialog', name: 'Alert Dialog', description: 'Modal that interrupts with a required action.', status: 'shipped', exportName: 'AlertDialog', installSnippet: "import { AlertDialog } from 'sketchpad-ui';" },
  { slug: 'aspect-ratio', name: 'Aspect Ratio', description: 'Constrain media to a fixed frame ratio.', status: 'shipped', exportName: 'AspectRatio', installSnippet: "import { AspectRatio } from 'sketchpad-ui';" },
  { slug: 'attachment', name: 'Attachment', description: 'File chip for chat and upload UIs.', status: 'new', exportName: 'Attachment', installSnippet: "import { Attachment } from 'sketchpad-ui';" },
  { slug: 'avatar', name: 'Avatar', description: 'High-contrast player image or fallback.', status: 'shipped', exportName: 'Avatar', installSnippet: "import { Avatar } from 'sketchpad-ui';" },
  { slug: 'badge', name: 'Badge', description: 'Pill labels with stamp and marker variants.', status: 'shipped', exportName: 'Badge', installSnippet: "import { Badge } from 'sketchpad-ui';" },
  { slug: 'bubble', name: 'Bubble', description: 'High-contrast sent and received message container.', status: 'new', exportName: 'Bubble', installSnippet: "import { Bubble } from 'sketchpad-ui';" },
  { slug: 'breadcrumb', name: 'Breadcrumb', description: 'Hierarchy trail with strong directional separators.', status: 'shipped', exportName: 'Breadcrumbs', installSnippet: "import { Breadcrumbs } from 'sketchpad-ui';" },
  { slug: 'button', name: 'Button', description: 'Pressable action with a hard shadow and tactile active state.', status: 'shipped', exportName: 'Button', installSnippet: "import { Button } from 'sketchpad-ui';" },
  { slug: 'button-group', name: 'Button Group', description: 'Grouped primary and secondary actions.', status: 'shipped', exportName: 'ButtonGroup', installSnippet: "import { ButtonGroup } from 'sketchpad-ui';" },
  { slug: 'calendar', name: 'Calendar', description: 'Keyboard and touch-friendly date grid.', status: 'shipped', exportName: 'Calendar', installSnippet: "import { Calendar } from 'sketchpad-ui';" },
  { slug: 'card', name: 'Card', description: 'Hard-shadow surface with header, content, and footer slots.', status: 'shipped', exportName: 'Card', installSnippet: "import { Card } from 'sketchpad-ui';" },
  { slug: 'carousel', name: 'Carousel', description: 'Touch and keyboard slideshow navigation.', status: 'shipped', exportName: 'Carousel', installSnippet: "import { Carousel } from 'sketchpad-ui';" },
  { slug: 'chart', name: 'Chart', description: 'Simple game stats charts on high-contrast axes.', status: 'shipped', exportName: 'Chart', installSnippet: "import { Chart } from 'sketchpad-ui';" },
  { slug: 'checkbox', name: 'Checkbox', description: 'Bold check control with clear selected state.', status: 'shipped', exportName: 'Checkbox', installSnippet: "import { Checkbox } from 'sketchpad-ui';" },
  { slug: 'collapsible', name: 'Collapsible', description: 'Compact expand and collapse control.', status: 'shipped', exportName: 'Collapsible', installSnippet: "import { Collapsible } from 'sketchpad-ui';" },
  { slug: 'combobox', name: 'Combobox', description: 'Searchable select with filter.', status: 'shipped', exportName: 'Combobox', installSnippet: "import { Combobox } from 'sketchpad-ui';" },
  { slug: 'command', name: 'Command', description: '⌘K command palette.', status: 'shipped', exportName: 'Command', installSnippet: "import { Command, CommandShortcut } from 'sketchpad-ui';" },
  { slug: 'context-menu', name: 'Context Menu', description: 'Right-click menu with a long-press mobile adaptation.', status: 'shipped', exportName: 'ContextMenu', installSnippet: "import { ContextMenu } from 'sketchpad-ui';" },
  { slug: 'data-table', name: 'Data Table', description: 'Sortable, selectable table.', status: 'shipped', exportName: 'DataTable', installSnippet: "import { DataTable } from 'sketchpad-ui';" },
  { slug: 'date-picker', name: 'Date Picker', description: 'Input with calendar popover.', status: 'shipped', exportName: 'DatePicker', installSnippet: "import { DatePicker } from 'sketchpad-ui';" },
  { slug: 'dialog', name: 'Dialog', description: 'Focus-managed modal over a high-contrast backdrop.', status: 'shipped', exportName: 'Dialog', installSnippet: "import { Dialog } from 'sketchpad-ui';" },
  { slug: 'direction', name: 'Direction', description: 'RTL and logical properties provider.', status: 'shipped', exportName: 'DirectionProvider', installSnippet: "import { DirectionProvider } from 'sketchpad-ui';" },
  { slug: 'drawer', name: 'Drawer', description: 'Edge panel that slides in.', status: 'shipped', exportName: 'Drawer', installSnippet: "import { Drawer } from 'sketchpad-ui';" },
  { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Action menu anchored to a trigger.', status: 'shipped', exportName: 'DropdownMenu', installSnippet: "import { DropdownMenu } from 'sketchpad-ui';" },
  { slug: 'empty', name: 'Empty', description: 'Empty state with illustration slot.', status: 'shipped', exportName: 'EmptyState', installSnippet: "import { EmptyState } from 'sketchpad-ui';" },
  { slug: 'field', name: 'Field', description: 'Label, control, hint, and error as one unit.', status: 'shipped', exportName: 'Field', installSnippet: "import { Field, TextInput } from 'sketchpad-ui';" },
  { slug: 'hover-card', name: 'Hover Card', description: 'Rich preview card on hover.', status: 'shipped', exportName: 'HoverCard', installSnippet: "import { HoverCard } from 'sketchpad-ui';" },
  { slug: 'input', name: 'Input', description: 'Single-line text input with bold focus and error states.', status: 'shipped', exportName: 'TextInput', installSnippet: "import { TextInput } from 'sketchpad-ui';" },
  { slug: 'input-group', name: 'Input Group', description: 'Input with prefix and suffix slots.', status: 'shipped', exportName: 'InputGroup', installSnippet: "import { InputGroup, TextInput } from 'sketchpad-ui';" },
  { slug: 'input-otp', name: 'Input OTP', description: 'One-time code boxes.', status: 'shipped', exportName: 'InputOTP', installSnippet: "import { InputOTP } from 'sketchpad-ui';" },
  { slug: 'item', name: 'Item', description: 'Generic list row with media and actions.', status: 'shipped', exportName: 'Item', installSnippet: "import { Item } from 'sketchpad-ui';" },
  { slug: 'kbd', name: 'Kbd', description: 'Keyboard shortcut badge.', status: 'shipped', exportName: 'Kbd', installSnippet: "import { Kbd } from 'sketchpad-ui';" },
  { slug: 'label', name: 'Label', description: 'Accessible form label.', status: 'shipped', exportName: 'Label', installSnippet: "import { Label } from 'sketchpad-ui';" },
  { slug: 'marker', name: 'Marker', description: 'Read receipt or delivery indicator.', status: 'new', exportName: 'Marker', installSnippet: "import { Marker } from 'sketchpad-ui';" },
  { slug: 'menubar', name: 'Menubar', description: 'Horizontal application menu bar.', status: 'shipped', exportName: 'Menubar', installSnippet: "import { Menubar } from 'sketchpad-ui';" },
  { slug: 'message', name: 'Message', description: 'Chat message with avatar and meta.', status: 'new', exportName: 'Message', installSnippet: "import { Message } from 'sketchpad-ui';" },
  { slug: 'message-scroller', name: 'Message Scroller', description: 'Scrollable chat message list.', status: 'new', exportName: 'MessageScroller', installSnippet: "import { MessageScroller } from 'sketchpad-ui';" },
  { slug: 'native-select', name: 'Native Select', description: 'Styled native select fallback.', status: 'shipped', exportName: 'NativeSelect', installSnippet: "import { NativeSelect } from 'sketchpad-ui';" },
  { slug: 'navigation-menu', name: 'Navigation Menu', description: 'Site nav with nested menus.', status: 'shipped', exportName: 'NavigationMenu', installSnippet: "import { NavigationMenu } from 'sketchpad-ui';" },
  { slug: 'pagination', name: 'Pagination', description: 'Boxed page controls with an accent selected state.', status: 'shipped', exportName: 'Pagination', installSnippet: "import { Pagination } from 'sketchpad-ui';" },
  { slug: 'popover', name: 'Popover', description: 'Anchored floating surface with hard shadow.', status: 'shipped', exportName: 'Popover', installSnippet: "import { Popover } from 'sketchpad-ui';" },
  { slug: 'progress', name: 'Progress', description: 'High-contrast track with accent fill.', status: 'shipped', exportName: 'ProgressBar', installSnippet: "import { ProgressBar } from 'sketchpad-ui';" },
  { slug: 'radio-group', name: 'Radio Group', description: 'Accessible mutually exclusive choice group.', status: 'shipped', exportName: 'RadioGroup', installSnippet: "import { RadioGroup } from 'sketchpad-ui';" },
  { slug: 'resizable', name: 'Resizable', description: 'Drag-to-resize panels.', status: 'shipped', exportName: 'Resizable', installSnippet: "import { Resizable } from 'sketchpad-ui';" },
  { slug: 'scroll-area', name: 'Scroll Area', description: 'High-contrast custom scrollbar and viewport.', status: 'shipped', exportName: 'ScrollArea', installSnippet: "import { ScrollArea } from 'sketchpad-ui';" },
  { slug: 'select', name: 'Select', description: 'Custom listbox with full keyboard support.', status: 'shipped', exportName: 'Select', installSnippet: "import { Select } from 'sketchpad-ui';" },
  { slug: 'separator', name: 'Separator', description: 'Uniform horizontal or vertical divider.', status: 'shipped', exportName: 'Divider', installSnippet: "import { Divider } from 'sketchpad-ui';" },
  { slug: 'sheet', name: 'Sheet', description: 'Slide-over panel from an edge.', status: 'shipped', exportName: 'Sheet', installSnippet: "import { Sheet } from 'sketchpad-ui';" },
  { slug: 'sidebar', name: 'Sidebar', description: 'Vertical nav with marker highlights.', status: 'shipped', exportName: 'Sidebar', installSnippet: "import { Sidebar } from 'sketchpad-ui';" },
  { slug: 'skeleton', name: 'Skeleton', description: 'Reduced-motion aware loading placeholders.', status: 'shipped', exportName: 'SkeletonLoader', installSnippet: "import { SkeletonLoader } from 'sketchpad-ui';" },
  { slug: 'slider', name: 'Slider', description: 'Range input with a bold accent thumb and track.', status: 'shipped', exportName: 'Slider', installSnippet: "import { Slider } from 'sketchpad-ui';" },
  { slug: 'sonner', name: 'Sonner', description: 'Stacked toast notifications.', status: 'shipped', exportName: 'Sonner', installSnippet: "import { Sonner, useSonner } from 'sketchpad-ui';" },
  { slug: 'spinner', name: 'Spinner', description: 'Loading indicator.', status: 'shipped', exportName: 'Spinner', installSnippet: "import { Spinner } from 'sketchpad-ui';" },
  { slug: 'switch', name: 'Switch', description: 'Touch-friendly binary setting control.', status: 'shipped', exportName: 'Switch', installSnippet: "import { Switch } from 'sketchpad-ui';" },
  { slug: 'table', name: 'Table', description: 'Data table with uniform row dividers.', status: 'shipped', exportName: 'Table', installSnippet: "import { Table } from 'sketchpad-ui';" },
  { slug: 'tabs', name: 'Tabs', description: 'Keyboard-aware section navigation.', status: 'shipped', exportName: 'Tabs', installSnippet: "import { Tabs } from 'sketchpad-ui';" },
  { slug: 'textarea', name: 'Textarea', description: 'Multi-line input with bold focus and error states.', status: 'shipped', exportName: 'Textarea', installSnippet: "import { Textarea } from 'sketchpad-ui';" },
  { slug: 'toast', name: 'Toast', description: 'Transient, stacked notifications.', status: 'new', exportName: 'useToast', installSnippet: "import { ToastContainer, useToast } from 'sketchpad-ui';" },
  { slug: 'toggle', name: 'Toggle', description: 'Pressable toggle button.', status: 'shipped', exportName: 'Toggle', installSnippet: "import { Toggle } from 'sketchpad-ui';" },
  { slug: 'toggle-group', name: 'Toggle Group', description: 'Grouped toggle buttons.', status: 'shipped', exportName: 'ToggleGroup', installSnippet: "import { ToggleGroup } from 'sketchpad-ui';" },
  { slug: 'tooltip', name: 'Tooltip', description: 'Hint on hover or focus.', status: 'shipped', exportName: 'Tooltip', installSnippet: "import { Tooltip } from 'sketchpad-ui';" },
];

export const internalLinks: DocSection = {
  title: 'Internal',
  items: [
    { slug: 'primitives', name: 'Primitives', description: 'Borders, hard shadows, surfaces, and focus.', status: 'shipped' },
    { slug: 'playground', name: 'Playground', description: 'Theme and component visual QA matrix.', status: 'shipped' },
    { slug: 'tokens', name: 'Tokens', description: 'Semantic colors, accents, spacing, and motion.', status: 'shipped' },
  ],
};

export function getComponent(slug: string): DocItem | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentHref(slug: string): string {
  if (slug === 'introduction') return '/';
  if (slug === 'installation') return '/docs/installation';
  if (slug === 'typography') return '/docs/typography';
  if (['primitives', 'playground', 'tokens'].includes(slug)) return `/${slug}`;
  return `/docs/components/${slug}`;
}

export function isDocPage(slug: string): boolean {
  return (
    gettingStarted.items.some((i) => i.slug === slug) ||
    components.some((c) => c.slug === slug) ||
    internalLinks.items.some((i) => i.slug === slug)
  );
}

export const newComponents = components.filter((c) => c.status === 'new');
export const shippedCount = components.filter((c) => c.status === 'shipped' || c.status === 'partial').length;
