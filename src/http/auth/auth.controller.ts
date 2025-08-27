import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInValidation, signUpValidation } from "./auth.validation";
import AuthRepository from "./auth.repository";
import AuthService from "./auth.service";
import { HttpResponse } from "../../common/helpers/http.response";
import { deleteCookie, setCookie } from "hono/cookie";
import { authMiddleware } from "../../common/middlewares/auth.middleware";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
export const authController = new Hono<{ Variables: Context }>()
    .post("/signup", zValidator("json", signUpValidation), async (c) => {
        const { email, password, user_name,first_name,last_name } = c.req.valid("json");
        const user = await authService.signUp(email, password, user_name,first_name,last_name);
        return HttpResponse(c, "Created", 201, user);
    })
    .post("/signin", zValidator("json", signInValidation), async (c) => {
        const { email, password } = c.req.valid("json");
        const user = await authService.signIn(email, password);
        const token = setCookie(c, "token", user, { path: "/", maxAge: 60 * 60 * 24 * 2 });
        return HttpResponse(c, "Success", 200, { user, token });
    })
    .get("/session", authMiddleware, async (c) => {
        const user = c.get("user");
        return HttpResponse(c, "Success", 200, { user });
    })
    .delete("/signout", async (c) => {
        const token = deleteCookie(c, "token");
        return HttpResponse(c, "Berhasil sign out", 200, {});
    });
