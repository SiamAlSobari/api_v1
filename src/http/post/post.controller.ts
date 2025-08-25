import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { createPostValidation } from "./post.validation";
import PostService from "./post.service";
import { HttpResponse } from "../../common/helpers/http.response";
import PostRepository from "./post.repository";
import { authMiddleware } from "../../common/middlewares/auth.middleware";

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
export const postController = new Hono<{ Variables: Context }>()
    .post("create", zValidator("form", createPostValidation), authMiddleware, async (c) => {
        const user = c.get("user");
        const { thumbnail, description, title } = c.req.valid("form");
        const createdPost = await postService.createPost(thumbnail, title, description, user.id);
        return HttpResponse(c, "Success", 200, createdPost);
    })
    .get("terbaru", async (c) => {
        const posts = await postService.getPostsNew();
        return HttpResponse(c, "Success", 200, posts);
    });
