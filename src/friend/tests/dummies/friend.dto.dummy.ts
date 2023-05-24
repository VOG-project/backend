import { FriendCreateRequest } from 'src/friend/dto/create.friend.dto';
import { FriendDeleteRequest } from 'src/friend/dto/delete.friend.dto';

export const FriendRegisterDto: FriendCreateRequest = {
  targetId: 10,
};

export const FriendDeleteDto: FriendDeleteRequest = {
  targetId: 10,
};
