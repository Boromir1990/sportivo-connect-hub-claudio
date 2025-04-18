import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ErrorType } from '../types/errors';

interface ErrorContextProps {
  error: ErrorType | null;
  showError: (error: ErrorType) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextProps>({
  error: null,
  showError: () => {},
  clearError: () => {},
});

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<ErrorType | null>(null);

  const showError = (err: ErrorType) => {
    setError(err);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    error,
    showError,
    clearError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};