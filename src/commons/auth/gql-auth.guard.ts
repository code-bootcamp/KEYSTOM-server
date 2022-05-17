import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthAccessGuard extends AuthGuard('access') {
  //그래프큐엘 가드를 통과후 authguard 실행
  getRequest(context: ExecutionContext) {
    //context => 리퀘스트나 헤더에 들어오는 내용들(restapi에서 받은 부분)
    const ctx = GqlExecutionContext.create(context); //그래프 큐엘용으로 다시 만듬
    return ctx.getContext().req; //그래프 큐엘용 context에서 req를 뽑는다
  } //AuthGuard안에 getRequest있음
}

@Injectable()
export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
  //그래프큐엘 가드를 통과후 authguard 실행
  getRequest(context: ExecutionContext) {
    //context => 리퀘스트나 헤더에 들어오는 내용들(restapi에서 받은 부분)
    const ctx = GqlExecutionContext.create(context); //그래프 큐엘용으로 다시 만듬
    return ctx.getContext().req; //그래프 큐엘용 context에서 req를 뽑는다
  } //AuthGuard안에 getRequest있음
}
