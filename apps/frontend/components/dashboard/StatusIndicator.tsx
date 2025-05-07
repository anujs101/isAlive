"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'green' | 'yellow' | 'red';
  className?: string;
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  className,
  pulse = true,
}) => {
  return (
    <div className={cn(
      'relative flex items-center justify-center',
      className
    )}>
      <div 
        className={cn(
          'w-3 h-3 rounded-full', 
          {
            'bg-emerald-500': status === 'green',
            'bg-amber-500': status === 'yellow',
            'bg-red-500': status === 'red',
          }
        )}
      />
      {pulse && (
        <div 
          className={cn(
            'absolute w-3 h-3 rounded-full animate-ping', 
            {
              'bg-emerald-500/40': status === 'green',
              'bg-amber-500/40': status === 'yellow',
              'bg-red-500/40': status === 'red',
            }
          )}
        />
      )}
    </div>
  );
};