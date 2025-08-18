import z from "zod";

export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const signUpValidation = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
});
