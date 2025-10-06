"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Subcategory {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function SubcategoriesPage() {
  const { id } = useParams(); // ID of the selected category
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryAndSubcategories() {
      try {
        // fetch category info
        const catRes = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
        const catData = await catRes.json();
        setCategory(catData.data || null);

        // fetch subcategories
        const subRes = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${id}`);
        const subData = await subRes.json();
        setSubcategories(subData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryAndSubcategories();
  }, [id]);

  if (loading) return <p className="p-8 text-center">Loading subcategories...</p>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {category?.name || "Category"} - Subcategories
      </h1>

      {subcategories.length === 0 ? (
        <p className="text-center text-red-500">No subcategories found!</p>
      ) : (
        <div className=" px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories.map((sub) => (
            <div
              key={sub._id}
              className="border rounded-lg shadow p-6 text-center text-lg font-semibold transition transform hover:scale-105 hover:bg-green-100 cursor-pointer"
              onClick={() => console.log(`Clicked on ${sub.name}`)} // أو أي وظيفة حابة تعمليها
            >
              {sub.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
