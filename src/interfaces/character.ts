// Character interface

import { Info } from "./info";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
  gender: string;
}

export interface CharacterInfo {
  results: Character[];
  info: Info;
}

export interface CharacterParams {
  name?: string;
  status?: string;
  page?: number;
}
