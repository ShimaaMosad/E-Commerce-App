"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { signOut, useSession } from "next-auth/react"

import { CartContext } from '@/src/context/CartContext';
import { WishlistContext } from '@/src/context/wishlistContext';

export default function Navbar() {

  const { numberOfCartItem } = useContext(CartContext)!;
  const { numberOfWishlistItem } = useContext(WishlistContext)!;
  const { data: session } = useSession()

  function logout() {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <>
      
      <nav className='bg-gray-800 text-white'>
        <div className="container w-full lg:w-[80%] mx-auto p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
         
          <div className="left">
            <ul className='flex gap-2 lg:gap-6 items-center'>
              <li className='text-2xl flex'>
                <Link href="/" className="flex items-center gap-1">
                  <i className="fa-solid fa-cart-shopping"></i> FreshCart
                </Link>
              </li>
              <li><Link href="/">Home</Link></li>
              {session && (
                <li>
                  <Link className='relative' href="/cart">
                    Cart
                    {numberOfCartItem > 0 && (
                      <span className='absolute top-[-10px] end-[-10px] flex size-5 rounded-full justify-center items-center bg-rose-500 text-white font-bold text-xs'>
                        {numberOfCartItem}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/brands">Brands</Link></li>
              <li><Link href="/allorders">Orders</Link></li>
              <li><Link href="/change-password">Update profile</Link></li>
            </ul>
          </div>

     
          <div className="right">
            <ul className='flex items-center gap-4'>
              {!session ? (
                <>
                  <li><Link href="/register">Register</Link></li>
                  <li><Link href="/login">Login</Link></li>
                </>
              ) : (
                <>
                  <li>
                    <span className='cursor-pointer' onClick={logout}>Signout</span>
                  </li>
                  <li>Hi {session.user?.name}</li>
                  <li>
                    <Link href="/wishlist" className="relative">
                      <i className="fa-solid fa-heart text-2xl text-rose-500"></i>
                      {numberOfWishlistItem > 0 && (
                        <span className="absolute top-[-15px] end-[-10px] flex size-5 rounded-full justify-center items-center bg-rose-500 text-white font-bold text-xs">
                          {numberOfWishlistItem}
                        </span>
                      )}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
