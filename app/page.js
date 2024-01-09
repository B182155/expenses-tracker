import { Box, Button, Card, Flex } from '@radix-ui/themes';

import GotoCreatePageButton from './GotoCreatePageButton';
import prisma from '@/prisma/prismaClient';
import GroupCard from './GroupCard';
import Link from 'next/link';
// import { group } from "console";
// import { Key } from "lucide-react";

export default async function Home() {
  const groups = await prisma.group.findMany({
    // where: {},
    include: {
      members: true,
      creator: true,
    },
  });

  return (
    <Flex
      direction="column-reverse"
      gap="0"
      mt="2"
    >
      <GotoCreatePageButton />
      {groups.map((group) => {
        return (
          <Card
            key={group.id}
            mb="3"
          >
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
