import {
  Controller,
  UseFilters,
  UseInterceptors,
  Patch,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEntireDataReturn } from 'src/users/dto/return.user.dto';

@Controller('uploads')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Patch('users/:userId')
  @ApiOperation({
    summary: '유저 프로필 사진 수정 API',
    tags: ['Uploads'],
  })
  @ApiResponse({
    status: 201,
    description:
      '유저 프로필 사진과 유저 아이디를 입력받고 변경된 유저의 데이터를 반환합니다.',
    type: UserEntireDataReturn,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserProfile(
    @UploadedFile() image: Express.Multer.File,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserEntireDataReturn> {
    return this.uploadService.uploadUserProfileImageFile(image, userId);
  }
}
