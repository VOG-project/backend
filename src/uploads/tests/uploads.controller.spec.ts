import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from '../uploads.controller';
import { UploadsService } from '../uploads.service';
import { mockUploadService } from './mocks/uploads.service.mock';
import { setUserReturnDummy } from 'src/users/tests/dummies/users.return.dummy';
import { setUploadDtoDummy } from './dummies/uploads.dto.dummy';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { mockAuthGuard } from 'src/auth/tests/mocks/auth.guard.mock';

describe('UploadsController', () => {
  let uploadsController: UploadsController;
  let uploadsService: UploadsService;
  const userReturn = setUserReturnDummy();
  const uploadDto = setUploadDtoDummy();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      providers: [
        {
          provide: UploadsService,
          useValue: mockUploadService(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard())
      .compile();

    uploadsController = module.get<UploadsController>(UploadsController);
    uploadsService = module.get<UploadsService>(UploadsService);
  });

  describe('Modify User Profile Image', () => {
    it('유저 프로필 이미지 수정 후 업데이트된 유저 데이터 반환', async () => {
      expect(await uploadsController.uploadUserProfile(uploadDto, 35)).toEqual(
        userReturn,
      );
      expect(uploadsService.uploadUserProfileImageFile).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
