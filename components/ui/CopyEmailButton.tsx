'use client';

import { useState } from 'react';

interface CopyEmailButtonProps {
  email: string;
}

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
      className="text-xs sm:text-sm px-2.5 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 transition-colors"
      aria-label="Copy email address"
    >
      {copyStatus === 'copied' ? 'Copied' : 'Copy'}
    </button>
  );
}
