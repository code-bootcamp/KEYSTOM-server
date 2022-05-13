import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20'; //jwt방식

//방어막 설계
@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  //jwt방식(strategy)으로 인가를 처리할거야 이름은 access
  constructor() {
    super({
      //검증부 => 여기 내용은 다 구글에서 발급받음 => 이 내용으로 passportStrategy 실행 => 브라우저 페이지가 바뀜
      clientID:
        '523485314710-ai9823abs2ked0r0akadamvgbs5gtg6c.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3003/login/google',
      scope: ['email', 'profile'], //프로필 중에 어떤 걸 받을것인가 => 구글/카카오 사이트마다 다 다르다 =>지금은 구글에 맞춰서
    }); // =>super를 가지고 PassportStrategy실행
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // 구글에서 받는 것
    //검증 완료되면 실행(검증 실패하면 중간에 에러 떨어짐)
    console.log('accessToken은 ', accessToken); //복호화된 내용들...
    console.log('refreshToken은', refreshToken);
    console.log(profile);
    console.log(profile.provider);
    return {
      email: profile.emails[0].value,
      password: '1111', // 비밀번호는 알려주지 않으므로 임의로 적어 놓는다
      name: profile.displayName,
      nickName: '111',
      profileImage: '12',
      isAdmin: true,
      address: '12',
    }; //return 하면 context 안으로 들어감(context.req.user => user 는 라이브러리에서 자동으로 지정해준것)
  }
}
