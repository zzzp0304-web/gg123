// Utility function to create URL-friendly slugs from market titles
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Add slug to market interface and data
export interface Market {
  id: string;
  slug: string; // Add slug field
  title: string;
  image: string;
  category: string;
  options: {
    text: string;
    percentage: number;
  }[];
  participants: number;
  volume: string;
  endDate?: string;
  status?: 'active' | 'ended' | 'perpetual';
  description?: string;
  rules?: string;
  resolutionSource?: string;
  createdAt?: string;
}
