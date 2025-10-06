"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { checkoutSchema ,checkoutSchemaType} from '@/src/schema/checkout.schema'
import onlinePayment from '@/src/checkoutActions/onlineCheckout.action'

export default function Checkout() {
  const {id} :{id: string} = useParams()
  
  const form = useForm<checkoutSchemaType>({
    defaultValues:{
        details: "",
        phone: "",
        city: ""
    },
    resolver:zodResolver(checkoutSchema),
});

  async function handleCheckout(values:checkoutSchemaType){
    const res= await onlinePayment(id,"http://localhost:3000/",values)
    if(res.status==="success"){
      window.location.href=res.session.url
    }
  }

  return <>
    <div className="mx-auto w-1/2 my-12">
      <h1 className='text-2xl text-center font-bold my-4'>Checkout Now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCheckout)}>
          <FormField
            control={form.control}
            name="details"
            render={({field}) => (
              <FormItem>
                <FormLabel>Details :</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone :</FormLabel>
                <FormControl>
                  <Input type='tel' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem>
                <FormLabel>City :</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button className='mt-4 cursor-pointer w-full'>Pay Now</Button>
        </form>
      </Form>
    </div>
  </>
}
