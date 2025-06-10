import type { Skip } from '../types/skip';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_POSTCODE = import.meta.env.VITE_DEFAULT_POSTCODE;
const DEFAULT_AREA = import.meta.env.VITE_DEFAULT_AREA;

export const fetchSkips = async (): Promise<Skip[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/skips/by-location?postcode=${DEFAULT_POSTCODE}&area=${DEFAULT_AREA}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch skips');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
}; 