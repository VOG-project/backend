import { Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Common {
  @ApiProperty({
    example: '2023-02-07 16:43:51.182829',
    description: '데이터 생성 일자',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2023-02-07 16:43:51.182829',
    description: '데이터 수정 일자',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
