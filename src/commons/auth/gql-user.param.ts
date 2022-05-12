import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id: string;
  email: string;
}
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context); //그래프 큐엘용으로 다시 만듬
    return ctx.getContext().req.user; //그래프 큐엘용 context에서 req를 뽑는다 user는 라이브러리에서 자동으로 지정해준것
  },
); //data는 프로트에서 받은 데이터
