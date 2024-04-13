import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /cabinets
    navigate('/cabinets');
  }, [navigate]); // Dependency array ensures effect runs once

  return null; // Render nothing
}

export default Index;
