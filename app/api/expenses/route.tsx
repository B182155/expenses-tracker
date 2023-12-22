import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";
import { Expense } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  //   console.log(session);
  //   if (!session) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  const expenses = await prisma?.expense.findMany({
    include: {
      splits: true,
      //   creator: true,
    },
  });
  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const body: Expense = await request.json();

  const { description, amount, date, payerId, groupId } = body;

  const membersData = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    select: {
      members: true,
    },
  });

  const { members } = membersData;

  const amountPerPerson = Math.round(amount / members.length);

  // 1. Generate temporary expense ID

  const temporaryExpenseId = "6585daa6608c5490113294de";

  const data = members.map((member) => {
    if (member.id === payerId) {
      return {
        friendId: member.id,
        amountOwed: -(amount - amountPerPerson),
        expenseId: temporaryExpenseId,
      };
    } else {
      return {
        friendId: member.id,
        amountOwed: amountPerPerson,
        expenseId: temporaryExpenseId,
      };
    }
  });

  // 2. Create splits with temporary expense ID
  const splits = await prisma.split.createMany({
    data,
  });

  // 3. Create the actual expense

  const expense = await prisma?.expense.create({
    data: {
      description,
      amount,
      date,
      payerId,
      groupId,
    },
  });

  // 4. Update splits with actual expense ID
  const actualExpenseId = expense.id;
  await prisma.split.updateMany({
    where: { expenseId: temporaryExpenseId },
    data: { expenseId: actualExpenseId },
  });

  return NextResponse.json({ expense, splits }, { status: 201 });
}
