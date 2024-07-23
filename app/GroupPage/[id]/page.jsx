import GroupCard from "@/app/GroupCard";
import { Box, Button, Card, Flex, Grid } from "@radix-ui/themes";
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

import DeleteExpenseButton from "./DeleteExpense";

import { capitalizeFirstLetter } from "@/app/components/CapitalizeFirstLetter";

import { Home, CarTaxiFront as Tour, Album as Other } from "lucide-react";
// import { Box, Flex, Grid } from "@radix-ui/themes";

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

    return (
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

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  return (
    <>
      <Card mb="3" className="min-h-full">
        <Grid columns={{ initial: "1", sm: "5" }}>
          <Box className="col-span-3">
            <DisplayGroupDetails group={GroupData} />
          </Box>
          <Box className="ml-5 col-span-2">
            <h1 className="font-serif font-semibold text-xl text-gray-500 dark:text-white">
              Members Involved
            </h1>
            {GroupData?.members?.map((user) => (
              <h2
                className="font-serif font-medium text-base dark:text-slate-300"
                key={user.id}
              >
                {user.name}
              </h2>
            ))}
          </Box>
        </Grid>
      </Card>
      <Link
        href={`/GroupPage/${id}/CreateExpensePage`}
        className="inline-block w-full mb-3 rounded-md"
      >
        <Button className="w-1/2 text-gray-200 font-serif font-medium text-base">
          Add Expense
        </Button>
      </Link>
      {expenses.length > 0 ? (
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
                    <AccordionTrigger className="hover:no-underline bg-purple-100 rounded-md shadow-md pr-4 ">
                      <div className="flex flex-row justify-between items-center w-full ">
                        <div className="flex gap-4 items-center w-10/12">
                          <GetDate_Month date={expense.date} />
                          <div className="flex flex-col justify-start items-start">
                            <h3 className="text-xl font-serif font-medium text-gray-700">
                              {capitalizeFirstLetter(expense.description)}
                            </h3>
                            <h2 className="text-gray-600 text-sm font-sans font-medium">
                              <span>
                                {expense?.PaidBy.name} paid{" "}
                                <IndianRupee
                                  className="inline-block"
                                  size="20"
                                />
                                <span className="text-xl font-semibold">
                                  {" "}
                                  {expense.amount}
                                </span>
                              </span>
                            </h2>
                          </div>
                        </div>
                        <div className="mr-3">
                          <DeleteExpenseButton expenseId={expense.id} />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="mx-5 my-5">
                      <h1 className="mb-2 text-gray-700 font-serif font-semibold text-base dark:text-slate-300">
                        <span>
                          {capitalizeFirstLetter(expense.description)}
                        </span>
                        {"  "}
                        <span className="text-purple-600 dark:text-slate-300">
                          {" "}
                          INR {expense.amount}{" "}
                        </span>
                      </h1>
                      <div className="flex gap-2 items-center w-8/12">
                        <div className="text-base font-serif font-semibold text-gray-600 dark:text-slate-300">
                          {expense.date.toDateString()}
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="flex flex-col">
                          <h1>
                            <span>
                              <span className="font-semibold font-serif">
                                {expense?.PaidBy.name}
                              </span>{" "}
                              paid{" "}
                              <IndianRupee className="inline-block" size="20" />
                              {expense.amount}
                            </span>
                          </h1>

                          {expense.splits.map((split) => (
                            <p
                              className="ml-2 border-l-2 border-purple-600 dark:border-slate-300"
                              key={split.id}
                            >
                              <span className="text-purple-700 dark:text-slate-300">
                                {"--->"}
                              </span>
                              <span>
                                <span className="font-medium font-serif">
                                  {names.get(split.friendId)}
                                </span>
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
      ) : null}
    </>
  );
};

export default GroupDetailsPage;

const DisplayGroupDetails = ({ group }) => {
  const iconName = group.type;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "Home":
        return <Home color="purple" />;
      case "Tour":
        return <Tour color="purple" />;
      // Add more cases for other icons if needed
      default:
        return <Other color="purple" />;
    }
  };
  return (
    <Grid
      align="center"
      gapX="5"
      gapY="2"
      // columns={{ initial: "3", sm: "7" }}
      shrink="1"
      rows={{ initial: "2", sm: "0" }}
    >
      <Flex direction="row" gap="3" align="center">
        <Box className="ml-5  scale-150 ">{renderIcon(iconName)}</Box>
        <Box className="ml-5  col-span-2">
          <h3 className="text-xl font-serif font-semibold text-gray-500 dark:text-slate-300">
            {capitalizeFirstLetter(group.title)}
          </h3>

          <h2 className="text-sm font-serif font-semibold text-purple-400">
            {group.createdAt.toDateString()}
          </h2>
        </Box>
      </Flex>
      <Box className="ml-5 col-span-2">
        <p className="text-base font-serif font-medium text-gray-500 dark:text-slate-300">
          Created By
        </p>
        <h2 className="text-xl font-serif font-semibold text-gray-500 dark:text-slate-300">
          {group.creator.name}
        </h2>
      </Box>
    </Grid>
  );
};
