import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prismaClient';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //   const session = await getServerSession(authOptions);
    //   if (!session) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    //   }

    const expense = await prisma.expense.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!expense) {
      return NextResponse.json({ error: 'Invalid expense' }, { status: 400 });
    }

    await prisma.expense.delete({
      where: {
        id: expense.id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.stack, { status: 500 });
    }
  }
}
