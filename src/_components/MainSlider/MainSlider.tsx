"use client"
import React from 'react'
import  Image  from 'next/image';
import img1 from "../../../public/images/slider-image-1.jpeg"
import img2 from "../../../public/images/slider-image-2.jpeg"
import img3 from "../../../public/images/slider-image-3.jpeg"
import img4 from "../../../public/images/grocery-banner-2.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';

export default function MainSlider() {
  return (
    <div className='w-[80%] mx-auto my-4  flex'>
        <div className="w-3/4">
        <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay] }
        autoplay={{delay:2000}}
      
    
    >
      <SwiperSlide>       
         <Image alt="" src={img1} className='w-full object-cover h-[400px]'/>
      </SwiperSlide>
      <SwiperSlide>       
         <Image alt="" src={img3} className='w-full object-cover h-[400px]'/>
      </SwiperSlide>
      <SwiperSlide>       
         <Image alt="" src={img4} className='w-full object-cover h-[400px]'/>
      </SwiperSlide>
     
     
     
    </Swiper>

        </div>
        <div className="w-1/4">
          <Image alt="" src={img2} className='w-full object-cover h-[200px]'/>
            <Image alt="" src={img3} className='w-full object-cover h-[200px]'/>
        </div>
   
    </div>
  )
}
