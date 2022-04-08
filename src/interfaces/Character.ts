// Character interface

import { IInfo } from "./Info";

export interface ICharacter {
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

export interface ICharacterInfo {
  results: ICharacter[];
  info: IInfo;
}

export interface ICharacterParams {
  name?: string;
  status?: string;
  page?: number;
}
