interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  type: 'sale' | 'rent';
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

export type { Property };