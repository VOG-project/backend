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
import { FreePost } from 'src/posts/posts.entity';

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

  @OneToMany(() => FreePost, (freePost) => freePost.user)
  freePost: FreePost[];

  // @OneToMany(() => HumorPost, (humorPost) => humorPost.user)
  // humorPosts: HumorPost[];

  // @OneToMany(
  //   () => ChampionshipPost,
  //   (championshipPost) => championshipPost.user,
  // )
  // championshipPosts: ChampionshipPost[];
}
