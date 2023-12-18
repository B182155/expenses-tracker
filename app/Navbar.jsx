import { Box, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { FcMoneyTransfer } from "react-icons/fc";

const Navbar = () => {
  return (
    <Flex justify="between" align="center" p="4">
      <FcMoneyTransfer className="h-10 w-10" />
      <Box>
        <Button>Login</Button>
      </Box>
    </Flex>
  );
};

export default Navbar;
