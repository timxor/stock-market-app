import React from 'react';
import { Button } from 'react-bootstrap';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Redirect to login page after signout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="signout-button">
      <Button variant="link" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutButton;
