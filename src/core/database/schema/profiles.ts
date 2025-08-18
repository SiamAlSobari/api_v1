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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const profilesRelations = relations(profilesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [profilesTable.userId],
        references: [usersTable.id],
    }),
}));

export type Profile = typeof profilesTable.$inferSelect;
