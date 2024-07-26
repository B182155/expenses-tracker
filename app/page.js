// "use client";

import { Box, Button, Card, Flex } from "@radix-ui/themes";

import GotoCreatePageButton from "./GotoCreatePageButton";
import prisma from "@/prisma/prismaClient";
import GroupCard from "./GroupCard";
import Link from "next/link";
// import { group } from "console";
// import { Key } from "lucide-react";

import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export default async function Home() {
  const Session = await getServerSession(authOptions);

  const userData = Session.user;

  const user = await prisma?.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  const groups = await prisma.group.findMany({
    where: {
      OR: [
        { createdBy: user.id },
        {
          members: {
            some: {
              id: user?.id,
            },
          },
        },
      ],
    },
    include: {
      members: true,
      creator: true,
    },
  });

  // console.log(groups);

  return (
    <Flex direction="column-reverse" gap="0" mt="2">
      <GotoCreatePageButton />
      {/* {userData} */}
      {groups.map((group) => {
        return (
          <Card key={group.id} mb="3">
            <Link href={`/GroupPage/${group.id}`}>
              <GroupCard group={group} />
            </Link>
          </Card>
        );
      })}
      {/* </Card> */}
    </Flex>
  );
}
