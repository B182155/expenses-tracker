import React from 'react';
import { Provider } from 'react-redux';
import store from '@/lib/store';

import { PropsWithChildren } from 'react';
const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
