import { eq } from "drizzle-orm";
import { db } from "../../core/database/db";
import { profilesTable } from "../../core/database/schema";

export default class ProfileRepository {
    public async updateProfile(
        avatar_url: string,
        cover_url: string,
        name: string,
        gender: string,
        profileId: string
    ) {
        const update = await db
            .update(profilesTable)
            .set({
                avatarImageUrl: `http://localhost:3000/api/uploads/profiles/avatars/${avatar_url}`,
                coverImageUrl: `http://localhost:3000/api/uploads/profiles/covers/${cover_url}`,
                name: name,
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
}
