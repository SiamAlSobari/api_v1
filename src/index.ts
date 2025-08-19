import { Hono } from "hono";
import { authController } from "./http/controllers/auth.controller";
import { HttpException } from "./common/helpers/http.exception";

const app = new Hono().basePath("api");
app.onError((err, c) => {
    if (err instanceof HttpException) {
        return c.json(
            { success: false, message: err.message },
            { status: err.status as 400 } // status-nya harus termasuk dalam ContentfulStatusCode
        );
    }

    return c.json({ success: false, message: err.message }, { status: 500 });
});
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/auth", authController);

export default app;
