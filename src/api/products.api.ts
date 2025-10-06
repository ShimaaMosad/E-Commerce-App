export default  async function getproducts(){
  const response= await fetch ("https://ecommerce.routemisr.com/api/v1/products",{
  method: "GET",
  cache: "force-cache",
  next:{revalidate :60}
});
  const {data} = await response.json();
  
 return data;
}