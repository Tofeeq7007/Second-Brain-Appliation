import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
// import Dashboard from './Pages/Dashboard';

function App() {
const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    
    </QueryClientProvider>
  )
}

export default App
// 