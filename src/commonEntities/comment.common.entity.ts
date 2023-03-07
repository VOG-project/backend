import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatedUpdatedDate } from './date.common.entity';

@Entity()
export class CommonCommentEntity extends CreatedUpdatedDate {
  @ApiProperty({
    example: 62,
    description: '댓글 식별 아이디',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 22,
    description: '댓글 작성자 아이디',
  })
  @Column({
    type: 'int',
  })
  writerId: number;

  @ApiProperty({
    example: 1623,
    description: '게시물 ID',
  })
  @Column({
    type: 'int',
  })
  postId: number;

  @ApiProperty({
    example: '좋은 글 감사합니다',
    description: '댓글 내용',
  })
  @Column({
    type: 'varchar',
    length: 500,
  })
  content: string;
}
