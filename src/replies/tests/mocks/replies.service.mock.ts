import { ReplyModifyRequest } from 'src/replies/dto/modify.reply.dto';
import { setReplyRegisterReturn } from './../dummies/replies.return.dummy';

export const mockReplyService = () => {
  const replyReturn = setReplyRegisterReturn();

  return {
    registerReply: jest.fn().mockResolvedValue(replyReturn),
    modifyReply: jest.fn((modifyDto: ReplyModifyRequest, replyId: number) => {
      return {
        ...replyReturn,
        content: modifyDto.content,
      };
    }),
    removeReply: jest.fn(),
  };
};
