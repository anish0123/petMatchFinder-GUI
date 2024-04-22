import { Point } from 'geojson';
import { Category } from "./Category";

type Animal =  {
    animal_id: string;
    animal_name: string;
    category: Category | string
    birthdate: Date;
    owner: string;
    gender: 'male' | 'female';
    image: string;
    location: Point;
    weight: number;
    listedDate: Date;
  };

export type { Animal };