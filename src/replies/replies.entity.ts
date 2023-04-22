import { CommentEntity } from 'src/comments/comments.entity';
import { UserEntity } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'reply',
})
export class ReplyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  commentId: number;

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

  @ManyToOne(() => UserEntity, (user) => user.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'writerId',
  })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'commentId',
  })
  comment: CommentEntity;
}
