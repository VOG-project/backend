import { ReplyEntireDataReturn } from 'src/replies/dto/return.reply.dto';

export const ReplyReturn: ReplyEntireDataReturn = {
  id: 1,
  writerId: 1,
  commentId: 10,
  postId: 100,
  content: '답글 테스트',
  createdAt: new Date('2023-03-05 16:25:04.871850'),
  updatedAt: new Date('2023-03-05 16:25:04.871850'),
};
