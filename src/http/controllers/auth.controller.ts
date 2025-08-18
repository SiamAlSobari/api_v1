import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInValidation, signUpValidation } from "../../common/validations/auth.validation";
import AuthRepository from "../repositories/auth.repository";
import AuthService from "../services/auth.service";
import { HttpResponse } from "../../common/helpers/http.response";
import { setCookie } from "hono/cookie";

const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
export const authController = new Hono()
.post(
    "/signup",
    zValidator("json", signUpValidation),
    async (c) => {
        const { email, password, name} = c.req.valid("json");
        const user = await authService.signUp(email, password, name)
        return HttpResponse(c, "Created", 201, user);
    }
)
.post(
    "/signin",
    zValidator("json", signInValidation),
    async (c) => {
        const { email, password} = c.req.valid("json");
        const user = await authService.signIn(email, password)
        const token = setCookie(c, "token", user.id, { path: "/",maxAge: 60 * 60 * 24 * 2 });
        return HttpResponse(c, "Success", 200, { user, token });
    }
)