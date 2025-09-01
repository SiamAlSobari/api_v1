import { comparePassword, hashPassword } from "../../common/helpers/hash.password";
import { HttpException } from "../../common/helpers/http.exception";
import { jwtSeccret } from "../../common/helpers/jwt.secret";
import { generateToken } from "../../common/helpers/jwt.token";
import ProfileRepository from "../profile/profile.repository";
import AuthRepository from "./auth.repository";

export default class AuthService {
    constructor(
        private readonly authRepo: AuthRepository,
        private readonly profileRepo: ProfileRepository
    ) {}

    public async signUp(
        email: string,
        password: string,
        userName: string,
        firstName: string,
        lastName: string
    ) {
        const existsUser = await this.authRepo.findUserByEmail(email);
        if (existsUser) throw new HttpException("User already exists", 400);
        const existUserName = await this.profileRepo.getProfileByUserName(userName);
        if (existUserName) throw new HttpException("User name already exists", 400);
        const isAdmin = await this.authRepo.countAdmin();
        const role = isAdmin.count < 3 ? "admin" : "user";
        const hashedPassword = await hashPassword(password);
        await this.authRepo.create(email, hashedPassword, userName, firstName, lastName, role);
        return { email, userName, firstName, lastName };
    }

    public async signIn(email: string, password: string) {
        const user = await this.authRepo.findUserByEmail(email);
        if (!user) throw new HttpException("User not found", 404);

        const isValidPassword = await comparePassword(password, user.hashPassword);
        if (!isValidPassword) throw new HttpException("Invalid password", 401);
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = await generateToken(payload, jwtSeccret);
        return token;
    }
}
