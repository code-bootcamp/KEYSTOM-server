import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'nickName' | 'isAdmin'>;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/google') //get 할 주소 // api 요청 들어오면 구글 로그인 페이지로 redirect 시켜줘야 한다=>구글 페이지에서 인증 => 그후 다시 api 실행 => passport에 이 기능 라이브러리 있음
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //restapis는 currentuser따로 뽑을 필요 없이 req,res그냥 쓸 수 있음//user안에 IOAuthUser 정보도 req에 들어감
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }

  @Get('/login/naver') //get 할 주소 // api 요청 들어오면 네이버 로그인 페이지로 redirect 시켜줘야 한다=>구글 페이지에서 인증 => 그후 다시 api 실행 => passport에 이 기능 라이브러리 있음
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //restapis는 currentuser따로 뽑을 필요 없이 req,res그냥 쓸 수 있음//user안에 IOAuthUser 정보도 req에 들어감
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }

  @Get('/login/kakao') //get 할 주소 // api 요청 들어오면 카카오 로그인 페이지로 redirect 시켜줘야 한다=>구글 페이지에서 인증 => 그후 다시 api 실행 => passport에 이 기능 라이브러리 있음
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //restapis는 currentuser따로 뽑을 필요 없이 req,res그냥 쓸 수 있음//user안에 IOAuthUser 정보도 req에 들어감
    @Res() res: Response,
  ) {
    this.authService.loginOAuth({ req, res });
  }
}
