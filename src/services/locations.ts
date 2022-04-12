import { ILocationInfo, ILocationParams } from "../interfaces/Location";
import httpClient from "../utils/axiosInstance";

export const locationService = {
  getAll: async (params: ILocationParams): Promise<ILocationInfo> => {
    const { data } = await httpClient.get("/location", { params });
    return data;
  },
};
