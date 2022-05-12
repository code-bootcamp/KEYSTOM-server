import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccesskey', expiresIn: '3h' },
    );
    return accessToken;
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //보내고 싶은 내용
      { secret: 'myRefreshKey', expiresIn: '2w' }, //비밀번호
    );
    console.log('리프레시토큰은?', refreshToken);
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
}
