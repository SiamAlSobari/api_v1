import z from "zod";

export const createPostValidation = z.object({
  thumbnail: z.instanceof(File).refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {
    message: "File harus berupa gambar"
  }),
  title: z.string(),
  description: z.string(),
  topicsId: z.array(z.string())
})
