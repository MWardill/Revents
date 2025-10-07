import z from "zod";

export const registerSchema = z.object({
    displayName: z.string().min(5, 'Display Name is required with a min of 5 characters'),
    email: z.email({message: 'Invalid email address'}).min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;