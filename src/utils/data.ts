import { UserDetail } from './dto';

export function getName(user: UserDetail) {
  return `${user.firstname}, ${user.lastname}`;
}
