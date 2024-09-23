import * as Z from 'zod';

export const  LoginSchema = Z.object({
    email: Z.string().email({ message: 'Please enter a valid email' }),
    password: Z.string().min(4, { message: 'Password must be 4 char long' }),
});

