"use server"
import * as z from 'zod'
import { getUserByEmail } from "@/data/user"
import { ResetSchema } from "@/schemas"
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'


export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error : "Invalid Fields"}
    }
    const { email } = validatedFields.data
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error : "No user found with this email"}
    }
    const PasswordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail( PasswordResetToken.email, PasswordResetToken.token)
    return { success: "Reset email sent!" }
 
}