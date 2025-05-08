/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastProvider} from './src/components/ToastContainer';
import {MetricsProvider} from './src/utilities/MetricsContext';
import TestShowCase from './src/screens/TestShowCase';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MetricsProvider>
        <ToastProvider>
          <TestShowCase />
        </ToastProvider>
      </MetricsProvider>
    </QueryClientProvider>
  );
};

export default App;
