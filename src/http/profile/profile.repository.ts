import { eq } from "drizzle-orm";
import { db } from "../../core/database/db";
import { profilesTable } from "../../core/database/schema";

export default class ProfileRepository {
    public async updateProfile(
        avatar_url: string,
        cover_url: string,
        userName: string,
        firstName: string,
        lastName: string,
        gender: string,
        profileId: string
    ) {
        const update = await db
            .update(profilesTable)
            .set({
                avatarImageUrl: `http://localhost:3000/api/uploads/profiles/avatars/${avatar_url}`,
                coverImageUrl: `http://localhost:3000/api/uploads/profiles/covers/${cover_url}`,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
            })
            .where(eq(profilesTable.id, profileId));
    }

    public async getProfileById(profileId: string) {
        const [profile] = await db
            .select()
            .from(profilesTable)
            .where(eq(profilesTable.id, profileId));
        return profile;
    }

    public async getProfileByUserId(userId: string) {
        const [profile] = await db
            .select()
            .from(profilesTable)
            .where(eq(profilesTable.userId, userId));
        return profile;
    }

    public async getProfileByUserName(userName:string) {
        const [profile] = await db
            .select()
            .from(profilesTable)
            .where(eq(profilesTable.userName, userName));
        return profile;
    }
}
