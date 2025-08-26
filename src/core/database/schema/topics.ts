import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { postsTable } from "./posts";

export const topicsTable = mysqlTable("topics", {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

//pivot table many to many
export const topicsPostTable = mysqlTable("topics_posts", {
    postId: varchar("post_id", { length: 255 }).notNull().references(() => postsTable.id),
    topicId: varchar("topic_id", { length: 255 }).notNull().references(() => topicsTable.id)
})


export type Topic = typeof topicsTable.$inferSelect
export type TopicPost = typeof topicsPostTable.$inferSelect