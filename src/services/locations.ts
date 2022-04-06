import httpClient from "../utils/http";
import { LocationInfo, LocationParams } from "../interfaces/locations";

export const locationService = {
  getAll: async (params: LocationParams): Promise<LocationInfo> => {
    const { data } = await httpClient.get("/location", { params });
    return data;
  },
};