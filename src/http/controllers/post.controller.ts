import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createPostValidation } from "../../common/validations/post.validation";

export const postController = new Hono()
.post(
    "create",
    zValidator('form',createPostValidation),
    async (c) => {
        const { thumbnail } = c.req.valid('form');
        console.log(thumbnail.name)
        return c.json({});
    }
)