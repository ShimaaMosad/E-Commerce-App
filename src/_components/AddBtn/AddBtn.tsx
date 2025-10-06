"use client"
import { Button } from '@/components/ui/button'
import AddToCart from '@/src/CartActions/addtoCart.action'
import { CartContext } from '@/src/context/CartContext';
import React, { useContext } from 'react'
import { toast } from 'sonner';

export default function AddBtn({id}:{id:string}) {
    const{numberOfCartItem,setnumberOfCartItem}=useContext(CartContext)!;


    async function checkAddProduct(id:string){
        const res=await AddToCart(id);
        if(res.status==="success"){
            toast.success("product added successfully ",{position:"top-center",duration:2000});
            setnumberOfCartItem(numberOfCartItem + 1)
        }
        else{
             toast.error(res.message,{position:"top-center",duration:2000});
        }
    }
  return <>
  <Button onClick={()=>checkAddProduct(id)} className='cursor-pointer w-full my-2'>Add to Cart</Button>
  </>
}
