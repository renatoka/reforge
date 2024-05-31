import prisma from '../../../../prisma/prisma.service';

class ExampleService {
  async backendExample(data: { message: string }) {
    console.log(data);
    return await prisma.example.findMany();
  }
}

export default new ExampleService();
