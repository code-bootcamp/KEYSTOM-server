# ⌨️ Keystom

## ***Key***board + cus***tom***

> ***cutom*** 라는 단어에서 착안한 키보드 커스텀 서비스 ***keystom***
><br/><br/>
> 자기 자신이 가장 소중해 ‘미미미(Me Me Me) 세대’라고 불리는 MZ세대에게 맞춤형 제품은 자기애(愛)의 표현이자, 자아실현의 도구가 됩니다. 또한 대량 생산의 기성품 보다는 자신만의 성향이 가미된 맞춤형 제품을 선호하는 시대 흐름에 따라 키보드 커스텀 사이트를 만들게 되었습니다.

<br/>

## 배포주소
>***https://keystom.site***


<br/>

## 기술스택
`JavaScript`, `TypeScript`, `NodeJS`, `NestJS`, `TypeORM`, `JWT`, `GraphQL`, `MySQL`,`ElasticSearch`, `Logstash`, `Redis`, `Docker`, `Git`, `GitHub`, `GCP`

<br/>


## API
<!--table-->
|api 기능|request|respose|
|--|--|--|
|Create|Mutation{API name:contents}{request col}|등록 성공 or 실패메시지|
|Update|Mutation{API name:contents}{request col}|수정 성공 or 실패메시지|
|Delete|Mutation{API name:contents}{request col}|삭제 성공 or 실패메시지|
|Fetch|Query{API name}{request col}|조회 성공 or 실패메시지|
|login/logout|Query{API name}{request col}|성공 or 실패메시지|

<br/>

## 프로젝트 설치 방법 & 실행 방법
``` bash
git clone https://github.com/jonghyun-sun/f6b2-team6-server.git

yarn install
```
<br/>

