# Modern Emlak Sitesi MVP

Bu proje, Next.js, TypeScript ve Tailwind CSS kullanılarak geliştirilen modern, minimalist ve SEO odaklı bir emlak listeleme sitesinin Minimum Uygulanabilir Ürün (MVP) sürümüdür. Proje, kimlik doğrulama veya yönetici paneli olmadan basit bir kullanıcı deneyimi sunmayı hedefler.

## Teknolojiler

-   **Framework:** [Next.js](https://nextjs.org/) (App Router ile)
-   **Dil:** [TypeScript](https://www.typescriptlang.org/)
-   **Stil:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Bileşenleri:** [shadcn/ui](https://ui.shadcn.com/) (planlanan)

## Proje Yapısı

Proje, Next.js App Router'ın en iyi pratiklerine uygun olarak ölçeklenebilir ve yönetilebilir bir dizin yapısı kullanır:

```
.
├── app/                  # Next.js App Router ana dizini
│   ├── (components)/     # URL'yi etkilemeyen UI bileşenleri
│   │   ├── shared/       # Navbar, Footer gibi paylaşılan bileşenler
│   │   └── ui/           # Buton, Kart gibi temel UI elemanları
│   └── (pages)/          # Sayfa rotaları
│       ├── listings/     # /listings sayfası (Tüm ilanlar)
│       │   └── [slug]/   # /listings/[slug] (İlan detay sayfası)
│       ├── layout.tsx    # Sayfalar için ortak layout
│       └── page.tsx      # Ana sayfa
├── data/                 # Statik veri dosyaları (ör. JSON)
├── public/               # Resimler gibi statik varlıklar
├── styles/               # Global stil dosyaları
└── types/                # TypeScript tip tanımlamaları
    └── index.ts          # Ana veri modelleri
```

## Veri Modeli

Projenin veri modeli, farklı emlak türlerini (ev, arsa, işyeri vb.) tek bir esnek yapı altında yönetmek üzere tasarlanmıştır. Bu, TypeScript'in "discriminated unions" özelliği kullanılarak sağlanır.

-   **`BaseListing`**: Tüm ilan türleri için ortak olan temel alanları (başlık, fiyat, konum vb.) içerir.
-   **Özelleşmiş Arayüzler**: `ResidentialListing` (konut), `LandListing` (arsa/arazi) ve `CommercialListing` (ticari) gibi her türe özel ek alanları tanımlar.
-   **`Listing` Tipi**: Tüm bu özel arayüzleri birleştirerek kod içinde güvenli ve akıllı veri erişimi sağlar.

Bu yapı, veri kaynağı olarak kullanılan tek bir Google Sheet'teki farklı yapıdaki verileri bile sorunsuz bir şekilde yönetmeyi mümkün kılar.
