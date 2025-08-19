import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { HttpException } from "../common/helpers/http.exception";
import { verify } from "hono/jwt";
import { jwtSeccret } from "../common/helpers/jwt.secret";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = await getCookie(c, "token");
    if (!token) throw new HttpException("Unauthorized", 401);
    const payload = await verify(token, jwtSeccret);
    if (!payload) throw new HttpException("Unauthorized", 401);
    return next();
};
