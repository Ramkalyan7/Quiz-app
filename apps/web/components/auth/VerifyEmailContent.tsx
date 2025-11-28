"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    VerifyEmail(token);
  }, [token]);

  const VerifyEmail = async (token: string) => {
    try {
      await axios.post("/api/auth/verifyemail", { token });
      setStatus("success");
      setMessage("Email Verified Successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus("error");
        setMessage(error.response?.data.error || "Verification failed");
      } else {
        setStatus("error");
        setMessage("something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          {status === "loading" && (
            <>
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-linear-to-r from-green-500 to-emerald-600 rounded-full animate-spin" 
                       style={{ 
                         background: 'conic-gradient(from 0deg, #10b981, #059669, #10b981)',
                         WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
                         maskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
                       }}>
                  </div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verifying Email</h1>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-green-400 to-green-600 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Success!</h1>
              <p className="text-gray-600 mb-6 font-medium text-lg">{message}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-green-50 rounded-lg px-4 py-3 border border-green-200">
                <svg className="animate-spin h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Redirecting to login in 3 seconds...
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-red-400 to-red-600 rounded-full mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Failed</h1>
              <p className="text-gray-600 mb-8">{message}</p>
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Go to Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex w-full items-center justify-center bg-white border-2 border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  Create New Account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailContent;
