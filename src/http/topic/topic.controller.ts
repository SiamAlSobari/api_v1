import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { createTopicValidation } from "./topic.validation";
import { roleMiddleware } from "../../common/middlewares/role.middleware";
import { HttpResponse } from "../../common/helpers/http.response";

const topicRoute = new Hono<{ Variables: Context }>()
  .post("create", roleMiddleware(['admin']), zValidator('json', createTopicValidation), async (c) => {
    const { title, description } = c.req.valid('json')
    return HttpResponse(c, 'Success', 200, { title, description })
  })
