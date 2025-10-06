"use server";

import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface DecodedSession {
  token?: string;
  [key: string]: unknown;
}


interface DecodedUser {
  id?: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken =
      cookieStore.get("next-auth.session-token")?.value ||
      cookieStore.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ message: "User not logged in" }, { status: 401 });
    }


    const decodedSession = (await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET!,
    })) as DecodedSession | null;

    const userJwt = decodedSession?.token;
    if (!userJwt) {
      return NextResponse.json({ message: "Missing user token" }, { status: 403 });
    }

 
    const decodedUser = jwtDecode<DecodedUser>(userJwt);
    const userId = decodedUser?.id;
    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 403 });
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      headers: {
        token: userJwt,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    
    console.error("Error fetching orders:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
