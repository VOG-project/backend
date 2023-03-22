import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'post',
})
@Index('idx_1_postCategory', ['postCategory'])
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    type: 'int',
  })
  likeCount: number;

  @Column({
    type: 'varchar',
    length: 10,
  })
  postCategory: string;
}
