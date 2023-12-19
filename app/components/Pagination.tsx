"use client";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

import URLSearchParams from "url-search-params";
import React, { useState } from "react";

interface Props {
  itemCount: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //   const [currentP, setCurentPage] = useState(1);

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="surface"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(1);
        }}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="surface"
        disabled={currentPage === 1}
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="surface"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="surface"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(pageCount);
        }}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};
export default Pagination;
