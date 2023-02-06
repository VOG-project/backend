import { Entity, Column, PrimaryGeneratedColumn, Check } from 'typeorm';

@Entity()
@Check(`"sex IN ("남", "여")"`)
export class Users {
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
    length: 20,
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
    unique: true,
  })
  sex: string;
}
