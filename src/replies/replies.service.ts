import { Injectable } from '@nestjs/common';
import { RepliesRepository } from './replies.repository';

@Injectable()
export class RepliesService {
  constructor(private readonly replyRepository: RepliesRepository) {}
}
