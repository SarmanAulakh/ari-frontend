import { Genres } from "constants/game";

export interface PaymentType {
  USD: number;
}

export type GenreList = keyof typeof Genres;

export interface Game {
  gameId: string;
  displayName: string;
  price: PaymentType;
  description: string;
  platforms: string[];
  releaseDate?: string;
  company: string;
  rating?: number;
  languages?: string[];
  coverImage: string;
  esrbRating?: string;
  genres?: GenreList[];
  tags?: string[];
  released?: boolean;
  sold?: number;
  countLimit?: number;
}

export interface OwnedGame extends Game {
  contractAddress: string;
  contractId: string;
}
