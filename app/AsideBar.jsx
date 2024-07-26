// "use client";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { MdGroupAdd } from "react-icons/md";
import prisma from "@/prisma/prismaClient";
import GroupCard from "./GroupCard";
import { capitalizeFirstLetter } from "./components/CapitalizeFirstLetter";

import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

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

  // const groupsCreatedByUser = await prisma.group.findMany({
  //   where: {
  //     createdBy: user.id,
  //   },
  //   include: {
  //     members: true,
  //     creator: true,
  //   },
  // });

  // const groupsWithUserAsMember = await prisma.group.findMany({
  //   where: {
  //     members: {
  //       some: {
  //         id: user.id,
  //       },
  //     },
  //   },
  //   include: {
  //     members: true,
  //     creator: true,
  //   },
  // });

  // // Merge the results, removing duplicates if necessary
  // const groupsMap = new Map();
  // [...groupsCreatedByUser, ...groupsWithUserAsMember].forEach((group) => {
  //   groupsMap.set(group.id, group);
  // });

  // const groups = Array.from(groupsMap.values());

  // console.log(groups);
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
              <p className="font-serif font-medium text-lg dark:text-white ">
                {item.name}
              </p>
            </Link>
          </Box>
        ))}
      </Card>

      <Card className="w-full min-h-screen ">
        <Flex direction="row" justify="between" align="center">
          <Heading color="purple" size="5">
            <p className="font-serif font-extrabold text-xl">GROUPS</p>
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
                  <p className="font-serif font-medium text-base dark:text-slate-300">
                    {capitalizeFirstLetter(group.title)}
                  </p>
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
