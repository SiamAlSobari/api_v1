import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = this.extractTokenCookies(req)
    if (!token) throw new UnauthorizedException("Anda belum login")
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET')
      })
      req['user'] = payload
    } catch (error) {
      throw new UnauthorizedException("Anda belum login")
    }
    return true
  }

  private extractTokenCookies(req: Request): string | undefined {
    return req.cookies['token']
  }
}
