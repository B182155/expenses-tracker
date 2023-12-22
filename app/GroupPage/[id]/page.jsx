import GroupCard from "@/app/GroupCard";
import { Button, Card } from "@radix-ui/themes";
import React from "react";
// import GotoCreateExpensesPage from "./GotoCreateExpensesPage";
import Link from "next/link";

const GroupDetailsPage = async ({ params: { id } }) => {
  const GroupData = await prisma.group.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
      members: true,
    },
  });

  const expenses = await prisma.expense.findMany({
    where: {
      groupId: id,
    },
    include: {
      PaidBy: true,
    },
  });

  // console.log(expenses);

  // const date = new Date();

  const GetDate_Month = ({ date }) => {
    // const Date = date.getDate();
    // const month = date.getMonth();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return (
      <div className="border rounded-md w-5/12 border-purple-300 p-2 pr-6">
        {formattedDate}
      </div>
    );
  };

  return (
    <>
      <Card mb="3" className="min-h-full pl-10">
        <div className="flex justify-around">
          <GroupCard group={GroupData} />
          <div>
            <h1 className="text-lg font-bold">Friends Involved</h1>
            {GroupData?.members?.map((user) => (
              <h1 key={user.id}>{user.name}</h1>
            ))}
          </div>
        </div>
      </Card>
      <Link
        href={`/GroupPage/${id}/CreateExpensePage`}
        className="inline-block w-full mb-3 rounded-md"
      >
        <Button className="w-1/2">Add Expense</Button>
      </Link>
      <Card className="min-h-full ">
        <div className="flex flex-col-reverse">
          {expenses.map((expense) => {
            return (
              <div
                className="flex flex-row gap-7 items-center border-b-2 first:border-b-0 w-full"
                key={expense.id}
              >
                <div className="flex gap-2 items-center w-8/12">
                  <GetDate_Month
                    date={expense.date}
                    className="border-purple-200 rounded-md"
                  />
                  <h1>{expense.description}</h1>
                </div>
                <div className="">
                  <div className="flex flex-col">
                    <h1>{`${expense?.PaidBy.name} paid`}</h1>
                    <p>{`Rs - ${expense.amount}/-`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};

export default GroupDetailsPage;
