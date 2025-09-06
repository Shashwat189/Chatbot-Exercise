import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ContrastWarningProps {
  warning: string | null;
}

export function ContrastWarning({ warning }: ContrastWarningProps) {
  if (!warning) return null;

  return (
    <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
      <AlertTriangle size={16} />
      <span>{warning}</span>
    </div>
  );
}