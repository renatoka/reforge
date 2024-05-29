import { IPCInterface, IPCResponse } from '../../interfaces';
import ExampleService from '../../services/Example/example.service';

class backendExample implements IPCInterface {
  async handle(data: { message: string }): Promise<IPCResponse> {
    try {
      const users = await ExampleService.backendExample(data);
      return {
        message: 'Example data fetched successfully',
        resolved: true,
        data: users,
        error: null,
      };
    } catch (error) {
      return {
        message: 'Error fetching example data',
        resolved: false,
        data: null,
        error: error.message,
      };
    }
  }
}

export default new backendExample();
