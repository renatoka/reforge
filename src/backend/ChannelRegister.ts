import getAllUsersChannel from './channels/Users/getAllUsersChannel';
import { IPCInterface, IPCResponse } from './interfaces';

const channels = {
  getAllUsers: getAllUsersChannel
};

class ChannelRegister {
  async call(channel: { channel: string }, data: any): Promise<IPCResponse> {
    if (channel.channel in channels) {
      const ch: IPCInterface =
        channels[channel.channel as keyof typeof channels];
      return await ch.handle(data);
    } else {
      return {
        message: `Channel ${channel} not found`,
        resolved: false,
        data: null,
        error: 'Channel not found'
      };
    }
  }
}

export default new ChannelRegister();
export type Channels = typeof channels;
