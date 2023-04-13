import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyEntity } from './replies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RepliesRepository {
  constructor(
    @InjectRepository(ReplyEntity)
    private readonly replyModel: Repository<ReplyEntity>,
  ) {}
}
