import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createPostValidation } from "../../common/validations/post.validation";
import { uploadFIle } from "../../common/helpers/upload.file";

export const postController = new Hono()
.post(
    "create",
    zValidator('form',createPostValidation),
    async (c) => {
        const { thumbnail } = c.req.valid('form');
        const upload = await uploadFIle(thumbnail, "./uploads/posts");
        return c.json(upload.randomName)
    }
)