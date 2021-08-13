import { server } from "./axios";

const webConfigEnv = (window as any).env;

export interface CodeName {
  code?: string;
  name?: string;
  description?: string;
}

export class ReferenceController {
  async getCities(): Promise<any[]> {
    return server.get(`/api/generic/financialinstitution`, {
      baseURL: "http://10.20.52.96:5335/",
    });
  }
  async getCityBranches(): Promise<any[]> {
    return server.get(`/api/generic/CityBranch`, {
      baseURL: "http://10.20.52.96:5335/",
    });
  }
}
