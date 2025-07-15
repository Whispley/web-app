"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const [authData, setAuthData] = useState<{
    token?: string;
    refreshToken?: string;
    error?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    setAuthData({
      token: token || undefined,
      refreshToken: refreshToken || undefined,
      error: error || undefined,
    });
    setIsLoading(false);
  }, [searchParams]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`${type} copied to clipboard!`);
  };

  // Check if we have actual auth data
  const hasAuthData = authData.token || authData.refreshToken;
  const hasError = authData.error;
  const isEmpty = !hasAuthData && !hasError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Processing authentication...
          </span>
        </div>
      </div>
    );
  }

  // Show empty state if no data
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Authentication Data
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This page expects authentication tokens from your Google OAuth flow.
          </p>
          <div className="space-y-3">
            <Link
              href="/test-auth"
              className="block w-full bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition-colors"
            >
              Start Google Auth Test
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg px-6 py-3 font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                hasError
                  ? "bg-gradient-to-r from-red-500 to-pink-600"
                  : "bg-gradient-to-r from-green-500 to-emerald-600"
              }`}
            >
              {hasError ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {hasError ? "Authentication Failed" : "Authentication Successful"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {hasError
                ? "There was an issue with your authentication"
                : "You have been successfully authenticated"}
            </p>
          </div>

          {hasError ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Error Details
              </h3>
              <p className="text-red-700 dark:text-red-300 font-mono text-sm bg-red-100 dark:bg-red-900/30 p-3 rounded">
                {authData.error}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Access Token */}
              {authData.token && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Access Token
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(authData.token!, "Access Token")
                      }
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded font-mono text-sm break-all">
                    {authData.token}
                  </div>
                </div>
              )}

              {/* Refresh Token */}
              {authData.refreshToken && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                      Refresh Token
                    </h3>
                    <button
                      onClick={() =>
                        copyToClipboard(authData.refreshToken!, "Refresh Token")
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded font-mono text-sm break-all">
                    {authData.refreshToken}
                  </div>
                </div>
              )}

              {/* Token Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Token Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Token Type:
                    </span>
                    <span className="ml-2 text-gray-800 dark:text-gray-200">
                      Bearer
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Received At:
                    </span>
                    <span className="ml-2 text-gray-800 dark:text-gray-200">
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Status:
                    </span>
                    <span className="ml-2 text-green-600 dark:text-green-400">
                      Active
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Source:
                    </span>
                    <span className="ml-2 text-gray-800 dark:text-gray-200">
                      Google OAuth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <Link
              href="/test-auth"
              className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-3 font-medium text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Test Again
            </Link>
            <Link
              href="/"
              className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg px-6 py-3 font-medium text-center hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Loading authentication data...
        </span>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
