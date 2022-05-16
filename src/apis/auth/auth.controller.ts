import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserInput } from '../user/dto/createUser.input';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google') //get 할 주소 // api 요청 들어오면 구글 로그인 페이지로 redirect 시켜줘야 한다=>구글 페이지에서 인증 => 그후 다시 api 실행 => passport에 이 기능 라이브러리 있음
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //restapis는 currentuser따로 뽑을 필요 없이 req,res그냥 쓸 수 있음//user안에 IOAuthUser 정보도 req에 들어감
    @Res() res: Response,
  ) {
    //1.가입확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2.회원가입
    if (!user) {
      const newUser = req.user;
      user = await this.userService.create({ bcryptUser: newUser });
      // 1:1관계의 결제테이블
    }

    //3.로그인
    this.authService.setRefreshToken({ user, res, req });

    res.redirect(
      'http://localhost:5500/f6b2-team6-server/frontend/login/index.html', //forntend live server 주소 복붙 //로그인 끝나면 이 페이지로 돌아와라
    );
  }
  @Get('/login/naver') //get 할 주소 // api 요청 들어오면 구글 로그인 페이지로 redirect 시켜줘야 한다=>구글 페이지에서 인증 => 그후 다시 api 실행 => passport에 이 기능 라이브러리 있음
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //restapis는 currentuser따로 뽑을 필요 없이 req,res그냥 쓸 수 있음//user안에 IOAuthUser 정보도 req에 들어감
    @Res() res: Response,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    //1.가입확인
    let user = await this.userService.findOne({ email: req.user.email });
    //2.회원가입
    if (!user) {
      const newUser = req.user;
      user = await this.userService.create({ bcryptUser: newUser });
      // 1:1관계의 결제테이블
    }
    //3.로그인
    this.authService.setRefreshToken({ user, res, req });

    res.redirect(
      'http://localhost:5500/f6b2-team6-server/frontend/login/index.html', //forntend live server 주소 복붙 //로그인 끝나면 이 페이지로 돌아와라
    );
  }
  @Get('/login/kakao') //get 할 주소 // api 요청 들어오면 구글 로그인 페이지로 redirect 시켜줘야 한다=>구글 페이지에서 인증 => 그후 다시 api 실행 => passport에 이 기능 라이브러리 있음
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //restapis는 currentuser따로 뽑을 필요 없이 req,res그냥 쓸 수 있음//user안에 IOAuthUser 정보도 req에 들어감
    @Res() res: Response,
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    req.user.email;
    //1.가입확인
    let user = await this.userService.findOne({ email: req.user.email });
    //2.회원가입
    if (!user) {
      const newUser = req.user;
      user = await this.userService.create({ bcryptUser: newUser });
      // 1:1관계의 결제테이블
    }
    //3.로그인
    this.authService.setRefreshToken({ user, res, req });

    res.redirect(
      'http://localhost:5500/f6b2-team6-server/frontend/login/index.html', //forntend live server 주소 복붙 //로그인 끝나면 이 페이지로 돌아와라
    );
  }
}
