import { PrismaClient } from '@prisma/client/default';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

export default prisma;
