import {
  Controller,
  UseFilters,
  UseInterceptors,
  Patch,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { UploadUserProfileImageResponseDto } from './dto/uploads.response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('uploads')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Patch('users/:userId')
  @ApiOperation({
    summary: '유저 프로필 사진 수정',
    tags: ['Uploads'],
  })
  @ApiResponse({
    status: 201,
    description: '유저 프로필 수정 성공',
    type: UploadUserProfileImageResponseDto,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserProfile(
    @UploadedFile() image: Express.Multer.File,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UploadUserProfileImageResponseDto> {
    await this.uploadService.deleteUserProfileImageFile(userId);
    return this.uploadService.uploadUserProfileImageFile(image, userId);
  }
}
