import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonCommentEntity } from './../commonEntities/comment.common.entity';
import { User } from 'src/users/users.entity';
import { FreePost, HumorPost } from 'src/posts/posts.entity';
import { ChampionshipPost } from './../posts/posts.entity';

@Entity({
  name: 'freePostComment',
})
export class FreePostComment extends CommonCommentEntity {
  @ManyToOne(() => User, (user) => user.freePostComment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @ManyToOne(() => FreePost, (freePost) => freePost.freePostComment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  freePost: FreePost;
}

@Entity({
  name: 'humorPostComment',
})
export class HumorPostComment extends CommonCommentEntity {
  @ManyToOne(() => User, (user) => user.humorPostComment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @ManyToOne(() => HumorPost, (humorPost) => humorPost.humorPostComment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  humorPost: HumorPost;
}

@Entity({
  name: 'championshipPostComment',
})
export class ChampionshipPostComment extends CommonCommentEntity {
  @ManyToOne(() => User, (user) => user.championshipPostComment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'writerId' })
  user: User;

  @ManyToOne(
    () => ChampionshipPost,
    (championshipPost) => championshipPost.championshipPostComment,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'postId' })
  championshipPost: ChampionshipPost;
}
