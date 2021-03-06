import { server } from "./axios";

const webConfigEnv = (window as any).env;

export class CamundaController {
  async start(variables: any): Promise<any> {
    return server.post(
      `/process/start`,
      {
        processDefinitionKey: "mortgage",
        variables,
      },
      {
        baseURL: webConfigEnv.GREEN_API_TEST,
      }
    );
  }
  async callback(variables: any): Promise<any> {
    return server.post(
      `/process/start`,
      {
        processDefinitionKey: "growing_business",
        variables,
      },
      {
        baseURL: webConfigEnv.GREEN_API_TEST,
      }
    );
  }
}
