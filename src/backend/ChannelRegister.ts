import backendExample from './channels/Example/backendExample';
import { IPCInterface, IPCResponse } from './interfaces';

const channels = {
  backendExample: backendExample,
};

class ChannelRegister {
  async call(channel: { name: string }, data: any): Promise<IPCResponse> {
    if (channel.name in channels) {
      const ch: IPCInterface = channels[channel.name as keyof typeof channels];
      return await ch.handle(data);
    } else {
      return {
        message: `Channel ${channel.name} not found`,
        resolved: false,
        data: null,
        error: 'Channel not found',
      };
    }
  }
}

export default new ChannelRegister();
export type Channels = typeof channels;
