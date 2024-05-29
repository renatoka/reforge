export interface IPCInterface {
  handle(data: any): Promise<IPCResponse>;
}

export interface IPCResponse {
  message: string;
  resolved: boolean;
  data: any | null;
  error: string | null;
}
