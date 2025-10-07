import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { updateProfileValidation } from "../profile/profile.validation";
import ProfileService from "../profile/profile.service";
import ProfileRepository from "../profile/profile.repository";
import { authMiddleware } from "../../common/middlewares/auth.middleware";
import { HttpResponse } from "../../common/helpers/http.response";

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);
export const profileController = new Hono<{ Variables: Context }>()
    .patch(
        "update/:profileId",
        authMiddleware,
        zValidator("form", updateProfileValidation),
        async (c) => {
            const profileId = c.req.param("profileId");
            const { userName, firstName, lastName, gender, avatar, cover } = c.req.valid("form");
            // kirim ke service
            const updatedProfile = await profileService.updateProfile(
                profileId,
                userName!,
                firstName!,
                lastName!,
                gender!,
                avatar!,
                cover!
            );
            return HttpResponse(c, "Profile updated successfully", 200, updatedProfile);
        }
    )
    .get("/", authMiddleware, async (c) => {
        const userId = c.get("user").id;
        const profile = await profileService.getProfileByUserId(userId);
        return HttpResponse(c, "Profile fetched successfully", 200, profile);
    })
    .get("/:userId", authMiddleware, async (c) => {
        const userId = c.req.param("userId");
        const profile = await profileService.getProfileByUserId(userId);
        return HttpResponse(c, "Profile fetched successfully", 200, profile);
    });
