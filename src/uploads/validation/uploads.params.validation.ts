import { IsNotEmpty, IsNumberString } from 'class-validator';

export class ValidateIdParam {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
