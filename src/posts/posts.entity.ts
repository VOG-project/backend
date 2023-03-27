import { CommentEntity } from 'src/comments/comments.entity';
import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
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
    type: 'int',
  })
  writerId: number;

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

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'writerId',
  })
  user: User;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
