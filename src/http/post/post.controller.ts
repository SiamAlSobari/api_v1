import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { createPostValidation } from "./post.validation";
import PostService from "./post.service";
import { HttpResponse } from "../../common/helpers/http.response";
import PostRepository from "./post.repository";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import TopicRepository from "../topic/topic.repository";

const postRepository = new PostRepository();
const topicRepository = new TopicRepository();
const postService = new PostService(postRepository, topicRepository);
export const postController = new Hono<{ Variables: Context }>()
  .post("create", zValidator("form", createPostValidation), authMiddleware, async (c) => {
    const user = c.get("user");
    const { thumbnail, description, title, topicsId } = c.req.valid("form");
    const createdPost = await postService.createPost(thumbnail, title, description, topicsId, user.id);
    return HttpResponse(c, "Success", 200, createdPost);
  })
  .get("terbaru", async (c) => {
    const posts = await postService.getPostsNew();
    return HttpResponse(c, "Success", 200, posts);
  })

