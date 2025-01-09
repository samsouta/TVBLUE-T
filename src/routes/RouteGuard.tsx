import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

interface RouteGuardProps {
  children: JSX.Element; // This is the component that should be protected
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const token = Cookies.get('token'); // Check if the token exists in cookies

  // If the token exists, allow the user to access the route
  if (token) {
    return <Navigate to="/" replace />; // Redirect logged-in users to the home page
  }

  // Otherwise, render the protected route
  return children;
};

export default RouteGuard;
