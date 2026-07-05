export type { SketchComponentProps, SketchBorderProps, SketchBorderVariant, SketchFill } from './types.js';

export { SketchBorder, SketchSvg } from './primitives/SketchBorder.js';
export {
  RoughLine,
  RoughUnderline,
  MarkerHighlight,
  CrossHatch,
  ScribbleLine,
  SketchArrow,
  ConnectorLine,
  DoodleStar,
  PaperTape,
  FoldedCorner,
  ImagePlaceholder,
  CircleHighlight,
  RoughBox,
  HandwrittenNote,
} from './primitives/decorative.js';

export { Button, IconButton, Badge, Avatar } from './components/core/Button.js';
export type { ButtonProps, BadgeProps } from './components/core/Button.js';
export { Tooltip, Popover } from './components/core/Tooltip.js';

export { Alert, Spinner } from './components/feedback/Feedback.js';
export type { AlertProps, SpinnerProps } from './components/feedback/Feedback.js';

export { Kbd, Label, Field, FieldError } from './components/typography/Typography.js';
export type { LabelProps } from './components/typography/Typography.js';

export { Card, Accordion, Collapsible } from './components/structure/Structure.js';
export type { CardProps, AccordionItemData } from './components/structure/Structure.js';

export {
  Bubble,
  Message,
  Attachment,
  Marker,
  MessageScroller,
} from './components/chat/Chat.js';
export type { BubbleProps, MessageProps, AttachmentProps, MarkerStatus } from './components/chat/Chat.js';

export {
  TextInput,
  Textarea,
  SearchInput,
  Select,
  Checkbox,
  RadioGroup,
  Toggle,
  Slider,
} from './components/forms/Forms.js';
export type { TextInputProps, SelectProps, SelectOption } from './components/forms/Forms.js';

/** Alias for Toggle */
export { Toggle as Switch } from './components/forms/Forms.js';

export {
  Navbar,
  Sidebar,
  Tabs,
  Breadcrumbs,
  Pagination,
  Stepper,
} from './components/navigation/Navigation.js';
export type { NavItem, StepStatus } from './components/navigation/Navigation.js';

export {
  Container,
  Stack,
  Grid,
  Paper,
  Divider,
  BrowserMockup,
  PhoneMockup,
  WindowMockup,
  Frame,
} from './components/layout/Layout.js';

export {
  Modal,
  Drawer,
  AlertDialog,
  ToastContainer,
  useToast,
} from './components/overlays/Overlays.js';
export type { ToastItem } from './components/overlays/Overlays.js';

/** Alias for Drawer */
export { Drawer as Sheet } from './components/overlays/Overlays.js';

export {
  Table,
  List,
  Timeline,
  StatCard,
  ProgressBar,
  SkeletonLoader,
  EmptyState,
} from './components/data/Data.js';
export type { Column } from './components/data/Data.js';

export { cn, deriveSeed, useReducedMotion, useIsMobile } from './utils.js';

export { ThemeProvider } from './theme/ThemeProvider.js';
export { useTheme } from './theme/useTheme.js';
export { ThemeToggle } from './theme/ThemeToggle.js';
export type { ThemeSetting, ResolvedTheme } from './theme/types.js';
