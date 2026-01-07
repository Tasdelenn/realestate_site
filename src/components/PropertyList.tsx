'use client';

import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error('API returned non-array data:', data);
          setProperties([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setLoading(false);
        setProperties([]);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <p className="text-2xl font-bold text-green-600">
              {property.price.toLocaleString('tr-TR')} ₺
            </p>
            <div className="mt-2 text-sm text-gray-500">
              <div className="mt-2 text-sm text-gray-500">
                {property.bedrooms > 0 ? (
                  <>
                    {property.bedrooms} oda • {property.bathrooms} banyo • {property.area} m²
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-gray-700">ARSALAR</span> • {property.area} m²
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}