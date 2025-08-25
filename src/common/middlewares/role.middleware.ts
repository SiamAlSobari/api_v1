import { MiddlewareHandler } from "hono";
import { HttpResponse } from "../helpers/http.response";

export const roleMiddleware  = (roles:string[]) : MiddlewareHandler =>{
    return async (c,next) => {
        const user = c.get('user')
        if (!user || !roles.includes(user.role)) {
            return HttpResponse(c, "Forbidden", 403, {});
        }
        await next();
    }
}