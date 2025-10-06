"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; 


type Category = {
  _id: string;
  name: string;
  image: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p className="p-8">Loading categories...</p>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="border rounded-lg shadow hover:shadow-lg transition bg-white overflow-hidden"
          >
           
            <Image
              src={cat.image}
              alt={cat.name}
              width={400}
              height={300}
              className="w-full h-48 object-contain"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{cat.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
