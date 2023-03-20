import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreatedUpdatedDate } from 'src/commonEntities/date.common.entity';

@Entity({
  name: 'chatRoom',
})
export class ChatEntity extends CreatedUpdatedDate {
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
}
