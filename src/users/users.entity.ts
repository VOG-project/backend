import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from 'src/comments/comments.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { FriendEntity } from 'src/friend/friend.entity';
import { ReplyEntity } from 'src/replies/replies.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  @Exclude()
  oauthId: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  @Exclude()
  provider: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  nickname: string;

  @Column({
    type: 'char',
    length: 2,
  })
  sex: string;

  @Column({
    type: 'varchar',
    length: 120,
    default: `https://vog-image-storage.s3.ap-northeast-2.amazonaws.com/user/default.jpg`,
  })
  profileUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => ReplyEntity, (reply) => reply.user)
  replies: ReplyEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.follower)
  followers: FriendEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.following)
  following: FriendEntity[];
}
