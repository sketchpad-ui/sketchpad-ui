'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { tokens, colorVars } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { Button } from '../core/Button.js';
import { cn } from '../../utils.js';
import styles from './Overlays.module.css';

interface OverlayProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
}

function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable[0]?.focus();
  }, [active, containerRef]);
}

function useEscape(onClose?: () => void, active?: boolean) {
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, onClose]);
}

export function Modal({ open, onClose, children, title }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open);
  useEscape(onClose, open);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        ref={ref}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <SketchBorder
          variant="rounded"
          seed="modal-shadow"
          fill="none"
          className={styles.modalShadow}
          aria-hidden="true"
        />
        <SketchBorder variant="rounded" seed="modal" fill="paper">
          <div style={{ padding: 24, position: 'relative' }}>
            {title && (
              <h2 id="modal-title" style={{ margin: '0 0 16px', fontSize: '1.25rem' }}>
                {title}
              </h2>
            )}
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <SketchBorder variant="oval" seed="close" width={28} height={28} fill="paper">
                ✕
              </SketchBorder>
            </button>
            {children}
          </div>
        </SketchBorder>
      </div>
    </div>
  );
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'right',
}: OverlayProps & { side?: 'left' | 'right' }) {
  useEscape(onClose, open);
  if (!open) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} role="presentation" />
      <div
        className={cn(styles.drawer, side === 'right' ? styles.drawerRight : styles.drawerLeft)}
        role="dialog"
        aria-modal="true"
      >
        <SketchBorder variant="rounded" seed="drawer" fill="paper" style={{ height: '100%', padding: 24 }}>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
          {children}
        </SketchBorder>
      </div>
    </>
  );
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: OverlayProps & {
  description?: string;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <Modal open={open} onClose={() => {}} title={title}>
      {description && <p style={{ margin: '0 0 20px', color: colorVars.inkSoft }}>{description}</p>}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export interface ToastItem {
  id: string;
  message: string;
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss?: (id: string) => void;
}) {
  return (
    <div className={styles.toastContainer} aria-live="polite">
      {toasts.map((toast) => (
        <SketchBorder
          key={toast.id}
          variant="rounded"
          seed={`toast-${toast.id}`}
          fill="paper"
          className={styles.toast}
        >
          <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>{toast.message}</span>
            <button type="button" onClick={() => onDismiss?.(toast.id)} aria-label="Dismiss">
              ✕
            </button>
          </div>
        </SketchBorder>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  return { toasts, show, dismiss };
}
