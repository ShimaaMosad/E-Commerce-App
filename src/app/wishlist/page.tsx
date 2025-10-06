"use client";
import { useContext } from "react";
import { WishlistContext } from "@/src/context/wishlistContext";
import removeFromWishlist from "@/src/WishlistActions/removeFromWishlist.action";
import { toast } from "sonner";
import AddBtn from "@/src/_components/AddBtn/AddBtn";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WishlistPage() {
  const { products, setProducts, setnumberOfWishlistItem } =
    useContext(WishlistContext)!;

  async function handleRemove(id: string) {
    const res = await removeFromWishlist(id);
    if (res.status === "success") {
      const newProducts = products.filter((p) => p._id !== id);
      setProducts(newProducts);
      setnumberOfWishlistItem(newProducts.length);
      toast.success("Removed from wishlist",{position:"top-center"});
    }
  }

  async function handleClearAll() {
    try {
      for (const prod of products) {
        await removeFromWishlist(prod._id);
      }
      setProducts([]);
      setnumberOfWishlistItem(0);
      toast.success("Wishlist cleared 🗑️",{position:"top-center"});
    } catch {
      toast.error("Failed to clear wishlist");
    }
  }

 return (
  <div className="container mx-auto my-12 px-4">
    <h1 className="text-3xl font-bold text-center mb-8">My Wishlist </h1>

    {products.length === 0 ? (
      <p className="text-center text-red-700 text-lg">No products in wishlist</p>
    ) : (
      <div className="flex flex-col  sm:w-1/4 md:w-1/2 lg:w-1/2 gap-8">
        {products.map((prod) => (
          <div
            key={prod._id}
            className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row group"
          >
            <div className="w-full md:w-1/3 h-56 md:h-auto overflow-hidden">
              <Image
                src={prod.imageCover}
                alt={prod.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col justify-between w-full md:w-2/3">
              <div>
                <h2 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-700 transition">
                  {prod.title}
                </h2>
                <p className="text-gray-600 font-medium mt-1">{prod.price} EGP</p>
                <div className="flex justify-between flex-col gap-4 mt-4">
                  <AddBtn id={prod._id} />
                  <button
                    onClick={() => handleRemove(prod._id)}
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <div className="text-center mb-10 mt-6">
      {products.length > 0 && (
        <Button onClick={handleClearAll} className="bg-red-700 hover:bg-red-600">
          Clear All
        </Button>
      )}
    </div>
  </div>
);
}
