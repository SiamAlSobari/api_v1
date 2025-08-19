import { comparePassword, hashPassword } from "../../common/helpers/hash.password";
import { HttpException } from "../../common/helpers/http.exception";
import { jwtSeccret } from "../../common/helpers/jwt.secret";
import { generateToken } from "../../common/helpers/jwt.token";
import AuthRepository from "../repositories/auth.repository";

export default class AuthService {
    constructor (
        private readonly authRepo: AuthRepository
    ){}
    
    public async signUp(email: string, password: string, name: string) {
        const existsUser = await this.authRepo.findUserByEmail(email);
        if (existsUser) throw new HttpException("User already exists", 400);
        const hashedPassword = await hashPassword(password);
        await this.authRepo.create(email, hashedPassword, name);
        return { email, name };
    }

    public async signIn(email:string, password: string) {
        const user = await this.authRepo.findUserByEmail(email);
        if (!user) throw new HttpException("User not found", 404);
        const isValidPassword = await comparePassword(password, user.hashPassword);
        if (!isValidPassword) throw new HttpException("Invalid password", 401);
        const payload = {id:user.id,email:user.email}
        const token = await generateToken(payload,jwtSeccret);
        return token
    }
}
