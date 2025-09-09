import { mysqlSchema, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { usersTable } from "./users";

export const messagesTable = mysqlTable("messages", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  message: text("message").notNull()
  senderId: varchar("sender_id", { length: 255 }).notNull().references(() => usersTable.id),
  receiverId: varchar("receiver_id", { length: 255 }).notNull().references(() => usersTable.id)
});

export type message = typeof messagesTable.$inferSelect 
