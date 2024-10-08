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
import { LoginSchema } from "@/schemas";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { FormWarning } from "../form-warning";
import { login } from "@/actions/login";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email is alredy in use with different provider" : "";
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [warning, setWarning] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined)
    setSuccess(undefined)
    startTransition(() => {
      login(values) 
        .then((data)=> {
            setSuccess(data?.success)
            setError(data?.error)
            setWarning(data?.warning)
        })
    })
  }
  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={true}
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
            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} type="password" placeholder="Enter your password" />
                  </FormControl>
                  <Button size="sm" variant="link" asChild className="px-0">
                    <Link href="/auth/reset">Forgot password ?</Link>
                  </Button>
                  <FormMessage/>
                </FormItem>  
              )} 
            />
            <FormError message={error || urlError} />
            <FormSuccess message={success}/>
            <FormWarning message={warning}/>
            <Button type="submit" className="w-full" disabled={isPending}>Login</Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
