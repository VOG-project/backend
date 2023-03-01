import {
  Controller,
  UseFilters,
  UseInterceptors,
  Post,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { SuccessInterceptor } from './../interceptors/success.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { ValidateIdParam } from './validation/uploads.params.validation';
import { UploadUserProfileImageResponseDto } from './dto/uploads.response.dto';

@Controller('uploads')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(SuccessInterceptor)
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Post('users/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserProfile(
    @UploadedFile() image: Express.Multer.File,
    @Param() params: ValidateIdParam,
  ): Promise<UploadUserProfileImageResponseDto> {
    await this.uploadService.deleteUserProfileImageFile(params.id);
    return this.uploadService.uploadUserProfileImageFile(image, params.id);
  }
}
