import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const profilesTable = mysqlTable("profiles", {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 })
        .unique()
        .notNull()
        .references(() => usersTable.id),
    gender: varchar("gender", { length: 20 }),
    avatarImageUrl: varchar("avatar_iamge_url", { length: 255 }).default(
        "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
    ),
    coverImageUrl: varchar("cover_image_url", { length: 255 }).default(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMa-rZMEw5mFIOl2Is7nTQsQUQ5fS8qAAVsQ&s"
    ),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const profilesRelations = relations(profilesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [profilesTable.userId],
        references: [usersTable.id],
    }),
}));

export type Profile = typeof profilesTable.$inferSelect;
