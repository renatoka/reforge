import prisma from '../../../prisma';

class ExampleService {
  async backendExample(data: { message: string }) {
    console.log(data.message, 'example.service.ts');
    return await prisma.example.findMany();
  }
}

export default new ExampleService();
