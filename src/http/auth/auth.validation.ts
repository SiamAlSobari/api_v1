import z from "zod";

export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const signUpValidation = z.object({
    email: z.string().email(),
    password: z.string(),
    userName: z.string().min(3).max(100),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
});
