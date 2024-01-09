import React from 'react';
import { capitalizeFirstLetter } from '@/app/components/capitalizeFirstLetter';

import { Home, CarTaxiFront as Tour, Album as Other } from 'lucide-react';
import { Box, Flex, Grid } from '@radix-ui/themes';

const GroupCard = ({ group }) => {
  const iconName = group.type;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Home':
        return <Home color="purple" />;
      case 'Tour':
        return <Tour color="purple" />;
      // Add more cases for other icons if needed
      default:
        return <Other color="purple" />;
    }
  };
  return (
    <Grid
      align="center"
      gapX={{ initial: '2', sm: '5' }}
      gapY="2"
      columns={{ initial: '3', sm: '7' }}
      shrink="1"
      rows={{ initial: '2', sm: '0' }}
    >
      <Box className="ml-5 md:ml-10 scale-150 ">{renderIcon(iconName)}</Box>
      <Box className="col-span-2">
        <h3 className="text-xl font-serif font-semibold text-gray-500">
          {capitalizeFirstLetter(group.title)}
        </h3>

        <h2 className="text-sm font-serif font-semibold text-purple-400">
          {group.createdAt.toDateString()}
        </h2>
      </Box>
      <Box className="col-span-2 ml-3">
        <p className="text-base font-serif font-medium text-gray-500">
          Created By
        </p>
        <h2 className="text-xl font-serif font-semibold text-gray-500">
          {group.creator.name}
        </h2>
      </Box>
    </Grid>
  );
};

export default GroupCard;
