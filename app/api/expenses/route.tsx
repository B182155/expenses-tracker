import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/prismaClient";
import { Expense } from "@prisma/client";
// import { string } from "zod";

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
  const body = await request.json();

  const { description, amount, date, payerId, groupId, friends } = body;

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

  const expenseId = expense.id;

  const amountPerPerson = Math.round(amount / friends.length);

  const data = friends.map((memberId: string) => {
    if (memberId === payerId) {
      return {
        friendId: memberId,
        amountOwed: -(amount - amountPerPerson),
        expenseId,
      };
    } else {
      return {
        friendId: memberId,
        amountOwed: amountPerPerson,
        expenseId,
      };
    }
  });

  // 2. Create splits with temporary expense ID
  const splits = await prisma.split.createMany({
    data,
  });

  // // 4. Update splits with actual expense ID
  // const actualExpenseId = expense.id;
  // await prisma.split.updateMany({
  //   where: { expenseId: temporaryExpenseId },
  //   data: { expenseId: actualExpenseId },
  // });

  return NextResponse.json({ status: 201 });
}
