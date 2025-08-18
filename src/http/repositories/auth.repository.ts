import { eq } from "drizzle-orm";
import { db } from "../../core/database/db";
import { profilesTable, usersTable } from "../../core/database/schema";

export default class AuthRepository {
    public async create(email: string, hashPassword: string, name: string) {
        const userId = crypto.randomUUID();
        await db.insert(usersTable).values({
            hashPassword: hashPassword,
            email: email,
            id: userId,
        });
        await db.insert(profilesTable).values({
            id: crypto.randomUUID(),
            name: name,
            userId: userId,
        });
    }

    public async findUserByEmail(email: string) {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))
         return user ?? null
    }
}
