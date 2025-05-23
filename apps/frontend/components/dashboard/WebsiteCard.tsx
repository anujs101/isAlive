"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';
import { StatusIndicator } from './StatusIndicator';
import { LatencyChart } from './LatencyChart';
// Add getUptimeColor to imports
import { 
  calculateUptimePercentage, 
  getLatestLatency, 
  getStatusColor,
  getUptimeColor,
  formatUrl
} from '@/lib/utils';
import { deleteWebsite } from '@/lib/api';
import { useAuth } from '@clerk/nextjs';

interface WebsiteCardProps {
  website: Website;
  onDelete: (websiteId: string) => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onDelete }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const auth = useAuth(); // Move the hook here, at the top level
  
  const uptimePercentage = calculateUptimePercentage(website.ticks);
  const latestLatency = getLatestLatency(website.ticks);
  const statusColor = getStatusColor(latestLatency);
  // Add null check for website.ticks
  const checkCount = website.ticks?.length || 0;
  const uptimeColor = getUptimeColor(uptimePercentage); // Move this here
  
  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      const token = await auth.getToken(); // Use the auth object from above
      setIsDeleting(true);
      await deleteWebsite(website.id, token);
      onDelete(website.id);
    } catch (error) {
      console.error('Failed to delete website:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:shadow-xl transition-shadow duration-300">
      {/* Header with URL and status indicator */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <StatusIndicator status={statusColor as 'green' | 'yellow' | 'red'} />
          <h3 className="font-medium text-white truncate hover:text-clip">
            {formatUrl(website.url)}
          </h3>
        </div>
        <button
          onClick={handleDelete}
          className="p-1.5 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors"
          disabled={isDeleting}
          aria-label="Delete website"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 p-4 border-b border-slate-700/50">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-1">Uptime</span>
          <span className={`text-xl font-semibold ${uptimeColor}`}>
            {uptimePercentage.toFixed(3)}%
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-1">Response</span>
          <span className="text-xl font-semibold text-blue-400">
            {latestLatency === -1 ? "Unreachable" : `${latestLatency}ms`}
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-1">Checks</span>
          <span className="text-xl font-semibold text-indigo-400">
            {checkCount}
          </span>
        </div>
      </div>
      
      {/* Chart */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm text-slate-300">Performance Metrics</h4>
          <div className="flex space-x-2">
            <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-400">30m</span>
          </div>
        </div>
        <LatencyChart ticks={website.ticks || []} />
      </div>
    </div>
  );
};