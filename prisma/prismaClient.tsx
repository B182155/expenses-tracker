import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// import { PrismaClient } from "@prisma/client";

// let prisma;

// global.prisma = undefined;

// if (typeof window !== "undefined") {
//   // Browser environment
//   globalThis.prisma = globalThis.prisma || new PrismaClient();
// } else {
//   // Node.js environment
//   prisma = prisma || new PrismaClient();
//   if (process.env.NODE_ENV !== "production") {
//     global.prisma = prisma;
//   }
// }

// export default prisma;
