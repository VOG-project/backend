import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  postId: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  content: string;

  @Column({
    type: 'int',
  })
  group: number;

  @Column({
    type: 'int',
  })
  sequence: number;
}
