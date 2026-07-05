export type ComponentStatus = 'shipped' | 'partial' | 'planned' | 'new';

export interface DocItem {
  slug: string;
  name: string;
  description: string;
  status: ComponentStatus;
  exportName?: string;
  installSnippet?: string;
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
      description: 'What Sketchpad UI is and how it differs from other libraries.',
      status: 'shipped',
    },
    {
      slug: 'installation',
      name: 'Installation',
      description: 'Install sketchpad-ui and design tokens in your React project.',
      status: 'shipped',
    },
    {
      slug: 'typography',
      name: 'Typography',
      description: 'Heading, text, code, and annotation styles.',
      status: 'planned',
    },
  ],
};

/** Full component catalog, alphabetical */
export const components: DocItem[] = [
  { slug: 'accordion', name: 'Accordion', description: 'Vertically stacked sections with sketch fold lines.', status: 'shipped', exportName: 'Accordion', installSnippet: "import { Accordion } from 'sketchpad-ui';" },
  { slug: 'alert', name: 'Alert', description: 'Inline feedback banner with icon and message.', status: 'shipped', exportName: 'Alert', installSnippet: "import { Alert } from 'sketchpad-ui';" },
  { slug: 'alert-dialog', name: 'Alert Dialog', description: 'Modal that interrupts with a required action.', status: 'shipped', exportName: 'AlertDialog', installSnippet: "import { AlertDialog } from 'sketchpad-ui';" },
  { slug: 'aspect-ratio', name: 'Aspect Ratio', description: 'Constrain media to a sketch frame ratio.', status: 'planned' },
  { slug: 'attachment', name: 'Attachment', description: 'File chip for chat and upload UIs.', status: 'shipped', exportName: 'Attachment', installSnippet: "import { Attachment } from 'sketchpad-ui';" },
  { slug: 'avatar', name: 'Avatar', description: 'Sketch-framed user image or placeholder.', status: 'shipped', exportName: 'Avatar', installSnippet: "import { Avatar } from 'sketchpad-ui';" },
  { slug: 'badge', name: 'Badge', description: 'Pill labels with stamp and marker variants.', status: 'shipped', exportName: 'Badge', installSnippet: "import { Badge } from 'sketchpad-ui';" },
  { slug: 'bubble', name: 'Bubble', description: 'Chat message container with sketch tail.', status: 'shipped', exportName: 'Bubble', installSnippet: "import { Bubble } from 'sketchpad-ui';" },
  { slug: 'breadcrumb', name: 'Breadcrumb', description: 'Hierarchy trail with sketched arrow separators.', status: 'shipped', exportName: 'Breadcrumbs', installSnippet: "import { Breadcrumbs } from 'sketchpad-ui';" },
  { slug: 'button', name: 'Button', description: 'Interactive buttons with pen-on-paper borders.', status: 'shipped', exportName: 'Button', installSnippet: "import { Button } from 'sketchpad-ui';" },
  { slug: 'button-group', name: 'Button Group', description: 'Grouped actions in a segmented sketch control.', status: 'planned' },
  { slug: 'calendar', name: 'Calendar', description: 'Date grid with rough day cells.', status: 'planned' },
  { slug: 'card', name: 'Card', description: 'Paper sheet surface with header, content, and footer slots.', status: 'shipped', exportName: 'Card', installSnippet: "import { Card } from 'sketchpad-ui';" },
  { slug: 'carousel', name: 'Carousel', description: 'Slideshow with sketch arrow navigation.', status: 'planned' },
  { slug: 'chart', name: 'Chart', description: 'Simple charts on hand-drawn axes.', status: 'planned' },
  { slug: 'checkbox', name: 'Checkbox', description: 'Tick draws itself on check.', status: 'shipped', exportName: 'Checkbox', installSnippet: "import { Checkbox } from 'sketchpad-ui';" },
  { slug: 'collapsible', name: 'Collapsible', description: 'Expand/collapse with sketch chevron.', status: 'shipped', exportName: 'Collapsible', installSnippet: "import { Collapsible } from 'sketchpad-ui';" },
  { slug: 'combobox', name: 'Combobox', description: 'Searchable select with filter.', status: 'partial', exportName: 'Select' },
  { slug: 'command', name: 'Command', description: '⌘K command palette.', status: 'planned' },
  { slug: 'context-menu', name: 'Context Menu', description: 'Right-click sketch menu.', status: 'planned' },
  { slug: 'data-table', name: 'Data Table', description: 'Sortable, selectable table.', status: 'partial', exportName: 'Table' },
  { slug: 'date-picker', name: 'Date Picker', description: 'Input with calendar popover.', status: 'planned' },
  { slug: 'dialog', name: 'Dialog', description: 'Modal paper sheet over backdrop.', status: 'shipped', exportName: 'Modal', installSnippet: "import { Modal } from 'sketchpad-ui';" },
  { slug: 'direction', name: 'Direction', description: 'RTL and logical properties provider.', status: 'planned' },
  { slug: 'drawer', name: 'Drawer', description: 'Edge panel that slides in.', status: 'shipped', exportName: 'Drawer', installSnippet: "import { Drawer } from 'sketchpad-ui';" },
  { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Action menu anchored to a trigger.', status: 'planned' },
  { slug: 'empty', name: 'Empty', description: 'Empty state with illustration slot.', status: 'shipped', exportName: 'EmptyState', installSnippet: "import { EmptyState } from 'sketchpad-ui';" },
  { slug: 'field', name: 'Field', description: 'Label, control, hint, and error as one unit.', status: 'shipped', exportName: 'Field', installSnippet: "import { Field, TextInput } from 'sketchpad-ui';" },
  { slug: 'hover-card', name: 'Hover Card', description: 'Rich preview card on hover.', status: 'planned' },
  { slug: 'input', name: 'Input', description: 'Single-line text with sketch border.', status: 'shipped', exportName: 'TextInput', installSnippet: "import { TextInput } from 'sketchpad-ui';" },
  { slug: 'input-group', name: 'Input Group', description: 'Input with prefix and suffix slots.', status: 'planned' },
  { slug: 'input-otp', name: 'Input OTP', description: 'One-time code boxes.', status: 'planned' },
  { slug: 'item', name: 'Item', description: 'Generic list row with media and actions.', status: 'planned' },
  { slug: 'kbd', name: 'Kbd', description: 'Keyboard shortcut badge.', status: 'shipped', exportName: 'Kbd', installSnippet: "import { Kbd } from 'sketchpad-ui';" },
  { slug: 'label', name: 'Label', description: 'Accessible form label.', status: 'shipped', exportName: 'Label', installSnippet: "import { Label } from 'sketchpad-ui';" },
  { slug: 'marker', name: 'Marker', description: 'Read receipt or delivery indicator.', status: 'shipped', exportName: 'Marker', installSnippet: "import { Marker } from 'sketchpad-ui';" },
  { slug: 'menubar', name: 'Menubar', description: 'Horizontal application menu bar.', status: 'planned' },
  { slug: 'message', name: 'Message', description: 'Chat message with avatar and meta.', status: 'shipped', exportName: 'Message', installSnippet: "import { Message } from 'sketchpad-ui';" },
  { slug: 'message-scroller', name: 'Message Scroller', description: 'Scrollable chat message list.', status: 'shipped', exportName: 'MessageScroller', installSnippet: "import { MessageScroller } from 'sketchpad-ui';" },
  { slug: 'native-select', name: 'Native Select', description: 'Styled native select fallback.', status: 'planned' },
  { slug: 'navigation-menu', name: 'Navigation Menu', description: 'Site nav with nested menus.', status: 'partial', exportName: 'Navbar' },
  { slug: 'pagination', name: 'Pagination', description: 'Sketch-boxed page numbers.', status: 'shipped', exportName: 'Pagination', installSnippet: "import { Pagination } from 'sketchpad-ui';" },
  { slug: 'popover', name: 'Popover', description: 'Floating paper note panel.', status: 'shipped', exportName: 'Popover', installSnippet: "import { Popover } from 'sketchpad-ui';" },
  { slug: 'progress', name: 'Progress', description: 'Sketch track with marker fill.', status: 'shipped', exportName: 'ProgressBar', installSnippet: "import { ProgressBar } from 'sketchpad-ui';" },
  { slug: 'radio-group', name: 'Radio Group', description: 'Mutually exclusive sketch circles.', status: 'shipped', exportName: 'RadioGroup', installSnippet: "import { RadioGroup } from 'sketchpad-ui';" },
  { slug: 'resizable', name: 'Resizable', description: 'Drag-to-resize panels.', status: 'planned' },
  { slug: 'scroll-area', name: 'Scroll Area', description: 'Custom sketch scrollbar.', status: 'planned' },
  { slug: 'select', name: 'Select', description: 'Custom listbox with full keyboard support.', status: 'shipped', exportName: 'Select', installSnippet: "import { Select } from 'sketchpad-ui';" },
  { slug: 'separator', name: 'Separator', description: 'Rough horizontal divider.', status: 'shipped', exportName: 'Divider', installSnippet: "import { Divider } from 'sketchpad-ui';" },
  { slug: 'sheet', name: 'Sheet', description: 'Slide-over panel from an edge.', status: 'partial', exportName: 'Drawer' },
  { slug: 'sidebar', name: 'Sidebar', description: 'Vertical nav with marker highlights.', status: 'shipped', exportName: 'Sidebar', installSnippet: "import { Sidebar } from 'sketchpad-ui';" },
  { slug: 'skeleton', name: 'Skeleton', description: 'Deterministic scribble loading lines.', status: 'shipped', exportName: 'SkeletonLoader', installSnippet: "import { SkeletonLoader } from 'sketchpad-ui';" },
  { slug: 'slider', name: 'Slider', description: 'Range input with sketch thumb.', status: 'shipped', exportName: 'Slider', installSnippet: "import { Slider } from 'sketchpad-ui';" },
  { slug: 'sonner', name: 'Sonner', description: 'Stacked toast notifications.', status: 'partial', exportName: 'useToast' },
  { slug: 'spinner', name: 'Spinner', description: 'Loading indicator.', status: 'shipped', exportName: 'Spinner', installSnippet: "import { Spinner } from 'sketchpad-ui';" },
  { slug: 'switch', name: 'Switch', description: 'Toggle switch with sketched knob.', status: 'shipped', exportName: 'Toggle', installSnippet: "import { Toggle } from 'sketchpad-ui';" },
  { slug: 'table', name: 'Table', description: 'Data table with rough row dividers.', status: 'shipped', exportName: 'Table', installSnippet: "import { Table } from 'sketchpad-ui';" },
  { slug: 'tabs', name: 'Tabs', description: 'Folder-tab sketch navigation.', status: 'shipped', exportName: 'Tabs', installSnippet: "import { Tabs } from 'sketchpad-ui';" },
  { slug: 'textarea', name: 'Textarea', description: 'Multi-line sketch-bordered input.', status: 'shipped', exportName: 'Textarea', installSnippet: "import { Textarea } from 'sketchpad-ui';" },
  { slug: 'toast', name: 'Toast', description: 'Transient paper-note notifications.', status: 'shipped', exportName: 'useToast', installSnippet: "import { ToastContainer, useToast } from 'sketchpad-ui';" },
  { slug: 'toggle', name: 'Toggle', description: 'Pressable toggle button.', status: 'planned' },
  { slug: 'toggle-group', name: 'Toggle Group', description: 'Grouped toggle buttons.', status: 'planned' },
  { slug: 'tooltip', name: 'Tooltip', description: 'Hint on hover or focus.', status: 'shipped', exportName: 'Tooltip', installSnippet: "import { Tooltip } from 'sketchpad-ui';" },
];

export const internalLinks: DocSection = {
  title: 'Internal',
  items: [
    { slug: 'primitives', name: 'Primitives', description: 'SketchBorder and annotation layer.', status: 'shipped' },
    { slug: 'playground', name: 'Playground', description: 'Visual QA matrix for path engine.', status: 'shipped' },
    { slug: 'tokens', name: 'Tokens', description: 'Colors, roughness, and CSS variables.', status: 'shipped' },
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
