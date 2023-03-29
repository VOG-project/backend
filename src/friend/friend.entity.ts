import { UserEntity } from 'src/users/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'friend',
})
export class FriendEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  targetId: number;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  @JoinColumn({
    name: 'userId',
  })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.following)
  @JoinColumn({
    name: 'targetId',
  })
  following: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
