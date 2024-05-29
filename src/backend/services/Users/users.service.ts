import prisma from '../../../prisma';

class UsersService {
  async getAllUsers() {
    return await prisma.user.findMany();
  }
}

export default new UsersService();
