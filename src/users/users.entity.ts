import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';
import { Common } from 'src/commonEntities/common.entity';
import { IsEmail, IsString, IsInt, IsNotEmpty } from 'class-validator';

@Entity({
  engine: 'InnoDB',
})
@Check(`"sex IN ("남", "여")"`)
export class Users extends Common {
  @PrimaryGeneratedColumn()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'varchar',
    length: 10,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @Column({
    type: 'char',
    length: 2,
  })
  @IsString()
  @IsNotEmpty()
  sex: string;
}
