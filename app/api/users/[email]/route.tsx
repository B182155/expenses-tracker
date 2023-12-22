import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(req: NextRequest, { params }) {
  const user = await prisma?.user.findUnique({
    where: {
      email: params.email,
    },
  });
  return NextResponse.json(user);
}
