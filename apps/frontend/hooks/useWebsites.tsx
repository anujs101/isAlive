"use client"
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export interface Website {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: string;
    websiteId: String,
    validatorId :String,
    status :String,
    latency: number,
    website: Website,
  }[];
}
export type Tick = Website['ticks'][number];
export function useWebsites() {
  const { getToken } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  async function refreshWebsites() {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
        headers: {
          Authorization: `token`,
        },
      });
      setWebsites(response.data.websites);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshWebsites();

    // Call the function every minute
    const interval = setInterval(() => refreshWebsites(), 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, [getToken]); // Add getToken as a dependency

  return { websites, loading, error, refreshWebsites, setWebsites};
}