"use server";

import getMyToken from "../utilities/getMyToken";

export default async function removeFromWishlist(productId: string) {
  try {
    const token = await getMyToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: { token },
      }
    );

    const payload = await response.json();

    if (response.ok) {
      return { status: "success", data: payload };
    }

    return {
      status: "error",
      message: payload.message || "Failed to remove product",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while removing!",
    };
  }
}
