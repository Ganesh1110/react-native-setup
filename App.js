/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ToastScreen from './src/screens/ToastScreen';
import {ToastProvider} from './src/components/ToastContainer';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ToastScreen />
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
