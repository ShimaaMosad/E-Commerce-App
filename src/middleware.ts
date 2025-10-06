import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {getToken} from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request});
  
  if (token){
    if ( request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register"){
      return NextResponse.redirect(new URL("/", request.url));
    }
    else{
      return NextResponse.next();
    }
  }else{
    if ( request.nextUrl.pathname === "/cart"){
      return NextResponse.redirect(new URL("/login", request.url));
    }
    else{
      return NextResponse.next();
    }

  }

}

export const config = {
  matcher: ["/cart", "/login", "/register"],
}
