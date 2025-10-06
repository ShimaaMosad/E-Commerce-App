"use server";

import getMyToken from "../utilities/getMyToken";

export default async function getLoggedUserWishlist() {
  try {
    const token = await getMyToken();
    if (!token) throw new Error("please login to be able to see wishlist!");

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    const payload = await response.json();
    return payload; 
  } catch  {
    return { status: "error", message: "Something went wrong while fetching wishlist!" };
  }
}
