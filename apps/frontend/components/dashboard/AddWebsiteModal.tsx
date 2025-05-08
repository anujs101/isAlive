"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addWebsite } from '@/lib/api';
import { Website } from '@/hooks/useWebsites';
import { useAuth } from '@clerk/nextjs';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWebsiteAdded: (website: Website) => void;
}

export const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({
  isOpen,
  onClose,
  onWebsiteAdded,
}) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {getToken} = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch (e) {
      setError('Please enter a valid URL including https://');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {

      const token = await getToken();
      const newWebsite = await addWebsite(url, token || undefined);
      onWebsiteAdded(newWebsite);
      setUrl('');
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add website');
      
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-slate-900 border border-slate-700/50 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-700/50">
          <h2 className="text-lg font-medium text-white">Add Website</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-1">
              Website URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              disabled={isLoading}
            />
            {error && (
              <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Website'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};