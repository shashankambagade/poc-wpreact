// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/wp'; // ← adjust path if different

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts({ per_page: 8 })
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <div key={product.id} className="group relative">
              <img
                src={product.images?.[0]?.src || 'https://via.placeholder.com/300'}
                alt={product.name}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg text-gray-700">
                    <a href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0 " />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.categories?.map(cat => cat.name).join(', ') || '—'}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{product.price_html ? (
                  <span dangerouslySetInnerHTML={{ __html: product.price_html }} />
                ) : (
                  `$${product.price}`
                )}</p>
              </div>
              <a
                href={`/?add-to-cart=${product.id}`}
                className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add to Cart
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
