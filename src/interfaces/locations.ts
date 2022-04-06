// Location interface

import { Info } from "./info";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationInfo {
  results: Location[];
  info: Info;
}

export interface LocationParams {
  name?: string;
  page?: string;
}
