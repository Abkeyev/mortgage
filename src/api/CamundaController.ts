import { server } from "./axios";

const webConfigEnv = (window as any).env;

export class Task {
  id?: string;
  processInstanceId?: string;
  processDefinitionId?: string;
  processName?: string;
  businessKey?: string;
  definitionKey?: string;
  name?: string;
  created?: string;
  due?: any;
  assignee?: string;
  variables?: any;
  taskFields?: Array<any>;
}

export class CamundaController {
  async start(variables: any): Promise<any> {
    return server.post(
      `/process/start`,
      {
        processDefinitionKey: "mortgage",
        variables,
      },
      {
        baseURL: webConfigEnv.CAMUNDA_TEST,
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

  async getTaskBusinessKey(businessKey?: string): Promise<Task> {
    return await server.get(`/task/claim/businessKey/${businessKey}`, {
      baseURL: webConfigEnv.CAMUNDA_TEST,
    });
  }
}
