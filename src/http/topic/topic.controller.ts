import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { createTopicValidation } from "./topic.validation";
import { roleMiddleware } from "../../common/middlewares/role.middleware";
import { HttpResponse } from "../../common/helpers/http.response";
import TopicService from "./topic.service";
import TopicRepository from "./topic.repository";

const topicRepository = new TopicRepository();
const topicService = new TopicService(topicRepository);

export const topicController = new Hono<{ Variables: Context }>()
    .post(
        "create",
        roleMiddleware(["admin"]),
        zValidator("json", createTopicValidation),
        async (c) => {
            const { title, description } = c.req.valid("json");
            await topicService.createTopic(title, description);
            return HttpResponse(c, "Success", 200, { title, description });
        }
    )
    .get("", async (c) => {
        const topics = await topicService.getTopics();
        return HttpResponse(c, "Success", 200, topics);
    });
