'use client';

import { useState } from 'react';

interface CopyEmailButtonProps {
  email: string;
}

/**
 * CopyEmailButton — Direction 2 terminal vocabulary.
 * Mono label, hairline border, accent hover. Shows "copied" feedback.
 */
export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('idle');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopyEmail}
      className={`font-mono text-[10px] sm:text-[11px] px-2 py-1 border transition-colors duration-150 ${
        copyStatus === 'copied'
          ? 'border-accent text-accent'
          : 'border-hairline text-muted hover:border-accent hover:text-accent'
      }`}
      aria-label="Copy email address"
    >
      {copyStatus === 'copied' ? '✓ copied' : 'copy'}
    </button>
  );
}
