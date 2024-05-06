import {User} from './User';

type Rating = {
  id: string;
  rating: number;
  ratedBy: User;
  ratedTo: User;
  description: string;
  ratedDate: Date;
};

export type {Rating};
