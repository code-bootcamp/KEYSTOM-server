import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) =>
        req.headers.cookie
          .split('; ')
          .filter((el) => el.includes('refreshToken='))[0]
          .replace('refreshToken=', ''),
      secretOrKey: 'myRefreshKey',
    });
  }
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
