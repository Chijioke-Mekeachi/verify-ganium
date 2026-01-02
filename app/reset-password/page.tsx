'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase/client';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle, FiShield, FiLoader } from 'react-icons/fi';
import { MdSecurity } from 'react-icons/md';

// Password validation schema
const passwordSchema = z.object({
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Must contain at least one number' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Get token from URL
  const accessToken = searchParams.get('access_token');

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const password = watch('password', '');

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    if (password.length >= 10) strength += 1;

    setPasswordStrength(Math.min(strength, 5));
  }, [password]);

  // Check for valid token on mount
  useEffect(() => {
    if (!accessToken) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [accessToken]);

  const onSubmit = async (data: PasswordFormData) => {
    if (!accessToken) {
      setError('Invalid reset token');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push('/login');
      }, 3000);

    } catch (err: any) {
      console.error('Password reset error:', err);
      
      // Handle specific error cases
      if (err.message.includes('invalid')) {
        setError('Invalid or expired reset token. Please request a new password reset link.');
      } else if (err.message.includes('weak')) {
        setError('Password is too weak. Please choose a stronger password.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Get password strength color and label
  const getStrengthInfo = () => {
    const colors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-yellow-400', 'bg-green-500', 'bg-green-600'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return {
      color: colors[passwordStrength],
      label: labels[passwordStrength],
      width: `${(passwordStrength / 5) * 100}%`
    };
  };

  const strengthInfo = getStrengthInfo();

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <FiAlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-6">
              The password reset link is invalid or has expired. Please request a new password reset email.
            </p>
            <button
              onClick={() => router.push('/forgot-password')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              Request New Reset Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-lg mb-6">
            <MdSecurity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Set New Password</h1>
          <p className="text-gray-600">
            Create a strong, secure password for your account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Message */}
          {success && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-green-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Password Updated!</h3>
                  <p className="text-sm text-green-600 mt-1">
                    Your password has been changed successfully. Redirecting to login...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 border-b border-red-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Reset Failed</h3>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {/* New Password */}
            <div className="mb-6">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <FiLock className="w-4 h-4 mr-2 text-green-600" />
                New Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter new password"
                  disabled={success || loading}
                />
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">Password Strength</span>
                    <span className={`text-xs font-bold ${strengthInfo.color.replace('bg-', 'text-')}`}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strengthInfo.color} transition-all duration-500 ease-out`}
                      style={{ width: strengthInfo.width }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                <FiLock className="w-4 h-4 mr-2 text-green-600" />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                  disabled={success || loading}
                />
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-xl p-5 mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <FiShield className="w-4 h-4 mr-2 text-green-600" />
                Password Requirements:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${password.length >= 6 ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                    {password.length >= 6 ? <FiCheck className="w-3 h-3" /> : '•'}
                  </span>
                  <span className={password.length >= 6 ? 'text-green-600' : 'text-gray-600'}>
                    At least 6 characters
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${/[A-Z]/.test(password) ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                    {/[A-Z]/.test(password) ? <FiCheck className="w-3 h-3" /> : '•'}
                  </span>
                  <span className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                    At least one uppercase letter
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${/[0-9]/.test(password) ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                    {/[0-9]/.test(password) ? <FiCheck className="w-3 h-3" /> : '•'}
                  </span>
                  <span className={/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                    At least one number
                  </span>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-green-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Password...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center">
                  <FiCheck className="w-5 h-5 mr-2" />
                  Password Updated ✓
                </span>
              ) : (
                'Update Password'
              )}
            </button>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-start space-x-3">
                <FiShield className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Secure connection:</span> All passwords are encrypted with AES-256 encryption for maximum security.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/login')}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FiLoader className="w-8 h-8 text-gray-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
            <p className="text-gray-600">
              Verifying your reset link, please wait.
            </p>
          </div>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}