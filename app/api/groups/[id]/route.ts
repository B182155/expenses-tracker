import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";
import { Group } from "@prisma/client";

export async function GET(request: NextRequest, { params }) {
  //   const session = await getServerSession(authOptions);
  //   console.log(session);
  //   if (!session) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  const users = await prisma?.group.findUnique({
    where: {
      id: params.id,
    },
    select: {
      members: true,
    },
  });
  // console.log(users);
  return NextResponse.json(users);
}
