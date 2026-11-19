import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Layers, 
  TrendingUp, 
  Star, 
  Award,
  ChevronRight,
  FileText,
  Compass
} from 'lucide-react';

export default function Hero({ onOpenSignUp }) {
  const [activeTab, setActiveTab] = useState('match');

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const elem = document.querySelector('#features');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle organic background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D6DDC5]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#E8E2D2]/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-Actions */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8E2D2] border border-[#D6DDC5] text-xs font-semibold text-[#465238] tracking-wide mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#69764B] animate-pulse"></span>
              <span>Next-Gen Career Intelligence</span>
              <span className="text-[#77786B] font-normal">•</span>
              <span className="text-[#69764B]">v2.4 Live</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#292C24] leading-[1.12] mb-6">
              Your next opportunity starts with{' '}
              <span className="italic font-serif text-[#465238] relative inline-block">
                knowing your potential
                <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#D6DDC5]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" stroke="#69764B" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#77786B] leading-relaxed max-w-2xl mb-8 font-normal">
              Turn your resume into a roadmap for success. Discover your job alignment, 
              identify skill gaps and get personalized learning recommendations with 
              <span className="font-semibold text-[#292C24]"> HirePulse AI</span>.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenSignUp}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-medium bg-[#69764B] hover:bg-[#465238] text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Started – Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToFeatures}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-medium text-[#465238] bg-[#E8E2D2]/70 hover:bg-[#E8E2D2] border border-[#D6DDC5] transition-all duration-200"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Proof & Metrics */}
            <div className="pt-6 border-t border-[#E8E2D2] w-full max-w-xl flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  <img className="w-9 h-9 rounded-full border-2 border-[#F5F1E8] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" alt="User avatar" />
                  <img className="w-9 h-9 rounded-full border-2 border-[#F5F1E8] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" alt="User avatar" />
                  <img className="w-9 h-9 rounded-full border-2 border-[#F5F1E8] object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80" alt="User avatar" />
                  <div className="w-9 h-9 rounded-full border-2 border-[#F5F1E8] bg-[#465238] text-[#D6DDC5] text-xs font-semibold flex items-center justify-center">
                    +45k
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-amber-600 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-xs font-bold text-[#292C24] ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs text-[#77786B]">From 45,000+ candidate analyses</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#D6DDC5]/40 text-[#465238]">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-[#292C24]">92% Interview Rate</div>
                  <div className="text-[#77786B]">for aligned recommendations</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium AI Resume Dashboard Mockup */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ambient glow container */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-[#E8E2D2] transition-all">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F1E8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8E2D2] flex items-center justify-center text-[#465238] font-bold text-sm">
                      EJ
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#292C24]">Elena Vance</h4>
                      <p className="text-[11px] text-[#77786B]">Lead Frontend Engineer • 6 YOE</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#D6DDC5]/60 text-[#465238]">
                    <Sparkles className="w-3 h-3" />
                    AI Match Complete
                  </span>
                </div>

                {/* Target Role & Match Gauge */}
                <div className="my-4 p-4 rounded-2xl bg-[#F5F1E8]/70 border border-[#E8E2D2] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#77786B]">Target Position</span>
                    <h5 className="font-serif font-bold text-base text-[#292C24]">Staff UI Architect</h5>
                    <p className="text-xs text-[#69764B] font-medium">Stripe / Enterprise Platform</p>
                  </div>
                  
                  {/* Gauge */}
                  <div className="relative flex items-center justify-center w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#E8E2D2]"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#69764B]"
                        strokeDasharray="88, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-xs font-bold text-[#292C24]">88%</span>
                      <span className="text-[8px] text-[#77786B] uppercase font-semibold">Match</span>
                    </div>
                  </div>
                </div>

                {/* Tab Switcher for Interactive Showcase */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-[#E8E2D2]/50 rounded-xl mb-4 text-xs font-medium text-[#77786B]">
                  <button 
                    onClick={() => setActiveTab('match')}
                    className={`py-1.5 rounded-lg transition-all ${activeTab === 'match' ? 'bg-white text-[#292C24] font-semibold shadow-xs' : 'hover:text-[#292C24]'}`}
                  >
                    Skills Match
                  </button>
                  <button 
                    onClick={() => setActiveTab('gaps')}
                    className={`py-1.5 rounded-lg transition-all ${activeTab === 'gaps' ? 'bg-white text-[#292C24] font-semibold shadow-xs' : 'hover:text-[#292C24]'}`}
                  >
                    Skill Gaps (2)
                  </button>
                  <button 
                    onClick={() => setActiveTab('notes')}
                    className={`py-1.5 rounded-lg transition-all ${activeTab === 'notes' ? 'bg-white text-[#292C24] font-semibold shadow-xs' : 'hover:text-[#292C24]'}`}
                  >
                    Study Plan
                  </button>
                </div>

                {/* Tab Content Display */}
                <div className="min-h-[160px]">
                  {activeTab === 'match' && (
                    <div className="space-y-2.5 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs font-medium text-[#292C24]">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#69764B]" />
                          React 19 & Concurrent Rendering
                        </span>
                        <span className="text-[#69764B] font-bold text-[11px]">96% match</span>
                      </div>
                      <div className="w-full bg-[#F5F1E8] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#69764B] h-full rounded-full w-[96%]"></div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-medium text-[#292C24] pt-1">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#69764B]" />
                          TypeScript & Domain Architecture
                        </span>
                        <span className="text-[#69764B] font-bold text-[11px]">92% match</span>
                      </div>
                      <div className="w-full bg-[#F5F1E8] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#69764B] h-full rounded-full w-[92%]"></div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-medium text-[#292C24] pt-1">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#69764B]" />
                          High-Yield Web Vitals Optimization
                        </span>
                        <span className="text-[#69764B] font-bold text-[11px]">85% match</span>
                      </div>
                      <div className="w-full bg-[#F5F1E8] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#69764B] h-full rounded-full w-[85%]"></div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'gaps' && (
                    <div className="space-y-2.5 animate-fadeIn">
                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-[#292C24]">Distributed State Replication</div>
                            <p className="text-[11px] text-[#77786B]">Target asks for CRDTs & Offline sync</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">High Priority</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-[#292C24]">Micro-Frontend Module Federation</div>
                            <p className="text-[11px] text-[#77786B]">Not detected in uploaded resume</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">Medium</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notes' && (
                    <div className="p-3 rounded-xl bg-[#F5F1E8] border border-[#E8E2D2] animate-fadeIn">
                      <div className="flex items-center gap-2 mb-1.5">
                        <BookOpen className="w-4 h-4 text-[#465238]" />
                        <span className="text-xs font-bold text-[#292C24]">Generated Sprint: 4 hr Micro-Prep</span>
                      </div>
                      <p className="text-[11px] text-[#77786B] leading-relaxed mb-2.5">
                        Review concise flash notes on CRDTs & Module Federation with 5 target interview questions.
                      </p>
                      <button 
                        onClick={onOpenSignUp}
                        className="w-full py-1.5 text-center text-xs font-semibold bg-[#465238] text-white rounded-lg hover:bg-[#69764B] transition-colors"
                      >
                        Read Study Notes (PDF Ready)
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Insight Notification Pill */}
                <div className="mt-4 pt-3 border-t border-[#F5F1E8] flex items-center justify-between text-[11px] text-[#77786B]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Explainable AI analysis powered by HirePulse
                  </span>
                  <span className="font-semibold text-[#465238]">Confidence: 97%</span>
                </div>

              </div>

              {/* Floating Decorative Elements */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white py-2.5 px-4 rounded-2xl shadow-xl border border-[#E8E2D2] items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D6DDC5] flex items-center justify-center text-[#465238]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#292C24]">Top 8% Candidate</div>
                  <div className="text-[10px] text-[#77786B]">Matched to Senior Roles</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white py-2 px-3.5 rounded-2xl shadow-lg border border-[#E8E2D2] items-center gap-2">
                <FileText className="w-4 h-4 text-[#69764B]" />
                <span className="text-xs font-semibold text-[#292C24]">Resume Parsed: 1.2s</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
