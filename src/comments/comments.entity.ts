import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonCommentEntity } from './../commonEntities/comment.common.entity';
import { User } from 'src/users/users.entity';
import { FreePost } from 'src/posts/posts.entity';

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
