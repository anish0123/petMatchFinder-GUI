import { Point } from 'geojson';
import { Category } from "./Category";
import { User } from './User';

type Animal =  {
    animal_id: string;
    animal_name: string;
    category: Category
    birthdate: Date;
    owner: User;
    gender: 'male' | 'female';
    image: string;
    location: Point;
    weight: number;
    listedDate: Date;
    description: string;
  };

export type { Animal };