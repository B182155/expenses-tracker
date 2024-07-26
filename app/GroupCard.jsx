import React from "react";

import { capitalizeFirstLetter } from "./components/CapitalizeFirstLetter";

import { Home, CarTaxiFront as Tour, Album as Other } from "lucide-react";
import { Box, Flex, Grid } from "@radix-ui/themes";

const GroupCard = ({ group }) => {
  const iconName = group.type;

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "Home":
        return <Home color="purple" />;
      case "Tour":
        return <Tour color="purple" />;
      // Add more cases for other icons if needed
      default:
        return <Other color="purple" />;
    }
  };
  return (
    <Grid
      align="center"
      // direction={{ initial: "column", sm: "row" }}
      columns={{ initial: "1", sm: "2" }}
      gap={{ initial: "2", sm: "3" }}
    >
      <Box columns={{}}>
        <Flex align="center" gap={{ initial: "3", sm: "4" }}>
          <Box className="md:ml-5 mr-4 scale-150 ">{renderIcon(iconName)}</Box>
          <Box className="">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-semibold text-gray-500 dark:text-white">
              {capitalizeFirstLetter(group.title)}
            </h3>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-semibold text-purple-400">
              {group.createdAt.toDateString()}
            </h2>
          </Box>
        </Flex>
      </Box>

      <Box className="">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-medium dark:text-slate-300">
          Created By
        </p>
        <h2 className="text-base sm:text-lg md:text-xl font-sans font-light dark:text-slate-300 ">
          {group.creator.name}
        </h2>
      </Box>
    </Grid>
  );
};

export default GroupCard;
