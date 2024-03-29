import { UserEntity } from 'src/users/users.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'targetId',
  })
  following: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
