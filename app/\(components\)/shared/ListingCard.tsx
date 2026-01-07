// app/(components)/shared/ListingCard.tsx
import React from 'react';
import { Listing, PropertyType } from '@/types'; // Güncellenmiş veri modelimizi import ediyoruz

type Props = {
  listing: Listing;
};

/**
 * İlanın tipine göre gösterilecek olan ek bilgileri render eden yardımcı bir fonksiyon.
 * Bu, component'in ana render metodunu daha temiz tutar.
 */
const renderTypeSpecificDetails = (listing: Listing) => {
  switch (listing.type) {
    case 'ev':
    case 'müstakil':
      // ResidentialListing tipine ait alanlara güvenle erişebiliriz.
      return (
        <p>{listing.bedrooms} Oda / {listing.bathrooms} Banyo</p>
      );
    case 'arsa':
    case 'arazi':
      // LandListing tipine ait alanlara güvenle erişebiliriz.
      return (
        <p>Ada: {listing.island || 'N/A'} / Parsel: {listing.parcel || 'N/A'}</p>
      );
    case 'dükkan-işyeri':
      // CommercialListing tipine ait alanlara güvenle erişebiliriz.
      return (
        <p>{listing.rooms ? `${listing.rooms} Bölme` : 'Tek Bölme'}</p>
      );
    default:
      return null;
  }
};

const ListingCard = ({ listing }: Props) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', margin: '16px', borderRadius: '8px' }}>
      <img src={listing.mainImage} alt={listing.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
      <h3>{listing.title}</h3>
      <p style={{ fontWeight: 'bold', color: '#007bff' }}>
        {listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
      </p>
      <p>{listing.location.city}, {listing.location.district}</p>
      <p>Alan: {listing.area} m²</p>

      {/* İlan tipine özel bilgileri burada render ediyoruz */}
      {renderTypeSpecificDetails(listing)}

      <p style={{ fontStyle: 'italic', textTransform: 'capitalize' }}>
        {listing.type} - {listing.status}
      </p>
    </div>
  );
};

export default ListingCard;
