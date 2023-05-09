import { setReplyRegisterReturn } from './../dummies/replies.return.dummy';

export const mockReplyService = () => {
  const replyReturn = setReplyRegisterReturn();

  return {
    registerReply: jest.fn().mockResolvedValue(replyReturn),
    modifyReply: jest.fn(),
    removeReply: jest.fn(),
  };
};
