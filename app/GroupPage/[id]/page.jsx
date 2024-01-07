import GroupCard from "@/app/GroupCard";
import { Button, Card, Flex } from "@radix-ui/themes";
import React from "react";
// import GotoCreateExpensesPage from "./GotoCreateExpensesPage";
import Link from "next/link";

import { IndianRupee, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// import { capitalizeFirstLetter } from "../../components/CapitalizeFirstLetter";
import { capitalizeFirstLetter } from "@/app/components/capitalizeFirstLetter";

// import UserData from "@/lib/useGetdata";

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
    const Date = date.getDate();
    const monthString = date.toLocaleString("default", {
      month: "long",
    });
    // const month = date.getMonth();

    // console.log(Date);
    return (
      // <div className="border rounded-md w-5/12 text-sm border-purple-300 p-2 pr-6">
      //   {formattedDate}
      // </div>
      <div className="flex flex-col rounded-md p-2 w-14">
        <h1 className="text-base text-gray-500">
          {monthString.substring(0, 3)}
        </h1>
        <h2 className="text-xl font-extrabold text-gray-700 font-mono -mt-1">
          {Date}
        </h2>
      </div>
    );
  };

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  return (
    <>
      <Card mb="3" className="min-h-full pl-10">
        <div className="flex justify-around">
          <GroupCard group={GroupData} />
          <div>
            <h1>Members Involved</h1>
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
                  className="border-b-2 border-purple-200"
                >
                  <AccordionTrigger className="hover:no-underline bg-cyan-50 rounded-md shadow-md ">
                    <div className="flex gap-4 items-center w-8/12">
                      <GetDate_Month date={expense.date} />
                      <div className="flex flex-col justify-start items-start">
                        <h3 className="text-2xl font-serif font-normal">
                          {capitalizeFirstLetter(expense.description)}
                        </h3>
                        <h2 className="text-gray-600 text-sm font-sans font-medium">
                          <span>
                            {expense?.PaidBy.name} paid{" "}
                            <IndianRupee className="inline-block" size="20" />
                            <span className="text-xl font-semibold">
                              {" "}
                              {expense.amount}
                            </span>
                          </span>
                        </h2>
                      </div>
                    </div>

                    {/* <div className={`flex flex-col`}>
                    

                      <h1>{`${expense?.PaidBy.name} paid`}</h1>
                      <p>{`Rs - ${expense.amount}/-`}</p>
                    </div> */}
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
                          <span>
                            {expense?.PaidBy.name} paid{" "}
                            <IndianRupee className="inline-block" size="20" />
                            {expense.amount}
                          </span>
                        </h1>

                        {expense.splits.map((split) => (
                          <p key={split.id}>
                            {" "}
                            <span>
                              {names.get(split.friendId)}
                              {split.amountOwed < 0 ? (
                                <span>
                                  {" "}
                                  Lent{" "}
                                  <IndianRupee
                                    className="inline-block"
                                    size="18"
                                  />{" "}
                                  {Math.abs(split.amountOwed)}{" "}
                                </span>
                              ) : (
                                <span>
                                  {" "}
                                  Owe{" "}
                                  <IndianRupee
                                    className="inline-block"
                                    size="18"
                                  />{" "}
                                  {split.amountOwed}{" "}
                                </span>
                              )}
                            </span>
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
