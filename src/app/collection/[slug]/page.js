import { notFound } from 'next/navigation';
import ProductCard from '@/components/common/ProductCard';
import products from '@/data/products.json';

const COLLECTIONS = {
  trending: {
    title: "Trending Collection",
    description: "Stay ahead of the trend with our most popular styles. Designed for those who love to stand out.",
    tag: "trending"
  },
  summer: {
    title: "Summer Collection",
    description: "Lightweight, breathable, and perfect for warm days. Feel cool, look cooler.",
    tag: "summer"
  },
  printed: {
    title: "Printed Tees",
    description: "Express yourself with bold and creative designs. Wear your personality.",
    tag: "printed"
  }
};

export default function CollectionPage({ params }) {
  const { slug } = params;
  const collection = COLLECTIONS[slug];

  if (!collection) {
    notFound();
  }

  const collectionProducts = products.filter((p) => p.tags.includes(collection.tag));

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{collection.title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {collection.description}
          </p>
        </div>

        {/* Product Grid */}
        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-gray-500">More styles coming soon to this collection!</p>
          </div>
        )}
      </div>
    </main>
  );
}
