"use client"
import CardWrapper  from "@/components/auth/CardWrapper"
import { FaSpinner } from "react-icons/fa"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/newVerification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"


const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const onSubmit = useCallback(() => {
    if(!token){
      setError("Missing token")
      return;
    }
    newVerification(token)
      .then((data)=> {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [])
  return (
    <CardWrapper
    headerLabel="Confirm your email"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        { !success && !error && (
          <FaSpinner className="w-6 h-6 animate-spin" />
        ) }
        <FormError message = {error} />
        <FormSuccess message = {success} />
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm