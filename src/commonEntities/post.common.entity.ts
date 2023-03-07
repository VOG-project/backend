import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatedUpdatedDate } from './date.common.entity';

@Entity()
export class CommonPostEntity extends CreatedUpdatedDate {
  @ApiProperty({
    example: 31,
    description: '대리키',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 721,
    description: '외래키',
    required: true,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  @IsNotEmpty()
  writerId: number;

  @ApiProperty({
    example: '하하호호 너무 웃긴 사진',
    description: '게시물 제목',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '깔깔깔깔깔껄껄껄껄껄',
    description: '게시물 내용',
    required: true,
  })
  @Column({
    type: 'text',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 361,
    description: '좋아요 개수',
    default: 0,
    required: true,
  })
  @Column({
    type: 'int',
  })
  likeCount: number;

  @ApiProperty({
    example: '리그오브레전드',
    description: '게임별 카테고리',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 20,
  })
  gameCategory: string;
}
