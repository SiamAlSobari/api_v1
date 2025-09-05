import z from "zod";

export const createTopicValidation = z.object({
  title: z.string().min(3, { error: "Minimal 3 karakter" }),
  description: z.string().min(3, { error: "Minimal 3 karakter" })
})
