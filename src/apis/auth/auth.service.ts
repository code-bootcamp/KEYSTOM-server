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

  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //보내고 싶은 내용
      { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '2w' }, //비밀번호
    );
    console.log('리프레시토큰은?', refreshToken);
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
}
