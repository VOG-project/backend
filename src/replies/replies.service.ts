import { Injectable, HttpException } from '@nestjs/common';
import { RepliesRepository } from './replies.repository';
import { ReplyRegisterRequest } from './dto/register.reply.dto';
import {
  ReplyDeletedCountReturn,
  ReplyEntireDataReturn,
} from './dto/return.reply.dto';
import { ReplyModifyRequest } from './dto/modify.reply.dto';

@Injectable()
export class RepliesService {
  constructor(private readonly replyRepository: RepliesRepository) {}

  async registerReply(
    replyRegisterRequest: ReplyRegisterRequest,
  ): Promise<ReplyEntireDataReturn> {
    const { replyId } = await this.replyRepository.create(replyRegisterRequest);
    return await this.replyRepository.findByReplyId(replyId);
  }

  async modifyReply(
    replyModifyRequest: ReplyModifyRequest,
    replyId: number,
  ): Promise<ReplyEntireDataReturn> {
    const isExistedReply = await this.replyRepository.checkExist(replyId);
    if (!isExistedReply)
      throw new HttpException('존재하지 않는 답글입니다.', 400);

    await this.replyRepository.update(replyModifyRequest, replyId);
    return await this.replyRepository.findByReplyId(replyId);
  }

  async removeReply(replyId: number): Promise<ReplyDeletedCountReturn> {
    const isExistedComment = await this.replyRepository.checkExist(replyId);
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 답글입니다.', 400);

    return await this.replyRepository.delete(replyId);
  }
}
