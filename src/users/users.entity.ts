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
import {
  ChampionshipPostComment,
  FreePostComment,
  HumorPostComment,
} from './../comments/comments.entity';

// 유저 테이블에 대한 엔티티입니다.
// --
// CreatedUpdatedDate 엔티티를 상속받아 createdAt, updatedAt 컬럼을 추가합니다.
// --
// FreePost 엔티티와 1 : N 관계입니다.
// HumorPost 엔티티와 1 : N 관계입니다.
// ChampionPost 엔티티와 1 : N 관계입니다.
// --
// FreePostComment 엔티티와 1 : N 관계입니다.
// HumorPostCommet 엔티티와 1 : N 관계입니다.
// ChampionPostComment 엔티티와 1 : N 관계입니다.
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
