import React, { Component } from 'react';

// ErrorBoundary Component to catch any rendering errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details (can also send to logging services)
    this.setState({ error, errorInfo });
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI when an error occurs
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto text-center">
            <h1 className="text-3xl font-bold text-red-600">Something went wrong</h1>
            <p className="text-gray-600 mt-4">{this.state.error && this.state.error.toString()}</p>
            <p className="text-gray-500 mt-2">{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // If no error, render the child components
    return this.props.children;
  }
}

export default ErrorBoundary;
