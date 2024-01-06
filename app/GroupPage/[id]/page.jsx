import GroupCard from "@/app/GroupCard";
import { Button, Card } from "@radix-ui/themes";
import React from "react";
// import GotoCreateExpensesPage from "./GotoCreateExpensesPage";
import Link from "next/link";

import { IndianRupee } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      splits: true,
    },
  });

  const { members } = GroupData;

  const names = new Map(members.map((member) => [member.id, member.name]));

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
      <div className="border rounded-md w-5/12 text-sm border-purple-300 p-2 pr-6">
        {formattedDate}
      </div>
    );
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Card mb="3" className="min-h-full pl-10">
        <div className="flex justify-around">
          <GroupCard group={GroupData} />
          <div>
            <h1>Friends Involved</h1>
            {GroupData?.members?.map((user) => (
              <h2 key={user.id}>{user.name}</h2>
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
        <Accordion type="single" collapsible className="w-full">
          <div className="flex flex-col-reverse">
            {expenses?.map((expense) => {
              return (
                <AccordionItem
                  // className="flex flex-row gap-7 items-center border-b-2 first:border-b-0 w-full"
                  value={expense.id}
                  key={expense.id}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex gap-2 items-center w-8/12">
                      <GetDate_Month
                        date={expense.date}
                        className="border-purple-200 rounded-md"
                      />
                      <h1>{capitalizeFirstLetter(expense.description)}</h1>
                    </div>
                    <div className="">
                      <div className="flex flex-col">
                        <h1>{`${expense?.PaidBy.name} paid`}</h1>
                        <p>{`Rs - ${expense.amount}/-`}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mx-5">
                    <h1 className="mb-2">
                      {capitalizeFirstLetter(expense.description)}
                    </h1>
                    <div className="flex gap-2 items-center w-8/12">
                      <GetDate_Month
                        date={expense.date}
                        className="border-purple-200 rounded-md"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex flex-col">
                        <h1>
                          {`${expense?.PaidBy.name} paid  Rs ${expense.amount}`}
                        </h1>
                        {/* {console.log(names)} */}

                        {expense.splits.map((split) => (
                          <p key={split.id}>
                            {" "}
                            {`${names.get(split.friendId)} ${
                              split.amountOwed < 0
                                ? `Lent --> Rs ${Math.abs(split.amountOwed)}`
                                : `Owe --> ${split.amountOwed}`
                            }`}
                          </p>
                        ))}
                        {/* <p>{`Rs - ${expense.amouX`nt}/-`}</p> */}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </div>
        </Accordion>
      </Card>
    </>
  );
};

export default GroupDetailsPage;
