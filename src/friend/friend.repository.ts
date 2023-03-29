import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendRepository {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly friendModel: Repository<FriendEntity>,
  ) {}
}
