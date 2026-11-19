import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Sparkles, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signup' }) {
  const [mode, setMode] = useState(initialMode); // 'signup' | 'signin'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setErrors({});
    setIsSubmitted(false);
    setLoading(false);
  }, [initialMode, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (mode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate frontend validation & processing
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  const resetForm = (newMode) => {
    setMode(newMode);
    setErrors({});
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#292C24]/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-md bg-[#F5F1E8] rounded-3xl shadow-2xl border border-[#E8E2D2] overflow-hidden z-10 p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#77786B] hover:text-[#292C24] hover:bg-[#E8E2D2] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#465238] flex items-center justify-center text-[#D6DDC5] mx-auto mb-3 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#292C24]">
            {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-[#77786B] mt-1">
            {mode === 'signup'
              ? 'Join 45,000+ engineers mastering career opportunities'
              : 'Sign in to access your resumes and tailored study notes'}
          </p>
        </div>

        {/* Success Confirmation State */}
        {isSubmitted ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#292C24] mb-2">
              {mode === 'signup' ? 'Welcome to HirePulse!' : 'Signed in successfully!'}
            </h4>
            <p className="text-sm text-[#77786B] mb-6">
              {mode === 'signup'
                ? 'Your free candidate account has been prepared. You can now analyze resumes and generate study notes.'
                : 'Redirecting to your active career intelligence session...'}
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#69764B] hover:bg-[#465238] text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
            >
              Continue to Landing Page
            </button>
          </div>
        ) : (
          /* Form Elements */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#292C24] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#77786B]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-[#292C24] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-[#E8E2D2] focus:border-[#69764B]'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#292C24] mb-1">
                Work or Personal Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#77786B]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-[#292C24] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-[#E8E2D2] focus:border-[#69764B]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#292C24]">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link will be sent to your email.')}
                    className="text-[11px] font-semibold text-[#69764B] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#77786B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border bg-white text-sm text-[#292C24] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                    errors.password ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-[#E8E2D2] focus:border-[#69764B]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#77786B] hover:text-[#292C24]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#292C24] mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#77786B]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat password"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm text-[#292C24] placeholder-[#77786B]/60 focus:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-rose-400 focus:ring-1 focus:ring-rose-400' : 'border-[#E8E2D2] focus:border-[#69764B]'
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            )}

            {/* Sign In Remember Me */}
            {mode === 'signin' && (
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#69764B] focus:ring-[#69764B] border-[#E8E2D2] rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-xs text-[#77786B]">
                  Remember this device for 30 days
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-[#69764B] hover:bg-[#465238] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : mode === 'signup' ? (
                <span>Create Free Account</span>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>

            {/* Switch Mode Footer */}
            <div className="text-center pt-3 text-xs text-[#77786B]">
              {mode === 'signup' ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => resetForm('signin')}
                    className="font-bold text-[#465238] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  New to HirePulse?{' '}
                  <button
                    type="button"
                    onClick={() => resetForm('signup')}
                    className="font-bold text-[#465238] hover:underline cursor-pointer"
                  >
                    Create Free Account
                  </button>
                </span>
              )}
            </div>

          </form>
        )}

      </motion.div>
    </div>
  );
}
