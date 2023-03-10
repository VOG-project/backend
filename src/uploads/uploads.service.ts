import { Injectable, HttpException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UserRepository } from './../users/users.repository';
import { UploadUserProfileImageResponseDto } from './dto/uploads.response.dto';

@Injectable()
export class UploadsService {
  constructor(private readonly userRepository: UserRepository) {
    AWS.config.update({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async deleteUserProfileImageFile(userId: number) {
    try {
      const user = await this.userRepository.findById(userId);
      const sliceIdx = process.env.AWS_S3_File_URL.length;
      const filePath = user.profileUrl;

      await new AWS.S3()
        .deleteObject({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: filePath.substring(sliceIdx),
        })
        .promise();
    } catch (err) {
      throw new HttpException(
        `[S3 ERROR] deleteUserProfileImageFile: ${err.message}`,
        500,
      );
    }
  }

  async uploadUserProfileImageFile(
    image: Express.Multer.File,
    userId: number,
  ): Promise<UploadUserProfileImageResponseDto> {
    try {
      const filePath = `user/${userId}-profile-${Date.now()}${
        image.originalname
      }`;

      await new AWS.S3()
        .putObject({
          Key: filePath,
          Body: image.buffer,
          Bucket: process.env.AWS_S3_BUCKET_NAME,
        })
        .promise();

      const fileUrl = process.env.AWS_S3_File_URL + filePath;
      const updatedResult = await this.userRepository.updateProfileUrl(
        userId,
        fileUrl,
      );

      return updatedResult;
    } catch (err) {
      throw new HttpException(
        `[S3 ERROR] uploadUserProfileImageFile: ${err.message}`,
        500,
      );
    }
  }
}
