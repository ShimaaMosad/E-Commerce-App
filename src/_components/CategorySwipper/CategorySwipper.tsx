"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import React from 'react'
import { CategoryType } from '../../types/Category.type';

import Image from 'next/image';

export default function CategorySwipper({data}:{data:CategoryType[]}) {
  return<>
   <div className=" w-[80%] mx-auto">
    <h1 className='text-slate-500 font-semibold my-2'>Shop Popular Categories</h1>
    
    <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay] }
          autoplay={{delay:2000}}
        
      
      >


       
     
       {data.map((category)=>
            <SwiperSlide key={category._id}>       
           <Image alt="" src={category.image} className='w-full  h-[150px] object-cover'/>
           <p className='text-center font-bold'>{category.name}</p>
        </SwiperSlide>
    )}
      </Swiper>

   </div>
  </>
}
