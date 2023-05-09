import {
  ReplyDeletedCountReturn,
  ReplyEntireDataReturn,
} from 'src/replies/dto/return.reply.dto';

export const setReplyRegisterReturn = (): ReplyEntireDataReturn => {
  return {
    id: 2,
    writerId: 35,
    commentId: 1,
    postId: 1,
    content: '답글입니다.',
    createdAt: new Date('2023-03-05 16:25:04.871850'),
    updatedAt: new Date('2023-03-05 16:25:04.871850'),
  };
};

export const setReplyDeletedRowReturn = (): ReplyDeletedCountReturn => {
  return {
    deletedCount: 1,
  };
};
