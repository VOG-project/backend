import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class ChatCreateRequest {
  @ApiProperty({
    example: 265,
    description: '채팅방 생성 유저 아이디(PK)',
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: '미드 정글 두 자리 남습니다.',
    description: '방 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '이 채팅방은 이런이런 채팅방입니다.',
    description: '방 설명',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 5,
    description: '최대 인원',
  })
  @IsNotEmpty()
  @IsInt()
  maximumMember: number;
}

export class SocketCreateRequest {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsString()
  socketId: string;
}
