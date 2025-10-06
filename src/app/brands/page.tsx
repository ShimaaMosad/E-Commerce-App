"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/brands?limit=20"
        );
        const data = await res.json();

        if (Array.isArray(data.data)) {
          setBrands(data.data);
        } else {
          setBrands([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) return <p className="p-8">Loading brands...</p>;

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-8">Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="p-5 border rounded-lg shadow hover:shadow-lg transition flex flex-col items-center bg-white"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={160}
              height={160}
              className="object-contain mb-3"
            />
            <p className="text-lg font-semibold">{brand.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
