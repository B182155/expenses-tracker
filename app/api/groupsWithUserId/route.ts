import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(request: NextRequest) {
  const Session = await getServerSession(authOptions);

  const userData = Session.user;

  const user = await prisma?.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      OR: [
        {
          members: {
            some: {
              id: user.id,
            },
          },
        },
        {
          createdBy: user.id,
        },
      ],
    },
    include: {
      members: true,
      creator: true,
    },
  });

  return NextResponse.json(groups);
}
