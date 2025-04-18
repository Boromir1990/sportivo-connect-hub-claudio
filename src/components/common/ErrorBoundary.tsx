import React, { Component, ReactNode } from 'react';
import { ErrorType } from '@/types/errors.ts';
import ErrorDialog from './ErrorDialog';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: ErrorType | null;
}

class ErrorBoundaryComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: ErrorType) {
    return { hasError: true, error };
  }

  componentDidCatch(error: ErrorType, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorDialog />;
    }

    return this.props.children;
  }
}

export default ErrorBoundaryComponent;