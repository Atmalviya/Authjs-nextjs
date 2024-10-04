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
import { ResetSchema } from "@/schemas";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/resetPassword";
import { useTransition } from "react";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError(undefined)
    setSuccess(undefined)
    startTransition(() => {
      console.log(values)
      reset(values) 
        .then((data)=> {
            setSuccess(data?.success)
            setError(data?.error)
        })
    })
  }
  return (
    <CardWrapper
      headerLabel="Reset password"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="email" placeholder="Enter your email" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>  
              )} 
            />
            <FormError message={error } />
            <FormSuccess message={success}/>
            <Button type="submit" className="w-full" disabled={isPending}>Reset password</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
