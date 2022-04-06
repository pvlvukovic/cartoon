import httpClient from "../utils/http";
import {
  Character,
  CharacterInfo,
  CharacterParams,
} from "../interfaces/character";

export const characterService = {
  getAll: async (params: CharacterParams): Promise<CharacterInfo> => {
    const { data } = await httpClient.get("/character", { params });
    return data;
  },
  getMultiple: async (ids: string[]): Promise<Character[]> => {
    const { data } = await httpClient.get(`/character/${ids.join(",")}`);
    return data;
  },
};
