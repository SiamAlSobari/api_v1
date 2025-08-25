import { uploadFile } from "../../common/helpers/upload.file";
import ProfileRepository from "./profile.repository";

export default class ProfileService {
    constructor(private profileRepo: ProfileRepository) {}

    public async updateProfile(
        profileId: string,
        name: string,
        gender: string,
        avatar: File,
        cover: File
    ) {
        //ambil data sebelumnya
        const profile = await this.profileRepo.getProfileById(profileId);
        //data avatar dan cover sebelumnya di tampung di variable
        let avatar_url: string = profile.avatarImageUrl!;
        let cover_url: string = profile.coverImageUrl!;

        //upload avatar jika ada lalu ubah nilai variable
        if (avatar) {
            const uploadAvatar = await uploadFile(avatar, "uploads/profiles/avatars");
            avatar_url = uploadAvatar.randomName;
        }
        //upload cover jika ada lalu ubah nilai variable
        if (cover) {
            const uploadCover = await uploadFile(cover, "uploads/profiles/covers");
            cover_url = uploadCover.randomName;
        }
        await this.profileRepo.updateProfile(avatar_url, cover_url, name, gender, profileId);
    }
}
