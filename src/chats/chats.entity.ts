import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/users.entity';

@Entity({
  name: 'chatRoom',
})
export class ChatRoomEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 100,
  })
  roomId: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  description: string;

  @Column({
    type: 'int',
    default: 0,
  })
  currentMember: number;

  @Column({
    type: 'int',
  })
  maximumMember: number;

  @Column({
    type: 'int',
    unique: true,
  })
  @Generated('increment')
  no: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => ChatParticipantEntity,
    (chatParticipant) => chatParticipant.chatRoom,
  )
  chatParticipant: ChatParticipantEntity[];
}

@Entity({
  name: 'chatParticipant',
})
export class ChatParticipantEntity {
  // socketId를 PK로 사용하지 않는 이유는 socketId가 발급되기 전에
  // DB에 참여자 데이터가 존재하는지 확인해야하기 때문
  @PrimaryColumn({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  socketId: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  nickname: string;

  @Column({
    type: 'varchar',
  })
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.chatParticipant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roomId' })
  chatRoom: ChatRoomEntity;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
