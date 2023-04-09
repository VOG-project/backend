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

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  password: string;

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

  @OneToMany(() => FriendEntity, (friend) => friend.follower)
  followers: FriendEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.following)
  following: FriendEntity[];
}
