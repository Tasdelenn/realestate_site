// types/index.ts

/**
 * İlanın durumunu belirtir (Satılık / Kiralık).
 * Google Sheet'teki "Durum" sütununa karşılık gelir.
 */
export type ListingStatus = 'satılık' | 'kiralık';

/**
 * İlanın tipini belirtir.
 * Google Sheet'teki "Tip" sütununa karşılık gelir.
 */
export type PropertyType = 'ev' | 'arsa' | 'arazi' | 'dükkan-işyeri' | 'müstakil';

/**
 * Tüm ilan türleri için ortak olan temel alanları tanımlar.
 */
export interface BaseListing {
  id: string;
  status: ListingStatus;
  type: PropertyType;
  title: string;          // Başlık
  description: string;    // Açıklama
  price: number;          // Fiyat
  location: {             // Konum (İl/İlçe/Mah)
    city: string;
    district: string;
    neighborhood: string;
  };
  area: number;           // Alan m2
  images: string[];       // Google Drive'daki resimlerin linkleri
  mainImage: string;

  // Sadece size özel, veritabanından gelecek alanlar
  coordinates?: string; // Konum (KML, KMZ veya koordinat)
  sellerInfo?: string;  // Satıcı (Private)
  privateNotes?: string;// Notlar (Private)
  createdAt: string;
}

/**
 * Konut tipi ilanlar (ev, müstakil) için ek alanları tanımlar.
 */
export interface ResidentialListing extends BaseListing {
  type: 'ev' | 'müstakil';
  bedrooms: number;       // Oda Sayısı
  bathrooms: number;      // Banyo Sayısı
  livingRooms?: number;   // Salon Sayısı
}

/**
 * Arsa ve arazi tipi ilanlar için ek alanları tanımlar.
 */
export interface LandListing extends BaseListing {
  type: 'arsa' | 'arazi';
  island?: string;        // Ada
  parcel?: string;        // Parsel
}

/**
 * Ticari tip ilanlar (dükkan-işyeri) için ek alanları tanımlar.
 */
export interface CommercialListing extends BaseListing {
  type: 'dükkan-işyeri';
  rooms?: number;         // Oda/Bölme Sayısı
  bathrooms?: number;     // WC Sayısı
}

/**
 * Listing tipi, yukarıda tanımlanan tüm özel ilan tiplerinin bir birleşimidir.
 * Bu yapı, kod içinde bir ilanın tipine göre doğru alanlara güvenli bir şekilde
 * erişmemizi sağlar. Örneğin, `if (ilan.type === 'arsa')` kontrolü yapıldığında,
 * TypeScript `ilan.parcel` alanının var olduğunu anlar.
 */
export type Listing = ResidentialListing | LandListing | CommercialListing;
