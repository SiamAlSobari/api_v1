import z from "zod";

export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const signUpValidation = z.object({
    email: z.string().email(),
    password: z.string(),
    user_name: z.string().min(3).max(100),
    first_name: z.string().min(3).max(100),
    last_name: z.string().min(3).max(100),
});
