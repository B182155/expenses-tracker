import { Box, Button, Card } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GotoCreatePageButton from "./GotoCreatePageButton";
import prisma from "@/prisma/prismaClient";

export default async function Home() {
  return (
    <>
      <Card variant="surface" className="h-1/4"></Card>
      <GotoCreatePageButton />
      {/* {group[0]} */}
    </>
  );
}
