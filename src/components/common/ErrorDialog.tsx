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

// Helper type guards (optional but good practice)
function isValidationError(error: ErrorType): error is ValidationError {
  return (error as ValidationError).errors !== undefined;
}

function isApiError(error: ErrorType): error is ApiError {
  return (error as ApiError).statusCode !== undefined;
}


const ErrorDialog: React.FC = () => {
  const { error, clearError } = useError();

  if (!error) {
    return null;
  }

  // Determine Title based on error type
  let title = 'An Error Occurred';
  if (isApiError(error)) {
    title = `Error ${error.statusCode}`;
  } else if (isValidationError(error)) {
    title = 'Validation Error';
  } else if (error instanceof Error) {
    // Optional: Handle generic Error title differently if needed
    // title = 'Application Error';
  }


  // Determine Description based on error type using type narrowing
  const getErrorMessage = (err: ErrorType): string => {
    if (isValidationError(err)) {
      // It's a ValidationError, safely access 'errors'
      return err.errors.join(', ');
    }
    // If it's not ValidationError, it must be ApiError or Error, both have 'message'
    // We can safely access 'message' here.
    // We also check if message exists and is not empty.
    if (err.message) {
      return err.message;
    }
    // Fallback if message is empty or somehow still undefined
    return 'An unknown error occurred.';
  };

  return (
      <AlertDialog open={!!error} onOpenChange={clearError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center justify-center">
            {/* Consider adding a more specific error icon if possible */}
            <img src="/placeholder.svg" alt="Error" className="w-48 h-48" />
            <AlertDialogDescription className="mt-4">
              {getErrorMessage(error)}
            </AlertDialogDescription>
          </div>
          <AlertDialogFooter>
            {/* Using clearError for both Cancel and Ok seems redundant,
              but keeping it as per original code unless specified otherwise.
              Usually Cancel would just close the dialog without action.
              The onOpenChange already handles clearing the error when closed.
           */}
            <AlertDialogCancel onClick={clearError}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearError}>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default ErrorDialog;