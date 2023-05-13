import { ReplyModifyRequest } from 'src/replies/dto/modify.reply.dto';
import { ReplyRegisterRequest } from 'src/replies/dto/register.reply.dto';

export const setReplyRegisterDto = (): ReplyRegisterRequest => {
  return {
    writerId: 35,
    commentId: 1,
    postId: 1,
    content: '답글입니다.',
  };
};

export const setReplyModifyDto = (): ReplyModifyRequest => {
  return {
    content: '수정된 답글',
  };
};
