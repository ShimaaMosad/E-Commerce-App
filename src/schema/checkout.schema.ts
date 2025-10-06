import * as z from "zod"

export const checkoutSchema=z.object({
     
    
    details:z.string().nonempty("details can't be empty"),
     phone:z.string().nonempty("phone can't be empty").regex(/^01[1250][0-9]{8}$/,"not vaild phone number"),
      city:z.string().nonempty("city can't be empty"),
    
})

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
