import { Injectable } from '@nestjs/common';
import { RepliesRepository } from './replies.repository';
import { ReplyRegisterRequest } from './dto/register.reply.dto';
import { ReplyEntireDataReturn } from './dto/return.reply.dto';

@Injectable()
export class RepliesService {
  constructor(private readonly replyRepository: RepliesRepository) {}

  async registerReply(
    replyRegisterRequest: ReplyRegisterRequest,
  ): Promise<ReplyEntireDataReturn> {
    const { replyId } = await this.replyRepository.create(replyRegisterRequest);
    return await this.replyRepository.findByReplyId(replyId);
  }
}
