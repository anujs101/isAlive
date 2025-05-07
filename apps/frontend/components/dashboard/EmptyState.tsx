"use client";

import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddWebsite: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddWebsite }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/50 text-center">
      <div className="rounded-full bg-blue-600/10 p-3 mb-4">
        <Plus size={24} className="text-blue-500" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">No websites monitored</h3>
      <p className="text-slate-400 mb-6 max-w-md">
        Add your first website to start monitoring its uptime and performance.
      </p>
      <button
        onClick={onAddWebsite}
        className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Plus size={16} />
        Add Website
      </button>
    </div>
  );
};