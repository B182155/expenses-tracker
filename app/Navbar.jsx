// import { Box, Button, Flex } from "@radix-ui/themes";
// import Link from "next/link";
// import React from "react";
// import { FcMoneyTransfer } from "react-icons/fc";

// const Navbar = () => {
//   return (
//     <Flex justify="between" align="center" p="4">
//       <FcMoneyTransfer className="h-10 w-10" />
//       <Box>
//         <Link href="./api/auth/signin">Login</Link>
//       </Box>
//     </Flex>
//   );
// };

// export default Navbar;

"use client";

import { usePathname, useRouter } from "next/navigation";

import { FcMoneyTransfer } from "react-icons/fc";

import { Box, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import Link from "next/link";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";

import Skeleton from "./components/Skeleton";
import { useSession } from "next-auth/react";

const NavLinks = () => {
  const currentpath = usePathname();
  const navItems = [
    {
      name: "Dashboard",
      link: "/",
    },
  ];
  return (
    <Flex gap="4" align="center" px="4">
      {navItems.map((item) => (
        <Box key={item.name}>
          <Link
            href={item.link}
            className={classnames({
              "text-gray-600 hover:text-gray-900 transition-colors": true,
              "active:text-gray-900": currentpath === item.link,
            })}
          >
            {item.name}
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

const Navbar = () => {
  return (
    <nav className="border-b p-2">
      <Flex
        direction="row"
        // gap="6"
        justify="between"
        align="center"
        height="auto"
      >
        <Flex align="center" gap="4">
          <Link href="/">
            <FcMoneyTransfer className="h-10 w-10" />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
    // </Container>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  // console.log(session);

  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }

  if (status === "unauthenticated") {
    return <Link href="api/auth/signin">Login</Link>;
  }

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar.Root>
              <Avatar.AvatarImage
                src={session.user?.image}
                className="h-8 w-8 rounded-full"
              />
              <Avatar.AvatarFallback delayMs={200}>?</Avatar.AvatarFallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[180px] bg-gray-200 rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <DropdownMenu.Label className="pl-[25px] text-sm leading-[25px] text-mauve11">
                {session.user?.name}
              </DropdownMenu.Label>

              <DropdownMenu.Item className="group text-[15px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
                <Link href="/api/auth/signout">Sign Out</Link>
              </DropdownMenu.Item>
              <DropdownMenu.DropdownMenuArrow />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
