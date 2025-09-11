import { Hono } from "hono";
import { authController } from "./http/auth/auth.controller";
import { HttpException } from "./common/helpers/http.exception";
import { cors } from "hono/cors";
import { postController } from "./http/post/post.controller";
import { serveStatic } from "hono/bun";
import { profileController } from "./http/profile/profile.controller";
import { join } from "path";
import { existsSync } from "fs";
import { topicController } from "./http/topic/topic.controller";

const app = new Hono().basePath("api");
const staticApp = new Hono(); // Hono tanpa basePath untuk uploads

// Pastikan path absolute ke folder uploads
const uploadsPath = join(process.cwd(), "uploads");
// Middleware untuk /api/uploads/* (dengan /api)
app.use("/uploads/*", async (c, next) => {
    const relativePath = c.req.path.replace(/^\/api\/uploads/, "");
    const filePath = join(uploadsPath, relativePath);
    console.log("app - uploadsPath:", uploadsPath);
    console.log("app - filePath:", filePath);
    console.log("app - File Exists:", existsSync(filePath));
    if (!existsSync(filePath)) {
        return c.json({ success: false, message: "File not found" }, 404);
    }
    return next();
});

app.use(
    "/uploads/*",
    serveStatic({
        root: uploadsPath,
        rewriteRequestPath: (path) => path.replace(/^\/api\/uploads/, ""),
    })
);

app.use(
    "*",
    cors({
        origin: (origin) => origin ?? "*",
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

app.onError((err, c) => {
    if (err instanceof HttpException) {
        return c.json({ success: false, message: err.message }, { status: err.status as 400 });
    }
    return c.json({ success: false, message: err.message }, { status: 500 });
});

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.route("/auth", authController);
app.route("/posts", postController);
app.route("/profiles", profileController);
app.route("topics", topicController);

export default app;
