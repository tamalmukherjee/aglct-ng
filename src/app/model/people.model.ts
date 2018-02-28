import { Pet } from './pet.model';

export interface People {
    name: string;
    gender: string;
    age: number;
    pets: Pet[];
}