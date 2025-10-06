"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerSchema, registerSchemaType } from './../../schema/register.scheme';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import { toast } from "sonner";
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    resolver:zodResolver(registerSchema)
  });

  async function handleRegister(values:registerSchemaType){
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);

      if (response.data.message === "success") {
        toast.success("you registered successfully",{position:"top-center",duration:3000});
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Registration failed",{position:"top-center",duration:3000});
      } else if (err instanceof Error) {
        toast.error(err.message,{position:"top-center",duration:3000});
      } else {
        toast.error("An unexpected error occurred",{position:"top-center",duration:3000});
      }
      router.push("/login");
    }
  }

  return <>
    <div className="mx-auto w-1/2 my-12">
      <h1 className='text-2xl text-center font-bold my-4'>Register Now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name :</FormLabel> <FormLabel/>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email :</FormLabel> <FormLabel/>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password :</FormLabel> <FormLabel/>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>re-password :</FormLabel> <FormLabel/>
                <FormControl>
                  <Input type='password' {...field} />
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
                <FormLabel>Phone :</FormLabel> <FormLabel/>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button className='mt-4 cursor-pointer w-full'>Register Now</Button>
        </form>
      </Form>
    </div>
  </>
}
