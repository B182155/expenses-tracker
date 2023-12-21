import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(req: NextRequest) {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  const users = await prisma?.user.findMany();
  return NextResponse.json(users);
}
