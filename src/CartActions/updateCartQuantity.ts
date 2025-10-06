"use server"
import getMyToken from "../utilities/getMyToken"


export default async function  updateCartQuantity (id: string, count: string){
    const token = await getMyToken()
    if(!token) throw new Error("login first ")
const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        method:'PUT',
        headers:{
            token,
            "Content-Type":"application/json"
        },
        body: JSON.stringify({count})
});
const payload = await response.json();
return payload
}