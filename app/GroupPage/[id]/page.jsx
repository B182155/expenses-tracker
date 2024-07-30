import GroupCard from "@/app/GroupCard";
import { Box, Button, Card, Flex, Grid } from "@radix-ui/themes";
import React from "react";
// import GotoCreateExpensesPage from "./GotoCreateExpensesPage";
import Link from "next/link";
import prisma from "@/prisma/prismaClient";

import { IndianRupee, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { capitalizeFirstLetter } from "@/app/components/CapitalizeFirstLetter";

import { Home, CarTaxiFront as Tour, Album as Other } from "lucide-react";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import TriggerAccordion from "./TriggerAccordion";
import ContentAccordion from "./ContentAccordion";

// import { getServerSession } from "next-auth";
// import authOptions from "@/app/auth/authOptions";
// import { Box, Flex, Grid } from "@radix-ui/themes";

const GroupDetailsPage = async ({ params: { id } }) => {
  const GroupData = await prisma?.group.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
      members: true,
    },
  });

  const expenses = await prisma?.expense.findMany({
    where: {
      groupId: id,
    },
    include: {
      PaidBy: true,
      splits: true,
    },
  });

  const Session = await getServerSession(authOptions);

  const userData = Session.user;

  const user = await prisma?.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  const { members } = GroupData;

  const names = new Map(members.map((member) => [member.id, member.name]));

  return (
    <>
      <Card mb="3" className="min-h-full">
        <Grid columns={{ initial: "1", sm: "5" }}>
          <Box className="col-span-3">
            <DisplayGroupDetails group={GroupData} />
          </Box>
          <Box className="ml-5 col-span-2">
            <h1 className="font-serif font-semibold  text-gray-500 text-base sm:text-lg md:text-xl dark:text-white">
              Members Involved
            </h1>
            {GroupData?.members?.map((user) => (
              <h2
                className=" text-xs  md:text-sm lg:text-base font-sans font-extralight  dark:text-slate-300"
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
        className="inline-block w-full sm:w-1/2 mb-3 rounded-md"
      >
        {user.id === GroupData.createdBy && (
          <Button className="w-full text-gray-200 font-serif font-medium text-base">
            Add Expense
          </Button>
        )}
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
                    className="border-b-2 border-purple-200 dark:border-gray-900"
                  >
                    <AccordionTrigger className="hover:no-underline bg-purple-50 dark:bg-gray-800  rounded-md shadow-md pr-4">
                      <TriggerAccordion
                        expense={expense}
                        groupCreated={user.id === GroupData.createdBy}
                      />
                    </AccordionTrigger>
                    <AccordionContent className="mx-5 my-5">
                      <ContentAccordion
                        expense={expense}
                        SplittedArrayMap={names}
                      />
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
        <Box className="ml-5 scale-150 ">{renderIcon(iconName)}</Box>
        <Box className="ml-5 col-span-2">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl  font-serif font-semibold text-gray-500 dark:text-slate-300">
            {capitalizeFirstLetter(group.title)}
          </h3>

          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-semibold text-purple-400">
            {group.createdAt.toDateString()}
          </h2>
        </Box>
      </Flex>
      <Box className="ml-5 col-span-2">
        <p className="text-sm  sm:text-base md:text-lg lg:text-xl font-serif font-medium text-gray-500 dark:text-slate-300">
          Created By
        </p>
        <h2 className="text-base md:text-lg lg:text-xl  font-serif font-semibold text-gray-500 dark:text-slate-300">
          {group.creator.name}
        </h2>
      </Box>
    </Grid>
  );
};
