export type MovieDataType = {
  id: number;
  title: string;
  description: string;
  posted_date: string;
  duration: number;
  view_count: number;
  rating_total: number;
  rating_count: number;
  genre_id: number;
  sub_genre_id: number;
  language: string;
  released_year: string;
  thumbnail_url: string;
  video_url: string;
  is_featured: number;
  genre: {
    id: number;
    name: string;
    description: string;
  };
  sub_genre: {
    id: number;
    genre_id: number;
    name: string;
  };
};
