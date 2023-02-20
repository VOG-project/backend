import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  ManyToOne,
} from 'typeorm';
import { Common } from './../../commonEntities/common.entity';
import { Users } from 'src/users/users.entity';

@Entity({
  engine: 'InnoDB',
})
@Check(
  `"game_category IN ("리그오브레전드", "오버워치", "발로란트", "배틀그라운드"`,
)
export class ChampionshipPost extends Common {
  @ApiProperty({
    example: 31,
    description: '대리키',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 721,
    description: '외래키',
    required: true,
  })
  @Column({
    type: 'int',
  })
  @IsNumber()
  @IsNotEmpty()
  writer_id: number;

  @ApiProperty({
    example: '하하호호 너무 웃긴 사진',
    description: '게시물 제목',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '깔깔깔깔깔껄껄껄껄껄',
    description: '게시물 내용',
    required: true,
  })
  @Column({
    type: 'text',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 361,
    description: '좋아요 개수',
    default: 0,
    required: true,
  })
  @Column({
    type: 'int',
  })
  like_count: number;

  @ApiProperty({
    example: '리그오브레전드',
    description: '게임별 카테고리',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 20,
  })
  game_category: string;

  @ManyToOne(() => Users, (user) => user.championshipPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
