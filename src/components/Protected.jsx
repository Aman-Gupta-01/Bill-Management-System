import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('email');
    if (!login) {
      navigate('/login');
    }
  }, [navigate]); 

  return <Component />;
};

export default Protected;
