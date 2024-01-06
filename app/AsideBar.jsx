// "use client";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { MdGroupAdd } from "react-icons/md";
import prisma from "@/prisma/prismaClient";
import GroupCard from "./GroupCard";

const NavLinks = async () => {
  // const currentpath = usePathname();
  const navItems = [
    {
      name: "Dashboard",
      link: "/",
    },
  ];

  const groups = await prisma.group.findMany({
    include: {
      members: true,
      creator: true,
    },
  });
  return (
    <Flex gap="4" direction="column">
      <Card className="w-full">
        {navItems.map((item) => (
          <Box key={item.name}>
            <Link
              href={item.link}
              className={classnames({
                "text-gray-600 hover:text-gray-900 transition-colors": true,
                "active:text-gray-900": true,
              })}
            >
              {item.name}
            </Link>
          </Box>
        ))}
      </Card>

      <Card className="w-full min-h-screen ">
        <Flex direction="row" justify="between" align="center">
          <Heading color="purple" size="5">
            GROUPS
          </Heading>
          <Link href="/GroupPage">
            <MdGroupAdd className="w-9 h-9 p-1 rounded-md bg-purple-100" />
          </Link>
        </Flex>
        <Flex direction="column" gap="2" mt="5">
          {groups.map((group) => {
            return (
              <Link key={group.id} mb="3" href={`/GroupPage/${group.id}`}>
                <Card size="1">{group.title}</Card>
              </Link>
            );
          })}
        </Flex>
      </Card>
    </Flex>
  );
};

const AsideBar = async () => {
  return (
    <Card className="h-full">
      <NavLinks />
    </Card>
  );
};

export default AsideBar;
