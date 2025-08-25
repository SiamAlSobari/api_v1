import { desc } from "drizzle-orm";
import { db } from "../../core/database/db";
import { postsTable } from "../../core/database/schema";

export default class PostRepository {
    //create post
    public async create(thumbnail_url: string, title: string, description: string, userId: string) {
        await db.insert(postsTable).values({
            id: crypto.randomUUID(),
            title: title,
            description: description,
            thumbnailImageUrl: `http://localhost:3000/api/uploads/posts/thumbnail/${thumbnail_url}`,
            user_id: userId,
        });
    }

    //get data post terbaru limit 10
    public async getPosts() {
        return await db.select().from(postsTable)
        .orderBy(desc(postsTable.createdAt))
        .limit(10)
    }
}
