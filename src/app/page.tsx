import PropertyList from '@/components/PropertyList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Emlak Sitesi
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Google Drive'dan veri çekerek emlak ilanları yayınlayacağız.
        </p>
        <PropertyList />
      </div>
    </main>
  )
}