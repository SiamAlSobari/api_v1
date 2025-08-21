import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createPostValidation } from "../../common/validations/post.validation";
import PostService from "../services/post.service";
import { HttpResponse } from "../../common/helpers/http.response";
import PostRepository from "../repositories/post.repository";

const postRepository = new PostRepository()
const postService = new PostService(postRepository)
export const postController = new Hono()
.post(
    "create",
    zValidator('form',createPostValidation),
    async (c) => {
        const { thumbnail,description,title } = c.req.valid('form');
        const createdPost = await postService.createPost(thumbnail, title, description);
        return HttpResponse(c, "Success", 200, createdPost)
    }
)