import { PostEntity } from 'src/posts/posts.entity';
import { ReplyEntity } from 'src/replies/replies.entity';
import { UserEntity } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  writerId: number;

  @Column({
    type: 'int',
  })
  postId: number;

  @Column({
    type: 'tinytext',
  })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'postId',
  })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'writerId',
  })
  user: UserEntity;

  @OneToMany(() => ReplyEntity, (reply) => reply.comment)
  replies: ReplyEntity[];
}
