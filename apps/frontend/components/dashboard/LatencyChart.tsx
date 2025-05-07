"use client";

import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Tick } from '@/hooks/useWebsites';
import { getLatencyChartData } from '@/lib/utils';

interface LatencyChartProps {
  ticks: Tick[];
  className?: string;
}

export const LatencyChart: React.FC<LatencyChartProps> = ({ ticks, className }) => {
  const data = getLatencyChartData(ticks);
  
  return (
    <div className={`w-full h-48 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={{ stroke: '#1e293b' }}
            axisLine={{ stroke: '#1e293b' }}
            minTickGap={30}
          />
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 10 }}
            tickLine={{ stroke: '#1e293b' }}
            axisLine={{ stroke: '#1e293b' }}
            tickFormatter={(value) => `${value}ms`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              border: 'none', 
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '0.5rem',
              color: '#f8fafc'
            }}
            formatter={(value) => [`${value}ms`, 'Latency']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="latency" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fill="url(#colorLatency)" 
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};