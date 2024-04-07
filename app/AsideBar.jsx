// "use client";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { MdGroupAdd } from "react-icons/md";
import prisma from "@/prisma/prismaClient";
import GroupCard from "./GroupCard";
import { capitalizeFirstLetter } from "./components/CapitalizeFirstLetter";

const NavLinks = async () => {
  // const currentpath = usePathname();
  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

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
                "text-gray-600 hover:text-gray-900 transition-colors ": true,
                "active:text-gray-900": true,
              })}
            >
              <h3 className="font-serif font-medium text-lg dark:text-white ">
                {item.name}
              </h3>
            </Link>
          </Box>
        ))}
      </Card>

      <Card className="w-full min-h-screen ">
        <Flex direction="row" justify="between" align="center">
          <Heading color="purple" size="5">
            <h3 className="font-serif font-extrabold text-xl">GROUPS</h3>
          </Heading>
          <Link href="/GroupPage">
            <MdGroupAdd className="w-9 h-9 p-1 rounded-md  invert-0" />
          </Link>
        </Flex>
        <Flex direction="column-reverse" gap="2" mt="5">
          {groups.map((group) => {
            return (
              <Link key={group.id} mb="3" href={`/GroupPage/${group.id}`}>
                <Card size="1">
                  <h3 className="font-serif font-medium text-base dark:text-slate-300">
                    {capitalizeFirstLetter(group.title)}
                  </h3>
                </Card>
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
    <Card
      className="h-full"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <NavLinks />
    </Card>
  );
};

export default AsideBar;
