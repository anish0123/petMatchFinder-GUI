import {Point} from 'geojson';
import {Category} from './Category';
import {User} from './User';

type Animal = {
  id: string;
  animal_name: string;
  category: Category |string;
  birthdate: Date;
  owner: User;
  gender: 'male' | 'female';
  image: string;
  location: Point;
  weight: number;
  price: number;
  listedDate: Date;
  description: string;
  adoptionStatus: 'available' | 'adopted';
};

export type {Animal};
