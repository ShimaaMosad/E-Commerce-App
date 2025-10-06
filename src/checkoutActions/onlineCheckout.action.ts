"use server"

import { checkoutSchemaType } from "../schema/checkout.schema";
import getMyToken from "../utilities/getMyToken"


export default async function  onlinePayment (
    cartId: string,
    url : string,
    formValues: checkoutSchemaType
){
try{
        const token=await getMyToken()
    if(!token) throw new Error("login first")
const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
        method:'POST',
        headers:{
            token,
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ shippingAddress: formValues })
});
const payload=await response.json();
return payload

}catch(err){
    return err
}
}