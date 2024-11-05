import { User } from '../../users/entities/user.entity';

export interface ISignUpData {
  user: User;
  token: string;
}

export interface ILogInData {
  token: string;
}
