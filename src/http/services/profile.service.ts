import ProfileRepository from "../repositories/profile.repository";

export default class ProfileService {
    constructor(private profileRepo: ProfileRepository) {}

    public async updateProfile(
        profileId: string,
        name: string,
        gender: string,
        avatar: File,
        cover: File
    ) {
        //logic to update profile
    }
}
