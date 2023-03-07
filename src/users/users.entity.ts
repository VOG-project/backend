import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  OneToMany,
} from 'typeorm';
import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';
import { IsEmail, IsString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FreePost, HumorPost } from 'src/posts/posts.entity';
import { ChampionshipPost } from './../posts/posts.entity';
import {
  ChampionshipPostComment,
  FreePostComment,
  HumorPostComment,
} from './../comments/comments.entity';

@Entity({
  engine: 'InnoDB',
})
@Check(`"sex IN ("남", "여")"`)
export class User extends CreatedUpdatedDate {
  @ApiProperty({
    example: '35',
    description: '식별아이디',
  })
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: 'test10@naver.com',
    description: '이메일',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'efo234a08sef',
    description: '비밀번호',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '네스트좋아',
    description: '닉네임',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({
    example: '남',
    description: '성별',
    required: true,
  })
  @Column({
    type: 'char',
    length: 2,
  })
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty({
    example: 'https://www.vog-storage/user/efsef.jpg',
    description: '유저 프로필 사진 URL',
  })
  @Column({
    type: 'varchar',
    length: 120,
    default: `https://vog-image-storage.s3.ap-northeast-2.amazonaws.com/user/default.jpg`,
  })
  profileUrl: string;

  @OneToMany(() => FreePost, (freePost) => freePost.user)
  freePost: FreePost[];

  @OneToMany(() => HumorPost, (humorPost) => humorPost.user)
  humorPost: HumorPost[];

  @OneToMany(
    () => ChampionshipPost,
    (championshipPost) => championshipPost.user,
  )
  championshipPost: ChampionshipPost[];

  @OneToMany(() => FreePostComment, (freePostComment) => freePostComment.user)
  freePostComment: FreePostComment[];

  @OneToMany(
    () => HumorPostComment,
    (humorPostComment) => humorPostComment.user,
  )
  humorPostComment: HumorPostComment[];

  @OneToMany(
    () => ChampionshipPostComment,
    (championshipPostComment) => championshipPostComment.user,
  )
  championshipPostComment: ChampionshipPostComment[];
}
