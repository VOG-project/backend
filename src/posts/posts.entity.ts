import { CommentEntity } from 'src/comments/comments.entity';
import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'post',
})
@Index('idx_1_postCategory', ['postCategory'])
export class PostEntity extends CreatedUpdatedDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'int',
  })
  likeCount: number;

  @Column({
    type: 'varchar',
    length: 10,
  })
  postCategory: string;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
