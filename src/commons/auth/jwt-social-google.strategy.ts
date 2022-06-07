import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      //검증부 => 여기 내용은 다 구글에서 발급받음 => 이 내용으로 passportStrategy 실행 => 브라우저 페이지가 바뀜
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
      scope: ['email', 'profile'], //프로필 중에 어떤 걸 받을것인가 => 구글/카카오 사이트마다 다 다르다 =>지금은 구글에 맞춰서
    }); // =>super를 가지고 PassportStrategy실행
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('구글 프로필!', profile);
    return {
      email: profile.emails[0].value,
      password: profile.id, // 비밀번호는 알려주지 않으므로 임의로 적어 놓는다
      name: profile.displayName,
      nickName: profile.displayName,
      provider: profile.provider,
    }; //return 하면 context 안으로 들어감(context.req.user => user 는 라이브러리에서 자동으로 지정해준것)
  }
}
