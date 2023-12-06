import { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;