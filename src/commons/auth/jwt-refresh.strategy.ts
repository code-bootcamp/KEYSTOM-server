import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: { headers: { cookies: any } }) => {
        const cookies = req.headers.cookies;
        if (cookies) return cookies.replace('refreshToken=', '');
      },
      secretOrKey: process.env.REFRESH_SECRET_KEY,
    });
  }
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
