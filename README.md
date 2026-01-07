# Emlak Sitesi

Google Drive'dan veri çekerek çalışan emlak ilanları sitesi.

## Kurulum

```bash
npm install
npm run dev
```

## Google Drive API Kurulumu

1. Google Cloud Console'da proje oluştur
2. "APIs & Services" > "Library" > "Google Drive API" ara ve aktifleştir
3. "Credentials" > "Create Credentials" > "OAuth 2.0 Client IDs"
4. Uygulama türünü "Desktop application" seç (local development için)
5. İndirilen JSON dosyasını proje kök dizinine `credentials.json` olarak kaydet
6. `.env.local` dosyasına ekle:
```
GOOGLE_DRIVE_CLIENT_ID=your_client_id
GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret
```

## Veri Yapısı

Google Drive klasöründe:
- Excel dosyaları (.xlsx) - İlan verileri (title, description, price, location, bedrooms, bathrooms, area sütunları)
- Resim dosyaları (.jpg, .png) - İlan görselleri

## İlk Çalıştırma

İlk kez çalıştırdığınızda tarayıcıda Google auth sayfası açılacak ve izin vereceksiniz.

## Proje Yapısı

- `src/app/` - Next.js App Router sayfaları
- `src/components/` - React bileşenleri
- `src/lib/` - Google Drive API entegrasyonu