import { ApiProperty } from '@nestjs/swagger';

export class UploadUserProfileImageResponseDto {
  @ApiProperty({
    example: 1,
    description: '수정된 컬럼 개수',
  })
  updatedCount: number;

  @ApiProperty({
    example: `https://www.vog-storage/user/efsef.jpg`,
    description: '프로필 이미지 URL',
  })
  profileUrl: string;
}
