import React from 'react'

import { ProductType } from '../../types/product.type';
import AddBtn from '../AddBtn/AddBtn';
import Image from 'next/image';


export default function DetailedProduct({data}:{data:ProductType}) {

  return <>
  
         <div className="container w-full  lg:w-[60%] mx-auto p-4 flex">
      <div className="w-1/4">
        <Image src={data.imageCover} className="w-full" alt={data.title} />
      </div>

      <div className="w-3/4">
        <div className="p-4">
          <h1>{data.title}</h1>
          <p className="text-emerald-600 my-2">{data.description}</p>
          <p>{data.category?.name}</p>
          <div className="flex justify-between w-full">
            <span>{data.price} EGP</span>
            <span>
              {data.ratingsAverage}
              <i className="fa-solid fa-star text-yellow-500 ml-1"></i>
            </span>
              
          </div>
           <AddBtn id={data.id}/>
           

        </div>
      </div>
    </div>
      

  </>
}
