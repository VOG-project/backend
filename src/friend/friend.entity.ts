import { UserEntity } from 'src/users/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'friend',
})
export class FriendEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn({
    type: 'int',
  })
  userId: number;

  @PrimaryColumn({
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
