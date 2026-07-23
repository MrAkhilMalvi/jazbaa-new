
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <Navigate to="/" />;
};

export default Index;
