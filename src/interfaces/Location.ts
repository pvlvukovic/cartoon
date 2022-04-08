// Location interface

import { IInfo } from "./info";

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ILocationInfo {
  results: ILocation[];
  info: IInfo;
}

export interface ILocationParams {
  name?: string;
  page?: string;
}
