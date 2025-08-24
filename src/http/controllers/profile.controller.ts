import { Context, Hono } from "hono";

export const prfoileController = new Hono<{ Variables: Context }>()