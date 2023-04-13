import { CommentEntity } from 'src/comments/comments.entity';
import { CreatedUpdatedDate } from 'src/common/commonEntities/date.common.entity';
import { UserEntity } from 'src/users/users.entity';
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
    type: 'int',
    default: 0,
  })
  view: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  postCategory: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'writerId',
  })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
