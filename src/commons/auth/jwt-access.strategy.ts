import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; //jwt방식

//방어막 설계
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  //jwt방식(strategy)으로 인가를 처리할거야 이름은 access
  constructor() {
    super({
      //검증부
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //"authorization":"Bearer 토큰"=> 토큰만 나오도록 함수로 구현 가능(라이브러리에 내장도 되어있다)
      secretOrKey: 'myAccesskey',
      passReqToCallback: true,
    }); // =>super를 가지고 PassportStrategy실행
  }

  async validate(req, payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
