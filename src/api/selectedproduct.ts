

export default async function selectedproduct(id : string) {
     

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  const {data} = await response.json();
 

  return data;
}
