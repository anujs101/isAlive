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
  
  const goodTicks = ticks.filter(tick => tick.status === 'good').length;
  return (goodTicks / ticks.length) * 100;
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
    latency: tick.latency,
    status: tick.status,
  }));
}