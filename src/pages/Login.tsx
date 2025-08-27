import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckSquare, Mail, Lock, User, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Password reset email sent! Check your inbox.');
      setShowForgotPassword(false);
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (showForgotPassword) {
        await handleForgotPassword(e);
        return;
      } else if (isSignUp) {
        await signUp(email, password, name);
        toast.success('Account created successfully! Please check your email to verify your account.');
      } else {
        await signIn(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 text-indigo-600">
              <CheckSquare className="h-12 w-12" />
              <span className="text-3xl font-bold">BoltFlow</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {showForgotPassword 
              ? 'Reset your password' 
              : isSignUp 
                ? 'Create your account' 
                : 'Welcome back'}
          </h2>
          <p className="mt-2 text-gray-600">
            {showForgotPassword 
              ? 'Enter your email to receive a password reset link'
              : isSignUp 
                ? 'Start your productivity journey' 
                : 'Sign in to your account'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && !showForgotPassword && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {!showForgotPassword && (
              <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {showForgotPassword 
                    ? 'Sending Reset Email...' 
                    : isSignUp 
                      ? 'Creating Account...' 
                      : 'Signing In...'}
                </div>
              ) : (
                showForgotPassword 
                  ? 'Send Reset Email' 
                  : isSignUp 
                    ? 'Create Account' 
                    : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {!showForgotPassword && !isSignUp && (
              <button
                onClick={() => setShowForgotPassword(true)}
                className="flex items-center justify-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors mx-auto"
              >
                <KeyRound className="h-4 w-4" />
                <span>Forgot your password?</span>
              </button>
            )}
            
            <button
              onClick={() => {
                if (showForgotPassword) {
                  setShowForgotPassword(false);
                } else {
                  setIsSignUp(!isSignUp);
                }
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              {showForgotPassword 
                ? 'Back to sign in' 
                : isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}