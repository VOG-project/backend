import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonCommentEntity } from './../commonEntities/comment.common.entity';
import { User } from 'src/users/users.entity';
import { FreePost, HumorPost } from 'src/posts/posts.entity';

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

  @ManyToOne(() => FreePost, (freePost) => freePost.freePostComment)
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

  @ManyToOne(() => HumorPost, (humorPost) => humorPost.humorPostComment)
  @JoinColumn({ name: 'postId' })
  humorPost: HumorPost;
}
