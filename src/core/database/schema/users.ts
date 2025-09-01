import { relations } from "drizzle-orm";
import { int, mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { profilesTable } from "./profiles";
import { postsTable } from "./posts";

export const usersTable = mysqlTable("users", {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    hashPassword: varchar("hash_password", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: varchar("role", { length: 255 }).default("user").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ one,many }) => ({
    profile: one(profilesTable),
    posts: many(postsTable),
}));

export type User = typeof usersTable.$inferSelect;
