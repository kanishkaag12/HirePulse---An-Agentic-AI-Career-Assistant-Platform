import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function FinalCTA({ onOpenSignUp }) {
  return (
    <section className="py-24 md:py-32 bg-[#465238] text-[#F5F1E8] relative overflow-hidden">
      {/* Subtle organic decorative background rings */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#D6DDC5]/10 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-[#D6DDC5]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#69764B]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#69764B]/60 border border-[#D6DDC5]/30 text-xs font-semibold text-[#D6DDC5] tracking-wide mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#D6DDC5]" />
          <span>Unlock Your Career Potential Today</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F1E8] mb-6 leading-tight">
          Stop guessing. Start growing.
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-[#D6DDC5]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Take control of your career journey with AI-powered insights. 
          Discover your true job alignment, close skill gaps, and land interviews with confidence.
        </p>

        {/* Call-to-action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenSignUp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold bg-[#F5F1E8] text-[#292C24] hover:bg-[#D6DDC5] shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Create Your Free Account</span>
            <ArrowRight className="w-4 h-4 text-[#465238]" />
          </button>
        </div>

        {/* Value Trust Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#D6DDC5]/80 pt-6 border-t border-[#69764B]/50 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D6DDC5]" />
            <span>Free forever tier</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D6DDC5]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D6DDC5]" />
            <span>Strict data privacy</span>
          </div>
        </div>

      </div>
    </section>
  );
}
