import { mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const postsTable = mysqlTable("posts", {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    thumbnailImageUrl: varchar("thumbnail_image_url",{length: 255}).notNull(),
    user_id: varchar("user_id", { length: 255 })
        .notNull()
        .references(() => usersTable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const postsRelations = relations(postsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [postsTable.user_id],
        references: [usersTable.id],
    }),
}))

export type Post = typeof postsTable.$inferSelect;
