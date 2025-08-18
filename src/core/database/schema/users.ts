import { relations } from "drizzle-orm";
import { int, mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { profilesTable } from "./profiles";

export const usersTable = mysqlTable("users", {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    hashPassword: varchar("hash_password", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
    profile: one(profilesTable),
}));

export type User = typeof usersTable.$inferSelect;
