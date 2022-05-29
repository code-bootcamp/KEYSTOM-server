import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '3h' },
    );
    return accessToken;
  }

  getTestToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.ACCESS_SECRET_KEY, expiresIn: '15' },
    );
    return accessToken;
  }
  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //보내고 싶은 내용
      { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '2w' }, //비밀번호
    );
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.delifarm.site; SameSite=None; Secure; httpOnly;`,
    );
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }
}
