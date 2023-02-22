import { Post } from 'src/commonEntities/common.entity';
import { Entity, ManyToOne, Check, JoinColumn } from 'typeorm';
import { Users } from 'src/users/users.entity';

@Entity({
  engine: 'InnoDB',
  name: 'freePost',
})
@Check(
  `"game_category IN ("리그오브레전드", "오버워치", "발로란트", "배틀그라운드")"`,
)
export class FreePost extends Post {
  @ManyToOne(() => Users, (users) => users.freePost, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writer_id' })
  user: Users;
}
