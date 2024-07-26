import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";
import { Group } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  //   console.log(session);
  //   if (!session) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  const users = await prisma?.group.findMany({
    include: {
      members: true,
      //   creator: true,
    },
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body: Group = await request.json();
  // console.log(body);
  const { title, type, memberIds, createdBy } = body;

  const group = await prisma?.group.create({
    data: {
      title,
      type,
      createdBy,
      memberIds,
    },
  });

  const groupId = group.id;

  memberIds.forEach(async (memberId) => {
    await prisma?.user.update({
      where: { id: memberId },
      data: {
        groups: {
          connect: { id: groupId },
        },
        GroupIds: {
          push: groupId,
        },
      },
    });
  });

  return NextResponse.json(group, { status: 201 });
}
