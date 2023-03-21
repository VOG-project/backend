import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SocketRegisterInfoRequestDto {
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
