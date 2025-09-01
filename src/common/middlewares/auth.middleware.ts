import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { HttpException } from "../helpers/http.exception";
import { verify } from "hono/jwt";
import { jwtSeccret } from "../helpers/jwt.secret";

declare module "hono" {
    interface ContextVariableMap {
        user: { id: string; email: string; role: string };
    }
}

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = await getCookie(c, "token");
    if (!token) throw new HttpException("Unauthorized", 401);
    const payload = await verify(token, jwtSeccret);
    if (!payload) throw new HttpException("Unauthorized", 401);
    c.set("user", payload as { id: string; email: string; role: string });
    await next();
};
