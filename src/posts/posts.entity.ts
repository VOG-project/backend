import { Post } from 'src/commonEntities/post.common.entity';
import { Entity, ManyToOne, Check, JoinColumn } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity({
  name: 'freePost',
})
@Check(
  `"game_category IN ("리그오브레전드", "오버워치", "발로란트", "배틀그라운드")"`,
)
export class FreePost extends Post {
  @ManyToOne(() => User, (user) => user.freePost, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writerId' })
  user: User;
}

