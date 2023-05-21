import { ReplyModifyRequest } from 'src/replies/dto/modify.reply.dto';
import { ReplyRegisterRequest } from 'src/replies/dto/register.reply.dto';

export const ReplyRegisterDto: ReplyRegisterRequest = {
  writerId: 1,
  commentId: 10,
  postId: 100,
  content: '답글 테스트',
};

export const ReplyModifyDto: ReplyModifyRequest = {
  content: '답글 수정 테스트',
};
