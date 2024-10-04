import * as Z from 'zod';

export const  LoginSchema = Z.object({
    email: Z.string().email({ message: 'Please enter a valid email' }),
    password: Z.string().min(4, { message: 'Password must be 4 char long' }),
});

export const  RegisterSchema = Z.object({
    email: Z.string().email({ message: 'Please enter a valid email' }),
    password: Z.string().min(4, { message: 'Password must be 4 char long' }),
    name: Z.string().min(1, { message: 'Name is required' }),
});

export const  ResetSchema = Z.object({
    email: Z.string().email({ message: 'Please enter a valid email' }),
});