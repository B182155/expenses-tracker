import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import React from "react";

const GetUserData = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma?.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  return user;
  console.log(user);
};

export default GetUserData;
