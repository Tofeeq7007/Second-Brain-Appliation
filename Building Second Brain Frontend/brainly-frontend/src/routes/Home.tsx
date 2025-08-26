import { createFileRoute, redirect } from '@tanstack/react-router'
import { CheckAuth } from '../api/user.api';
import Dashboard from '../Pages/Dashboard';

export const Route = createFileRoute('/Home')({
  beforeLoad: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw redirect({ to: '/' });
    console.log("Hi token + " + token);
    
    try {
      await CheckAuth(token);
    } catch {
      throw redirect({ to: '/' });
    }
  },
  component: Dashboard,
});
