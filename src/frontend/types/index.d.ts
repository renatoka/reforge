export {};
import { type Channels } from '../../backend/ChannelRegister';

declare global {
  interface Window {
    api: {
      request: ({ channel, data }: { channel: keyof Channels; data?: any }) => Promise<{
        message: string;
        resolved: boolean;
        data: any;
        error: string;
      }>;
    };
  }
}

declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
