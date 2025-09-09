import { mysqlSchema, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const messagesTable = mysqlTable("messages", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    message: text("message").notNull(),
    senderId: varchar("sender_id", { length: 255 })
        .notNull()
        .references(() => usersTable.id),
    receiverId: varchar("receiver_id", { length: 255 })
        .notNull()
        .references(() => usersTable.id),
});

export const messagesRelatons = relations(messagesTable, ({ one }) => ({
    sender: one(usersTable, {
        fields: [messagesTable.senderId],
        references: [usersTable.id],
        relationName: "sender",
    }),
    receiver: one(usersTable, {
        fields: [messagesTable.receiverId],
        references: [usersTable.id],
        relationName: "receiver",
    }),
}));
export type message = typeof messagesTable.$inferSelect;
