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

  @ApiProperty({
    example: 6,
    description: '댓글 그룹(답글이 소속된 댓글 pk)',
  })
  @Column({
    type: 'int',
  })
  group: number;

  @ApiProperty({
    example: 2,
    description: '댓글의 순서(0은 댓글, 1 이상은 답글)',
  })
  @Column({
    type: 'int',
    default: 0,
  })
  sequence: number;
}
