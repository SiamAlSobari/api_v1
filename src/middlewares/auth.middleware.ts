import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { HttpException } from "../common/helpers/http.exception";

export const authMiddleware:MiddlewareHandler = async (c, next) => {
    const token = await getCookie(c, "token");
    if (!token){
        throw new HttpException("Unauthorized", 401);
    }
}