## 폴더 구조
```
f6b2-team6-server
├── Dockerfile
├── docker-compose.dev.yaml
├── docker-compose.prod.yaml
├── docker-compose.stage.yaml
├── docker-compose.yaml
├── elk
│   ├── elasticsearch
│   ├── kibana
│   └── logstash
│       ├── indexTemplate.json
│       ├── logstash.conf
│       └── mysql-connector-java-8.0.28.jar
├── frontend
│   ├── payment.html
│   └── social-login.html
├── nest-cli.json
├── package-lock.json
├── package.json
├── readme.md
├── src
│   ├── apis
│   │   ├── UserCoupon
│   │   │   ├── dto
│   │   │   │   └── createUserCoupon.input.ts
│   │   │   ├── entities
│   │   │   │   └── userCoupon.entity.ts
│   │   │   ├── userCoupon.module.ts
│   │   │   ├── userCoupon.resolver.ts
│   │   │   └── userCoupon.service.ts
│   │   ├── address
│   │   │   ├── address.module.ts
│   │   │   ├── address.resolver.ts
│   │   │   ├── address.service.ts
│   │   │   ├── dto
│   │   │   │   └── createAddress.input.ts
│   │   │   └── entities
│   │   │       └── address.entity.ts
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.resolver.ts
│   │   │   └── auth.service.ts
│   │   ├── comments
│   │   │   ├── comment.module.ts
│   │   │   ├── comment.resolver.ts
│   │   │   ├── comment.service.ts
│   │   │   ├── dto
│   │   │   │   └── createComment.input.ts
│   │   │   └── entities
│   │   │       └── comment.entity.ts
│   │   ├── coupon
│   │   │   ├── coupon.module.ts
│   │   │   ├── coupon.resolver.ts
│   │   │   ├── coupon.service.ts
│   │   │   ├── dto
│   │   │   │   └── createCoupon.input.ts
│   │   │   └── entities
│   │   │       └── coupon.entity.ts
│   │   ├── custom
│   │   │   ├── customs.module.ts
│   │   │   ├── customs.resolver.ts
│   │   │   ├── customs.service.ts
│   │   │   ├── dto
│   │   │   │   └── createCustom.input.ts
│   │   │   └── entities
│   │   │       └── custom.entity.ts
│   │   ├── file
│   │   │   ├── file.module.ts
│   │   │   ├── file.resolver.ts
│   │   │   └── file.service.ts
│   │   ├── iamport
│   │   │   └── iamport.service.ts
│   │   ├── order
│   │   │   ├── dto
│   │   │   │   └── createOrder.input.ts
│   │   │   ├── entities
│   │   │   │   └── order.entity.ts
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.resolver.ts
│   │   │   └── orders.service.ts
│   │   ├── payment
│   │   │   ├── dto
│   │   │   │   └── createPayment.input.ts
│   │   │   ├── entities
│   │   │   │   └── payment.entity.ts
│   │   │   ├── payments.module.ts
│   │   │   ├── payments.resolver.ts
│   │   │   └── payments.service.ts
│   │   ├── productImage
│   │   │   └── entities
│   │   │       └── productImage.entity.ts
│   │   ├── products
│   │   │   ├── dto
│   │   │   │   ├── createProduct.input.ts
│   │   │   │   └── updateProduct.input.ts
│   │   │   ├── entities
│   │   │   │   └── product.entity.ts
│   │   │   ├── product.module.ts
│   │   │   ├── product.resolver.ts
│   │   │   └── product.service.ts
│   │   ├── productsTag
│   │   │   └── entities
│   │   │       └── productTag.entity.ts
│   │   ├── review
│   │   │   ├── dto
│   │   │   │   ├── createReview.input.ts
│   │   │   │   └── updateReview.input.ts
│   │   │   ├── entities
│   │   │   │   └── review.entity.ts
│   │   │   ├── reviews.module.ts
│   │   │   ├── reviews.resolver.ts
│   │   │   └── reviews.service.ts
│   │   ├── reviewImage
│   │   │   └── entities
│   │   │       └── reviewImage.entity.ts
│   │   ├── reviewLike
│   │   │   ├── dto
│   │   │   │   └── createReviewLike.input.ts
│   │   │   ├── entities
│   │   │   │   └── reviewLike.entity.ts
│   │   │   ├── reviewLike.module.ts
│   │   │   ├── reviewLike.resolver.ts
│   │   │   └── reviewLike.service.ts
│   │   ├── signup
│   │   │   ├── signup.module.ts
│   │   │   ├── signup.resolver.ts
│   │   │   └── signup.service.ts
│   │   └── user
│   │       ├── dto
│   │       │   ├── createUser.input.ts
│   │       │   └── updateUserInput.ts
│   │       ├── entities
│   │       │   └── user.entity.ts
│   │       ├── users.module.ts
│   │       ├── users.resolver.ts
│   │       └── users.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── commons
│   │   ├── auth
│   │   │   ├── gql-auth.guard.ts
│   │   │   ├── gql-user.param.ts
│   │   │   ├── jwt-access.strategy.ts
│   │   │   ├── jwt-refresh.strategy.ts
│   │   │   ├── jwt-social-google.strategy.ts
│   │   │   ├── jwt-social-kakao.strategy.ts
│   │   │   └── jwt-social-naver.strategy.ts
│   │   ├── graphql
│   │   │   └── schema.gql
│   │   └── types
│   │       └── context.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

```
<br/>

## .env 설정
```
ACCESS_SECRET_KEY
REFRESH_SECRET_KEY


SMS_APP_KEY
SMS_X_SECRETE_KEY
SMS_SENDER

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACKUR


NAVER_CLIENT_ID
NAVER_CLIENT_SECRET
NAVER_CALLBACKURL

KAKAO_CLIENT_ID
KAKAO_CLIENT_SECRET
KAKAO_CALLBACKURL

STORAGE_BUCKET
STORAGE_KEY_FILENAME
STORAGE_PROJECT_ID
```
<br/>

* * *

- ## 프로젝트 작업기간 및 시간
  - 작업기간 : 2022년 05월 09일 ~ 2022년 06월 01일
  - 출근: 9-10시
  - 개인 업무: 10~13시
  - 점심 시간: 13시~14시
  - 회의 시간: 14~15시
  - 개인 업무: 15~21 or 22시



<br/>

# BackEnd 팀원 역할
## 문성민
email: antipiebse@gmail.com

* `Order API`, `Payment API`, `FileUpload API`, `Logout API`, `Coupon API` 생성 및 유지 보수
* ERD 설계
* Backend 배포
* Git 담당
* 기타 공유 문서 작업

## 선종현
email: jjong981028@gmail.com

* `Login API`, `Signin API`, `Review API`,`기본CRUD API` 생성 및 유지 보수
* 발표
* 기타 공유 문서 작업