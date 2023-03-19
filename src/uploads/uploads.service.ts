import { Injectable, HttpException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UserRepository } from './../users/users.repository';
import { UploadUserProfileImageResponseDto } from './dto/uploads.response.dto';

@Injectable()
export class UploadsService {
  constructor(private readonly userRepository: UserRepository) {
    // S3 인스턴스 사용을 위해 region과 accessKey, secretAccessKey를 명시하여 AWS object Configuration를 업데이트 합니다.
    AWS.config.update({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }

  /**
   * S3 인스턴스에 이미 존재하는 유저의 프로필 이미지를 삭제하는 메소드입니다.
   * @param userId 유저 아이디(PK)
   */
  async deleteUserProfileImageFile(userId: number) {
    try {
      const user = await this.userRepository.findById(userId);
      // S3에 저장된 이미지의 파일명을 추출하기 위해 S3 인스턴스 URL 주소의 길이를 저장합니다.
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

  /**
   * S3 인스턴스에 유저 프로필 이미지를 생성하는 메소드입니다.
   * @param image 이미지 버퍼 객체
   * @param userId 유저 아이디(PK)
   * @returns Object { 업데이트된 row 개수, 프로필 이미지 URL }
   */
  async uploadUserProfileImageFile(
    image: Express.Multer.File,
    userId: number,
  ): Promise<UploadUserProfileImageResponseDto> {
    try {
      // S3에 존재하는 이미지 파일을 식별하기 위해 userId와 밀리초를 이용하여 파일 패스를 만듭니다.
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

      // DB에 유저 프로필 이미지의 경로를 삽입하기 위해 S3에 저장된 이미지 URl 값을 만듭니다.
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
