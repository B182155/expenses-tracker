"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const GotoCreatePageButton = () => {
  const router = useRouter();
  const gotoCreatePage = () => {
    router.push("/GroupPage");
  };
  return (
    <Button
      size="3"
      mt="3"
      className="w-full md:w-6/12 text-base md:text-lg lg:text-xl"
      onClick={gotoCreatePage}
    >
      Add Group
    </Button>
  );
};

export default GotoCreatePageButton;
