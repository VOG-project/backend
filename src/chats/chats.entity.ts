import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';

@Entity({
  name: 'chatRoom',
})
export class ChatRoom extends CreatedUpdatedDate {
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
    type: 'int',
    default: 1,
  })
  currentMember: number;

  @Column({
    type: 'int',
  })
  maximumMember: number;

  @OneToMany(
    () => ChatParticipant,
    (chatParticipant) => chatParticipant.chatRoom,
  )
  chatParticipant: ChatParticipant[];
}

@Entity({
  name: 'chatParticipant',
})
export class ChatParticipant {
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

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatParticipant, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roomId' })
  chatRoom: ChatRoom;
}
