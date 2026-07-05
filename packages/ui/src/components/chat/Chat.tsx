'use client';

import type { ReactNode } from 'react';
import { tokens } from '@sketchpad/tokens';
import { Avatar } from '../core/Button.js';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import type { SketchComponentProps } from '../../types.js';
import { cn } from '../../utils.js';
import styles from './Chat.module.css';

export interface BubbleProps extends SketchComponentProps {
  variant?: 'sent' | 'received';
  children: ReactNode;
}

export function Bubble({
  variant = 'received',
  children,
  seed = 'bubble',
  roughness,
  strokeWidth,
  className,
  style,
}: BubbleProps) {
  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill={variant === 'sent' ? 'paperBright' : 'paperAlt'}
      roughness={roughness ?? tokens.roughness.subtle}
      strokeWidth={strokeWidth ?? tokens.stroke.thin}
      className={cn(styles.bubble, variant === 'sent' ? styles.bubbleSent : styles.bubbleReceived, className)}
      style={style}
    >
      {children}
    </SketchBorder>
  );
}

export type MarkerStatus = 'sent' | 'delivered' | 'read';

export function Marker({ status = 'sent' }: { status?: MarkerStatus }) {
  const count = status === 'sent' ? 1 : status === 'delivered' ? 2 : 2;
  return (
    <span className={styles.marker} aria-label={`Message ${status}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(styles.markerDot, status === 'read' && styles.markerDotActive)}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export interface MessageProps {
  children: ReactNode;
  author?: string;
  time?: string;
  align?: 'sent' | 'received';
  status?: MarkerStatus;
  showAvatar?: boolean;
  seed?: string | number;
}

export function Message({
  children,
  author,
  time,
  align = 'received',
  status,
  showAvatar = true,
  seed = 'message',
}: MessageProps) {
  return (
    <div className={cn(styles.message, align === 'sent' && styles.messageSent)}>
      {showAvatar && <Avatar placeholder pixelSize={36} seed={`${seed}-av`} />}
      <div className={styles.messageBody}>
        {(author || time) && (
          <div className={styles.messageMeta}>
            {author && <span>{author}</span>}
            {time && <span>{time}</span>}
          </div>
        )}
        <Bubble variant={align} seed={seed}>
          {children}
        </Bubble>
        {align === 'sent' && status && (
          <div className={styles.messageMeta}>
            <Marker status={status} />
          </div>
        )}
      </div>
    </div>
  );
}

export interface AttachmentProps extends Omit<SketchComponentProps, 'size'> {
  name: string;
  fileSize?: string;
  onRemove?: () => void;
}

export function Attachment({
  name,
  fileSize,
  onRemove,
  seed = 'attachment',
  roughness,
  strokeWidth,
  className,
  style,
}: AttachmentProps) {
  return (
    <SketchBorder
      variant="rounded"
      seed={seed}
      fill="paperAlt"
      roughness={roughness ?? tokens.roughness.subtle}
      strokeWidth={strokeWidth ?? tokens.stroke.thin}
      className={cn(styles.attachment, className)}
      style={style}
    >
      <span className={styles.attachmentIcon} aria-hidden="true">
        📎
      </span>
      <div className={styles.attachmentInfo}>
        <p className={styles.attachmentName}>{name}</p>
        {fileSize && <p className={styles.attachmentSize}>{fileSize}</p>}
      </div>
      {onRemove && (
        <button type="button" className={styles.attachmentRemove} aria-label={`Remove ${name}`} onClick={onRemove}>
          ×
        </button>
      )}
    </SketchBorder>
  );
}

export interface MessageScrollerProps {
  messages: Array<{
    id: string;
    content: ReactNode;
    author?: string;
    time?: string;
    align?: 'sent' | 'received';
    status?: MarkerStatus;
  }>;
  className?: string;
}

export function MessageScroller({ messages, className }: MessageScrollerProps) {
  return (
    <div className={cn(styles.messageList, className)} role="log" aria-live="polite">
      {messages.map((msg) => (
        <Message
          key={msg.id}
          author={msg.author}
          time={msg.time}
          align={msg.align}
          status={msg.status}
          seed={msg.id}
        >
          {msg.content}
        </Message>
      ))}
    </div>
  );
}
