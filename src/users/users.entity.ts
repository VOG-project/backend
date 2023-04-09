import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  OneToMany,
} from 'typeorm';
import { CreatedUpdatedDate } from 'src/common/commonEntities/date.common.entity';
import { IsEmail, IsString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity } from 'src/comments/comments.entity';
import { PostEntity } from 'src/posts/posts.entity';
import { FriendEntity } from 'src/friend/friend.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends CreatedUpdatedDate {
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

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.follower)
  followers: FriendEntity[];

  @OneToMany(() => FriendEntity, (friend) => friend.following)
  following: FriendEntity[];
}
