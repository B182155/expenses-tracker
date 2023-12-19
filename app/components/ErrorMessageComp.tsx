import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

const ErrorMessageComp = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div>
      <Text
        color="red"
        as="p"
        mb="2"
      >
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessageComp;
