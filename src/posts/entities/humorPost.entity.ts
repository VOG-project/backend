import { Entity, Check, ManyToOne } from 'typeorm';
import { Post } from './../../commonEntities/common.entity';
import { Users } from 'src/users/users.entity';

@Entity({
  engine: 'InnoDB',
})
@Check(
  `"game_category IN ("리그오브레전드", "오버워치", "발로란트", "배틀그라운드"`,
)
export class HumorPost extends Post {
  @ManyToOne(() => Users, (users) => users.humorPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Users;
}
