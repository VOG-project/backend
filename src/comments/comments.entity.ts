import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'comment',
})
export class CommentEntity extends CreatedUpdatedDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  postId: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  content: string;

  @Column({
    type: 'int',
  })
  group: number;

  @Column({
    type: 'int',
  })
  sequence: number;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({
    name: 'postId',
  })
  post: PostEntity;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
