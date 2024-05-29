import { IPCInterface, IPCResponse } from '../../../backend/interfaces';
import UserService from '../../../backend/services/Users/users.service';

class getAllUsersChannel implements IPCInterface {
  async handle(): Promise<IPCResponse> {
    try {
      const users = await UserService.getAllUsers();
      return {
        message: 'Users fetched successfully',
        resolved: true,
        data: users,
        error: null
      };
    } catch (error) {
      return {
        message: 'Error fetching users',
        resolved: false,
        data: null,
        error: error.message
      };
    }
  }
}

export default new getAllUsersChannel();
