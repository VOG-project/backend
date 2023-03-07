import { Post } from 'src/commonEntities/post.common.entity';
import {
  Entity,
  ManyToOne,
  Check,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { FreePostComment } from 'src/comments/comments.entity';

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

  @OneToMany(
    () => FreePostComment,
    (freePostComment) => freePostComment.freePost,
  )
  freePostComment: FreePostComment[];
}

@Entity({
  name: 'humorPost',
})
export class HumorPost extends Post {
  @ManyToOne(() => User, (user) => user.humorPost, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writerId' })
  user: User;
}

@Entity({
  name: 'championshipPost',
})
export class ChampionshipPost extends Post {
  @ManyToOne(() => User, (user) => user.championshipPost, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @ManyToMany(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'championshipPostLike' })
  likeMapping: User[];
}
