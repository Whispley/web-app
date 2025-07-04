"use client";

import { useState } from "react";

export default function TestAuth() {
  const [authStatus, setAuthStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const initiateGoogleAuth = () => {
    setIsLoading(true);
    setAuthStatus("Redirecting to Google...");
    // Redirect to your Express server's Google auth endpoint
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  const clearStatus = () => {
    setAuthStatus("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Google Auth Test
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test your Google authentication flow
          </p>
        </div>

        <div className="space-y-6">
          {/* Auth Status Display */}
          {authStatus && (
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
              <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                {authStatus}
              </p>
            </div>
          )}

          {/* Google Auth Button */}
          <button
            onClick={initiateGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </button>

          {/* Clear Status Button */}
          {authStatus && (
            <button
              onClick={clearStatus}
              className="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 font-medium hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Clear Status
            </button>
          )}

          {/* Info Section */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Authentication Flow:
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>1. Initiate: GET /api/auth/google</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>2. Callback: GET /api/auth/google/callback</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>3. Redirect: /auth/callback?token=...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
