import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RiRefreshLine, RiAlertLine } from '@remixicon/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <RiAlertLine size={24} className="text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-red-600 dark:text-red-400">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                An unexpected error occurred while rendering this component.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="text-left">
                  <details className="bg-muted p-3 rounded-md text-xs">
                    <summary className="cursor-pointer font-medium mb-2">
                      Error Details
                    </summary>
                    <div className="whitespace-pre-wrap break-all">
                      <strong>Error:</strong> {this.state.error.message}
                      {this.state.error.stack && (
                        <>
                          <br />
                          <strong>Stack:</strong>
                          <br />
                          {this.state.error.stack}
                        </>
                      )}
                      {this.state.errorInfo?.componentStack && (
                        <>
                          <br />
                          <strong>Component Stack:</strong>
                          <br />
                          {this.state.errorInfo.componentStack}
                        </>
                      )}
                    </div>
                  </details>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={this.handleRetry}
                  variant="outline"
                  size="sm"
                >
                  <RiRefreshLine size={16} className="mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.location.reload()}
                  size="sm"
                >
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  return React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} ref={ref} />
    </ErrorBoundary>
  ));
};