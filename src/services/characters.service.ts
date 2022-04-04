import httpClient from "../utils/http";
import {
  CharacterInfo,
  CharacterParams,
} from "../interfaces/characters.interface";

export const characterService = {
  getAll: async (params: CharacterParams): Promise<CharacterInfo> => {
    const { data } = await httpClient.get("/character", { params });
    return data;
  },
};
