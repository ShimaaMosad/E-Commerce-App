"use client";

import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/src/context/wishlistContext";
import { toast } from "sonner";
import AddToWishlist from "@/src/WishlistActions/addToWishlist.action";
import removeFromWishlist from "@/src/WishlistActions/removeFromWishlist.action";

export default function WishlistBtn({ id }: { id: string }) {
  const { products, setProducts, numberOfWishlistItem, setnumberOfWishlistItem } =
    useContext(WishlistContext)!;

  const [inWishlist, setInWishlist] = useState(false);

  
  useEffect(() => {
    if (products.some((item) => item._id === id)) {
      setInWishlist(true);
    }
  }, [products, id]); 

  async function handleWishlist() {
    try {
      if (inWishlist) {
       
        setInWishlist(false); 
        const res = await removeFromWishlist(id);
        if (res.status === "success") {
          const newProducts = products.filter((p) => p._id !== id);
          setProducts(newProducts);
          setnumberOfWishlistItem(newProducts.length);
          toast.success("Removed from wishlist 🗑", { position: "top-center" });
        } else {
          setInWishlist(true); 
        }
      } else {
        
        setInWishlist(true); 
        const res = await AddToWishlist(id);
        if (res.status === "success") {
          setProducts([...products, res.data]);
          setnumberOfWishlistItem(numberOfWishlistItem + 1);
          toast.success("Added to wishlist ❤", { position: "top-center" });
        } else {
          setInWishlist(false);
        }
      }
    } catch  {
      toast.error("Something went wrong!");
      setInWishlist(products.some((item) => item._id === id)); 
    }
  }

  return (
    <button
      onClick={handleWishlist}
      className="text-xl transition hover:scale-125"
    >
      <i
        className={`${
          inWishlist
            ? "fa-solid fa-heart text-red-500"
            : "fa-regular fa-heart text-gray-400"
        }`}
      ></i>
    </button>
  );
}