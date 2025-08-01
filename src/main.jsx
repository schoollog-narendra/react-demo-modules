import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
