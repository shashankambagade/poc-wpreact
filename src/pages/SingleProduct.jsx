// src/components/SingleProduct.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../api/wp'; // You must define this function to fetch by slug

const SingleProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductBySlug(slug);
      if (data && data.length > 0) {
        setProduct(data[0]);
      }
    };
    fetchProduct();
  }, [slug]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const image = product.images?.[0]?.src || '';
  const gallery = product.images || [];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Image Section */}
        <div className="lg:max-w-lg">
          <img src={image} alt={product.name} className="rounded-lg shadow-lg mb-4" />
          <div className="flex space-x-2">
            {gallery.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={img.name}
                className="h-16 w-16 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <p className="mt-2 text-2xl text-gray-900">${product.price}</p>
          <div className="mt-3 text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: product.description }} />
          <p className="mt-4 text-sm text-gray-500">
            Categories: {product.categories?.map(c => c.name).join(', ') || '—'}
          </p>

          <button
            className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded hover:bg-indigo-700"
            onClick={() => window.location.href = `/?add-to-cart=${product.id}`}
          >
            Add to bag
          </button>

          {/* Tabs Placeholder */}
          <div className="mt-8 border-t">
            {['Features', 'Care', 'Shipping', 'Returns'].map((title, i) => (
              <details key={i} className="py-3 border-b">
                <summary className="font-medium cursor-pointer">{title}</summary>
                <p className="mt-2 text-sm text-gray-500">Details for {title}...</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
