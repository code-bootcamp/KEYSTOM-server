import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao'; //jwt방식

//방어막 설계
@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  //jwt방식(strategy)으로 인가를 처리할거야 이름은 naver
  constructor() {
    super({
      //검증부 => 여기 내용은 다 네이버에서 발급받음 => 이 내용으로 passportStrategy 실행 => 브라우저 페이지가 바뀜
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACKURL,
      scope: ['account_email', 'profile_nickname'], //프로필 중에 어떤 걸 받을것인가 => 구글/카카오 사이트마다 다 다르다 =>지금은 구글에 맞춰서
    }); // =>super를 가지고 PassportStrategy실행
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('카카오 프로필!', profile);

    return {
      email: profile._json.kakao_account.email,
      password: profile.id, // 비밀번호는 알려주지 않으므로 임의로 적어 놓는다
      name: profile.displayName,
      nickName: profile.displayName,
      provider: profile.provider,
    }; //return 하면 context 안으로 들어감(context.req.user => user 는 라이브러리에서 자동으로 지정해준것)
  }
}
