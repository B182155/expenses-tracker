import { Box, Button, Card } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GotoCreatePageButton from "./GotoCreatePageButton";

export default function Home() {
  return (
    <Card className="h-full">
      <Card variant="surface" className="h-1/4"></Card>
      <GotoCreatePageButton />
    </Card>
  );
}
