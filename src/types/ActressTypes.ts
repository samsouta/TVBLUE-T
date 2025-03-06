import { MovieDataType } from "./MovieType";

export type ActressType = {
    id: number;
    name: string;
    description: string;
    image_url: string;
    age: number;
    nationality: string;
    birth_date: string;
    is_popular: boolean;
    movies_count: number;
    movies: MovieDataType[];
  };