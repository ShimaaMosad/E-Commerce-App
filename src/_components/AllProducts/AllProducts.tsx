import React from 'react'

import SingleProduct from './../SingleProduct/SingleProduct';
import { ProductType } from '../../types/product.type';
import getproducts from '@/src/api/products.api';

export default async function AllProducts() {
     const data=await getproducts();
  return<>
    <div className="container w-[80%] mx-auto my-12">
      <div className='flex flex-wrap'>
   
       {data.map((currentproduct:ProductType)=>(
        <SingleProduct key={currentproduct.id} product={currentproduct}/>
     ))}
       </div>
    </div>
  </>
}
