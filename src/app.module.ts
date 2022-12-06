import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 앱 어디서나 Config Module에 접근할 수 있도록 함
      isGlobal: true,
      // package.json의 ENV=dev와 NODE_ENV를 매치
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      // production 환경일 때는 ConfigModule이 환경변수 파일을 무시
      ignoreEnvFile: process.env.NODE_ENV === 'prod' ? true : false,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        RT_SECRET: Joi.string().required(),
        AT_SECRET: Joi.string().required(),
      }),
    }),
    PrismaModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
