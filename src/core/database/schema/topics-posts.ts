import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { postsTable } from "./posts";
import { topicsTable } from "./topics";

//pivot table many to many
export const topicsPostTable = mysqlTable("topics_posts", {
    postId: varchar("post_id", { length: 255 })
        .notNull()
        .references(() => postsTable.id),
    topicId: varchar("topic_id", { length: 255 })
        .notNull()
        .references(() => topicsTable.id),
});

export type TopicPost = typeof topicsPostTable.$inferSelect;
