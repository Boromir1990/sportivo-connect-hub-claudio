import React from 'react';
import { useError } from '@/context/ErrorContext';
import { ApiError, ErrorType, ValidationError } from '@/types/errors';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ErrorDialog: React.FC = () => {
  const { error, clearError } = useError();

  if (!error) {
    return null;
  }

  let title = 'An Error Occurred';
  if (error) {
    if ((error as ApiError).statusCode) {
      title = `Error ${(error as ApiError).statusCode}`;
    } else if ((error as ValidationError).errors) {
      title = 'Validation Error';
    }
  }

  return (
    <AlertDialog open={!!error} onOpenChange={clearError}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col items-center justify-center">
          <img src="/placeholder.svg" alt="Error" className="w-48 h-48" />
          <AlertDialogDescription className="mt-4">
            {error.message ||
              (error as ValidationError).errors?.join(', ') ||
              'An unknown error occurred.'}
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clearError}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorDialog;