import { Context, Hono } from "hono";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { updateProfileValidation } from "../../common/validations/profile.validation";
import ProfileService from "../services/profile.service";
import ProfileRepository from "../repositories/profile.repository";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);
export const profileController = new Hono<{ Variables: Context }>()
    .patch("update/:profileId",authMiddleware,zValidator('form',updateProfileValidation),async (c)=>{
        const profileId = c.req.param("profileId");
        const { name, gender, avatar, cover } = c.req.valid('form');
        // Handle the update logic here
        const updatedProfile = await profileService.updateProfile(profileId,name!,gender!,avatar!,cover!);
    })