import {
  ICharacter,
  ICharacterInfo,
  ICharacterParams,
} from "../interfaces/Character";
import httpClient from "../utils/http";

export const characterService = {
  getAll: async (params: ICharacterParams): Promise<ICharacterInfo> => {
    const { data } = await httpClient.get("/character", { params });
    return data;
  },
  getMultiple: async (ids: string[]): Promise<ICharacter[]> => {
    const { data } = await httpClient.get(`/character/${ids.join(",")}`);
    return data;
  },
};
