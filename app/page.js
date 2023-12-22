import { Box, Button, Card } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GotoCreatePageButton from "./GotoCreatePageButton";
import prisma from "@/prisma/prismaClient";
import GroupCard from "./GroupCard";
import Link from "next/link";
import { group } from "console";
import { Key } from "lucide-react";

export default async function Home() {
  const groups = await prisma.group.findMany({
    include: {
      members: true,
      creator: true,
    },
  });

  return (
    <>
      <Card mb="3" variant="surface" className="min-h-1/4"></Card>
      {/* <Card variant="surface"> */}
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

      <GotoCreatePageButton />
    </>
  );
}
