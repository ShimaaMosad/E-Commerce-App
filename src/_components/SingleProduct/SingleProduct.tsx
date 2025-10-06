import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from 'next/link';
import  Image  from 'next/image';
import { ProductType } from '../../types/product.type';
import AddBtn from '../AddBtn/AddBtn';
import WishlistBtn from '../AddBtn/WishlistBtn';


export default function SingleProduct({product}:{product:ProductType}) {
  return (
 
  <>

     <div className=' w-full md:w-1/2 lg:w-1/4 xl:w-1/5' >
     <div className="prod p-4">
     
     <Card className='relative gap-2 p-2'>
      <div className="absolute top-2 right-2 z-10">
    <WishlistBtn id={product._id} />
  </div>
       <Link href={`/products/${product.id}`}>
  <CardHeader>
    <CardTitle><Image src={product.imageCover} alt="" width={100} height={100}/></CardTitle>
    <CardDescription className='text-blue-600'>{product.category.name}</CardDescription>
    
  </CardHeader>
  <CardContent className='font-bold'>
    <p className='line-clamp-1'>{product.title}</p>
  </CardContent>
  <CardFooter>
    <div className="flex justify-between w-full">
      <span>{product.price}EGP</span>
      <span>{product.ratingsAverage}<i className="fa-solid fa-star text-yellow-500"></i></span>
    </div>

  </CardFooter>
  </Link>
  <AddBtn id={product._id}/>
  
     </Card>

     </div>
</div>
</>
 
  )
}
