import z from "zod";

export const updateProfileValidation = z.object({
    userName: z.string().min(3).max(100).optional(),
    firstName: z.string().min(3).max(100).optional(),
    lastName: z.string().min(3).max(100).optional(),
    gender: z.string().min(1).max(100).optional(),
    avatar: z
        .instanceof(File)
        .optional()
        .refine((file) => file && ["image/jpeg", "image/png", "image/jpg"].includes(file?.type), {
            message: "Invalid file type",
        }),
    cover: z
        .instanceof(File)
        .optional()
        .refine((file) => file && ["image/jpeg", "image/png", "image/jpg"].includes(file?.type), {
            message: "Invalid file type",
        }),
});
