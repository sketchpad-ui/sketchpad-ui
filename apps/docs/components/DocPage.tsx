'use client';

import { useCallback, useState } from 'react';
import { tokens } from '@sketchpad/tokens';
import { Badge, Paper, SketchBorder, Tooltip } from 'sketchpad-ui';
import type { DocItem } from '../lib/docs-config';

export function DocHeader({ doc }: { doc: DocItem }) {
  return (
    <header className="docHeader">
      <div className="docHeaderMeta">
        {doc.status === 'new' && (
          <Badge variant="marker" accent="green" seed={`doc-${doc.slug}-new`}>
            New
          </Badge>
        )}
        {doc.status === 'partial' && (
          <Badge variant="stamp" seed={`doc-${doc.slug}-partial`} accent="blue">
            Partial
          </Badge>
        )}
        {doc.status === 'planned' && (
          <Badge variant="default" seed={`doc-${doc.slug}-planned`}>
            Coming soon
          </Badge>
        )}
        {doc.exportName && (
          <Badge variant="default" seed={`doc-${doc.slug}-export`} style={{ fontFamily: 'ui-monospace, monospace' }}>
            {doc.exportName}
          </Badge>
        )}
      </div>
      <h1 className="docTitle">{doc.name}</h1>
      <p className="docDescription">{doc.description}</p>
    </header>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="1.5" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [code]);

  return (
    <SketchBorder
      variant="rounded"
      seed={`code-${code.length}`}
      fill="paper"
      roughness={tokens.roughness.subtle}
      strokeWidth={tokens.stroke.thin}
      className="codeBlockSketch"
    >
      <div className="codeBlockInner">
        <div className="codeBlockCopyWrap">
          <Tooltip content={copied ? 'Copied!' : 'Copy to clipboard'}>
            <SketchBorder
              variant="rounded"
              seed={`copy-btn-${code.length}`}
              width={32}
              height={32}
              fill="paper"
              roughness={tokens.roughness.subtle}
              strokeWidth={tokens.stroke.thin}
              className={copied ? 'codeBlockCopyBtnDone' : undefined}
            >
              <button
                type="button"
                className="codeBlockCopyBtnInner"
                onClick={handleCopy}
                aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </SketchBorder>
          </Tooltip>
        </div>
        <pre className="codeBlockPre">{code}</pre>
      </div>
    </SketchBorder>
  );
}

export function DemoBlock({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="demoBlock">
      {title && <h3 className="demoBlockTitle">{title}</h3>}
      <SketchBorder
        variant="rounded"
        seed={`demo-${title ?? 'block'}`}
        fill="paperBright"
        roughness={tokens.roughness.low}
        strokeWidth={tokens.stroke.thin}
        className="demoBlockSketch"
      >
        <div className="demoBlockInner">{children}</div>
      </SketchBorder>
    </div>
  );
}

export function ComingSoon({ name }: { name: string }) {
  return (
    <Paper seed="coming-soon" className="comingSoon">
      <p className="docMuted">
        <strong>{name}</strong> is on the{' '}
        <a href="https://github.com/sketchpad-ui/sketchpad-ui/blob/main/ROADMAP.md" target="_blank" rel="noopener noreferrer">
          roadmap
        </a>
        . Contributions welcome.
      </p>
    </Paper>
  );
}
