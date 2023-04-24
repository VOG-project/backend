import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostModificationRequest {
  @ApiProperty({
    example: '다이아 찍음 ㅋㅋ',
    description: '게시물 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '다이아 찍었씁니다. 정말입니다.',
    description: '게시물 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
