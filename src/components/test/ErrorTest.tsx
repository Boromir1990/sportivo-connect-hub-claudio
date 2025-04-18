import React from 'react';
import { useError } from '@/context/ErrorContext';

export const ErrorTest: React.FC = () => {
  const { showError } = useError();

  const handleClick = () => {
    showError(new Error('This is a test error.'));
  };

  return (
    <button onClick={handleClick}>Throw Error</button>
  );
};