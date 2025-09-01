import { Context, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { HttpResponse } from "../helpers/http.response";

export const guestMiddleware: MiddlewareHandler = async (c, next) => {
    const token = await getCookie(c, "token");
    if (token) {
        return HttpResponse(c, "Unauthorized", 401, {});
    }
    return next();
};
