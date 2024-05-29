export {};
import { type Channels } from './backend/ChannelRegister';

declare global {
  interface Window {
    electronAPI: {
      apiRequest: ({
        channel,
        data
      }: {
        channel: keyof Channels;
        data?: any;
      }) => Promise<{
        message: string;
        resolved: boolean;
        data: any;
        error: string;
      }>;
    };
  }
}
