import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { postsTable } from "./posts";

export const topicsTable = mysqlTable("topics", {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type Topic = typeof topicsTable.$inferSelect;
