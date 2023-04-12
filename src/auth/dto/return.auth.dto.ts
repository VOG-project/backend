import { ApiProperty } from '@nestjs/swagger';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

export class AuthDeletedSessionCountReturn {
  @ApiProperty({
    example: 1,
    description: '세션 DB에서 삭제된 세션데이터 개수',
  })
  deletedCount: number;
}

export class AuthUserEntireDataReturn extends UserEntireDataReturn {
  @ApiProperty({
    example: 'sl3ijfs3f.3fn2af.adsv35',
    description: '발급된 accessToken',
  })
  jwtAccessToken?: string;
}

export class AuthRedirectReturn {
  @ApiProperty({
    example: 'Sb35YY9N_bZgbfSW1jDYkjCcgKrEEHUQ8CLTn',
    description: 'OAuth Provider로부터 받은 유저의 고유 oauthId',
  })
  oauthId: string;

  @ApiProperty({
    example:
      'oauthId는 발급되었지만 해당하는 유저 데이터가 없습니다. 유저 데이터 입력 창으로 리다이렉트 해주세요.',
    description: '리다이렉트 메세지',
  })
  message: string;

  @ApiProperty({
    example: 'https://dkfjsei.com/signup',
    description: '리다이렉트 URL',
  })
  redirectUrl: string;
}
