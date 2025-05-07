import { useAuth} from '@clerk/nextjs';
import { Website } from '@/hooks/useWebsites';

const API_BASE_URL = '/api/v1';

/**
 * Add a new website to monitor
 */
export const addWebsite = async (url: string): Promise<Website> => {
  const { getToken } = useAuth();
  const token = await getToken();
  
  const response = await fetch(`${API_BASE_URL}/website`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add website');
  }

  return response.json();
};

/**
 * Delete a website from monitoring
 */
export const deleteWebsite = async (websiteId: string): Promise<void> => {
  const { getToken } = useAuth();
  const token = await getToken();
  
  const response = await fetch(`${API_BASE_URL}/website`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ websiteId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete website');
  }
};