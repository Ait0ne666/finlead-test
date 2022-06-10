import {BrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import Router from './router/router';
import {ChakraProvider} from '@chakra-ui/react'


const queryClient = new QueryClient()


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Router/>
          </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
