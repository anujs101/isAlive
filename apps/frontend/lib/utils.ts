import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Tick } from '@/hooks/useWebsites';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate uptime percentage based on ticks
 */
export function calculateUptimePercentage(ticks?: Tick[]): number {
  if (!ticks || ticks.length === 0) return 0;
  
  // Count successful checks (latency >= 0)
  const successfulChecks = ticks.filter(tick => tick.latency >= 0).length;
  return (successfulChecks / ticks.length) * 100;
}

/**
 * Get the latest latency from ticks
 */
export function getLatestLatency(ticks?: Tick[]): number {
  if (!ticks || ticks.length === 0) return 0;
  
  // Sort by createdAt descending and get the first one
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return sortedTicks[0].latency;
}

/**
 * Get status color based on latency
 */
export function getStatusColor(latency: number): string {
  if (latency === -1) return 'red'; // Website is down when latency is -1
  if (latency < 400) return 'green';
  if (latency < 1000) return 'yellow';
  return 'red';
}

/**
 * Format URL for display
 */
export function formatUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return url;
  }
}

/**
 * Get data for latency chart
 */
export function getLatencyChartData(ticks: Tick[]) {
  // Sort by createdAt ascending
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  
  return sortedTicks.map(tick => ({
    time: new Date(tick.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    latency: tick.latency === -1 ? null : tick.latency, // Use null for -1 values to create gaps
    status: tick.status,
    isUnreachable: tick.latency === -1 // Add flag for tooltip
  }));
}

/**
 * Get color based on uptime percentage
 */
export function getUptimeColor(uptimePercentage: number): string {
  if (uptimePercentage >= 98) return 'text-emerald-400';
  if (uptimePercentage >= 50) return 'text-amber-400';
  return 'text-red-400';
}