"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner"
import { loginSchema, loginSchemaType } from './../../schema/login.schema'

export default function Login() {
  const form = useForm<loginSchemaType>({
    defaultValues:{
      email:"",
      password:"",
    },
    resolver:zodResolver(loginSchema)
  });

  async function handleLogin(values:loginSchemaType){
    const res = await signIn("credentials",{
      email:values.email,
      password:values.password,
      redirect:false,
      callbackUrl:"/"
    })
    if(res?.ok){
      toast.success("you logged in succesfully",{position:"top-center",duration:3000})
      window.location.href="/"
    }else{
      toast.error(res?.error,{position:"top-center",duration:3000})
    }
  }

  return <>
    <div  className="mx-auto w-1/2 my-12">
      <h1 className='text-2xl text-center font-bold my-4'>Login Now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
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
          <Button className='mt-4 cursor-pointer w-full'> Login Now</Button>
        </form>
      </Form>
      <p className="text-lg mt-2 text-center">
        <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
          Forget Password ?
        </a>
      </p>
    </div>
  </>
}
