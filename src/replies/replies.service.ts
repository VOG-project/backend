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

  /**
   * 답글 데이터를 생성하고 생성된 데이터를 반환
   */
  async registerReply(
    replyRegisterRequest: ReplyRegisterRequest,
  ): Promise<ReplyEntireDataReturn> {
    const { replyId } = await this.replyRepository.create(replyRegisterRequest);
    return await this.replyRepository.findByReplyId(replyId);
  }

  /**
   * 요청 Dto에 담긴 데이터로 답글 데이터 갱신
   */
  async modifyReply(
    replyModifyRequest: ReplyModifyRequest,
    replyId: number,
  ): Promise<ReplyEntireDataReturn> {
    const isExistedReply = await this.replyRepository.checkExist(replyId);
    // 답글 데이터가 존재할 때에만 갱신하도록 합니다.
    if (!isExistedReply)
      throw new HttpException('존재하지 않는 답글입니다.', 404);

    await this.replyRepository.update(replyModifyRequest, replyId);
    return await this.replyRepository.findByReplyId(replyId);
  }

  async removeReply(replyId: number): Promise<ReplyDeletedCountReturn> {
    const isExistedComment = await this.replyRepository.checkExist(replyId);
    // 답글 데이터가 존재할 때에만 갱신하도록 합니다.
    if (!isExistedComment)
      throw new HttpException('존재하지 않는 답글입니다.', 404);

    return await this.replyRepository.delete(replyId);
  }
}
