import React from 'react';
import { Button } from 'react-bootstrap';
import { auth } from './firebase-config';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const history = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      history('/'); // Redirect to login page after signout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button variant="outline-danger" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
