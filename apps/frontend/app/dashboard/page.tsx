"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useWebsites, Website } from '@/hooks/useWebsites';
import { WebsiteCard } from '@/components/dashboard/WebsiteCard';
import { AddWebsiteModal } from '@/components/dashboard/AddWebsiteModal';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

export default function Dashboard() {
  const { websites, loading, error, setWebsites } = useWebsites();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDeleteWebsite = (websiteId: string) => {
    setWebsites(websites.filter(site => site.id !== websiteId));
  };

  const handleAddWebsite = (newWebsite: Website) => {
    setWebsites([...websites, newWebsite]);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Website Monitoring</h1>
            <p className="text-slate-400">Track uptime and performance of your websites</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={16} />
            Add Website
          </button>
        </div>

        {/* Dashboard Stats */}
        {websites.length > 0 && <DashboardStats websites={websites} />}
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl h-64 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="p-6 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
          <h3 className="font-semibold mb-2">Error Loading Websites</h3>
          <p>{error.message}</p>
        </div>
      ) : websites.length === 0 ? (
        <EmptyState onAddWebsite={() => setIsAddModalOpen(true)} />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {websites.map((website) => (
            <WebsiteCard
              key={website.id}
              website={website}
              onDelete={handleDeleteWebsite}
            />
          ))}
        </div>
      )}

      {/* Add Website Modal */}
      <AddWebsiteModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onWebsiteAdded={handleAddWebsite}
      />
    </main>
  );
}