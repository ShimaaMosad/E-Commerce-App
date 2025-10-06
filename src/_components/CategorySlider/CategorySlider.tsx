
import React from 'react'

import CategorySwipper from '../CategorySwipper/CategorySwipper'
import getAllCategories from '@/src/api/AllCategories'

export default async function CategorySlider() {
    const data = await getAllCategories()
  return (
    <>

<CategorySwipper data ={data}/>




</>
  )

  
}
