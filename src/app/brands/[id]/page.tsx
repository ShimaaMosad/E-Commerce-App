"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export default function BrandProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
        );
        const data = await res.json();
        console.log("Brand products:", data);

        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProducts();
  }, [id]);

  if (loading) return <p className="p-8">Loading products...</p>;

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {products.length === 0 ? (
        <p className="text-red-500 font-bold text-center mt-5">
          No products found for this brand.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg bg-white"
            >
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={160}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-emerald-600 font-bold">{product.price} EGP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
