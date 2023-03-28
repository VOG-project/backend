import { Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export abstract class CreatedUpdatedDate {
  @ApiProperty({
    example: '2023-02-07 16:43:51.182829',
    description: '데이터 생성 일자',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-02-07 16:43:51.182829',
    description: '데이터 수정 일자',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
