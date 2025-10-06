"use server";

import getMyToken from "../utilities/getMyToken";

export default async function AddToWishlist(id: string) {
  try {
    const token = await getMyToken();
    if (!token) throw new Error("Not authorized to add product");

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const payload = await response.json();
    return payload;
  } catch (err) {
    return err;
  }
}
