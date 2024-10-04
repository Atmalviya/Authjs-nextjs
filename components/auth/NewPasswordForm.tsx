"use client";
import React, { useState } from "react";
import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/newPassword";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation"

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError(undefined)
    setSuccess(undefined)
    startTransition(() => {
      newPassword(values, token) 
        .then((data)=> {
            setSuccess(data?.success)
            setError(data?.error)
        })
    })
  }
  return (
    <CardWrapper
      headerLabel="Enter new password"
      backButtonLabel="Go back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="password" placeholder="Enter your new password" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>  
              )} 
            />
            <FormError message={error } />
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>Set new password</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
