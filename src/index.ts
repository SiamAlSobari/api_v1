import { Hono } from "hono";
import { authController } from "./http/controllers/auth.controller";
import { HttpException } from "./common/helpers/http.exception";
import { cors } from "hono/cors";
import { postController } from "./http/controllers/post.controller";
import { serveStatic } from "hono/bun";

const app = new Hono().basePath("api");
app.use(
    "*",
    cors({
        origin: (origin) => origin ?? "*",
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    })
);
app.use("/uploads/*", serveStatic({ root: "../" }));
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
app.route("/posts", postController);

export default app;
