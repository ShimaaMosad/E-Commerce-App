import React from "react";
import selectedproduct from "../../../api/selectedproduct";
import DetailedProduct from "@/src/_components/DetailedProduct/DetailedProduct";
import getRelatedProducts from "@/src/productCategoryActions/relatedProducts.action";
import { ProductType } from "@/src/types/product.type";
import SingleProduct from "@/src/_components/SingleProduct/SingleProduct";


export default async function ProductDetails({ params }:{params : Promise<{id:string}>}) {
 const { id } =  await params;
 
 const data = await selectedproduct(id);
 
 if(!data) return <h1>No Products here</h1>

 const RelatedProducts = await getRelatedProducts(data.category._id);

  
  
  return <>
   <DetailedProduct data={data}/>

     <div className="container w-[80%] mx-auto my-12">
         <div className='flex flex-wrap'>
      
          {RelatedProducts?.data?.map((currentproduct: ProductType)=>(
           <SingleProduct key={currentproduct.id} product={currentproduct}/>
        ))}
          </div>
       </div>
   </>

}
