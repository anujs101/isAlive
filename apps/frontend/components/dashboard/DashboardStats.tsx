"use client";

import React from 'react';
import { Activity, Check, Timer } from 'lucide-react';
import { Website } from '@/hooks/useWebsites';
import { calculateUptimePercentage, getLatestLatency } from '@/lib/utils';

interface DashboardStatsProps {
  websites: Website[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ websites }) => {
  // Calculate global stats from all websites
  const calculateGlobalStats = () => {
    if (!websites.length) {
      return {
        averageUptime: 0,
        averageLatency: 0,
        totalChecks: 0,
      };
    }

  // Filter out websites with undefined ticks before mapping
  const websitesWithTicks = websites.filter(site => site.ticks && Array.isArray(site.ticks));
  
  const uptimes = websitesWithTicks.map(site => calculateUptimePercentage(site.ticks));
  const latencies = websitesWithTicks.map(site => getLatestLatency(site.ticks));
  const totalChecks = websitesWithTicks.reduce((acc, site) => acc + (Array.isArray(site.ticks) ? site.ticks.length : 0), 0);

  // Prevent division by zero if no websites have ticks
  const averageUptime = websitesWithTicks.length ? 
    uptimes.reduce((acc, val) => acc + val, 0) / uptimes.length : 0;
  const averageLatency = websitesWithTicks.length ? 
    latencies.reduce((acc, val) => acc + val, 0) / latencies.length : 0;

    return {
      averageUptime,
      averageLatency,
      totalChecks,
    };
  };

  const { averageUptime, averageLatency, totalChecks } = calculateGlobalStats();

  const stats = [
    {
      title: 'Average Uptime',
      value: `${averageUptime.toFixed(2)}%`,
      icon: <Activity className="text-emerald-400" />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      title: 'Average Latency',
      value: `${Math.round(averageLatency)}ms`,
      icon: <Timer className="text-blue-400" />,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      title: 'Total Checks',
      value: totalChecks.toLocaleString(),
      icon: <Check className="text-indigo-400" />,
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-700/50 rounded-lg p-4 shadow-md"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-md ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-400">{stat.title}</p>
              <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};