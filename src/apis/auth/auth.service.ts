import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

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
  setRefreshToken({ user, res, req }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, //보내고 싶은 내용
      { secret: process.env.REFRESH_SECRET_KEY, expiresIn: '2w' }, //비밀번호
    );

    const alloweOrigins = ['http://localhost:3000', 'https://keystom.site'];
    const origin = req.headers.origin;

    if (alloweOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

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

  async loginOAuth({ req, res }) {
    //1.가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2.회원가입
    if (!user) {
      user = await this.userService.create({
        createUserInput: { ...req.user, address: null },
        hashedPassword: req.user.password,
      });
    }

    //3.로그인
    this.setRefreshToken({ user, res, req });

    //4. 로그인 후 리다이렉트 될 주소
    res.redirect('http://localhost:15500/frontend/social-login.html');
  }
}
