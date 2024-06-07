'use client'; // Mark this file as a client component

import { Provider } from 'react-redux';
import store from '@/store';

const ProviderWrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
