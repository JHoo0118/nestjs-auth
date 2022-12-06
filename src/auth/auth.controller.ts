import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '회원가입',
  })
  @ApiOkResponse({
    description: 'Access Token과 Refresh Token',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MDMzNTg1MCwiZXhwIjoxNjcwMzM2NzUwfQ.PLXstvYB_sOF-8tn_227pVZg84MVWBkw7cydfNAe7AA',
          description: 'Access Token',
        },
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MDMzNTg1MCwiZXhwIjoxNjcwOTQwNjUwfQ.dbbMq_-C5pf-4zi9VVR-rVz4Hm2VZsSx4XFb9nxP8yA',
          description: 'Refresh Token',
        },
      },
    },
  })
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @ApiOkResponse({
    description: 'Access Token과 Refresh Token',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MDMzNTg1MCwiZXhwIjoxNjcwMzM2NzUwfQ.PLXstvYB_sOF-8tn_227pVZg84MVWBkw7cydfNAe7AA',
          description: 'Access Token',
        },
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MDMzNTg1MCwiZXhwIjoxNjcwOTQwNjUwfQ.dbbMq_-C5pf-4zi9VVR-rVz4Hm2VZsSx4XFb9nxP8yA',
          description: 'Refresh Token',
        },
      },
    },
  })
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @ApiOperation({
    summary: '로그아웃',
  })
  @ApiOkResponse({
    description: '로그아웃',
    schema: {
      type: 'boolean',
    },
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @ApiOperation({
    summary: '토큰 재발급',
  })
  @ApiOkResponse({
    description: '토큰 재발급',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MDMzNTg1MCwiZXhwIjoxNjcwMzM2NzUwfQ.PLXstvYB_sOF-8tn_227pVZg84MVWBkw7cydfNAe7AA',
          description: 'Access Token',
        },
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTY3MDMzNTg1MCwiZXhwIjoxNjcwOTQwNjUwfQ.dbbMq_-C5pf-4zi9VVR-rVz4Hm2VZsSx4XFb9nxP8yA',
          description: 'Refresh Token',
        },
      },
    },
  })
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
