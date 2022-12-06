import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    name: 'email',
    nullable: false,
    required: true,
    description: '이메일',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    name: 'password',
    nullable: false,
    required: true,
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
