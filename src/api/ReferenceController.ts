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
      baseURL: webConfigEnv.REFERENCE_API,
    });
  }
  async getCityBranches(): Promise<any[]> {
    return server.get(`/api/generic/CityBranch`, {
      baseURL: webConfigEnv.REFERENCE_API,
    });
  }
}
