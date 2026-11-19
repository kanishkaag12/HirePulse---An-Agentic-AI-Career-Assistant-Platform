import React from 'react';
import { ArrowUpRight, Mail, Globe, Send } from 'lucide-react';

export default function Footer({ onOpenSignUp }) {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#292C24] text-[#E8E2D2] pt-16 pb-12 border-t border-[#465238]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#465238]/60">
          
          {/* Brand Info (2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#465238] flex items-center justify-center text-[#D6DDC5] shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h4l3-8 4 16 3-8h4" />
                </svg>
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-tight">
                HirePulse
              </span>
            </div>

            <p className="text-sm text-[#77786B] max-w-sm leading-relaxed">
              HirePulse is an AI-powered recruitment and career intelligence platform. 
              We empower candidates to evaluate resume alignment, identify skill gaps, and master technical interviews with personalized learning roadmaps.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {/* X / Twitter */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="HirePulse on X (Twitter)"
                className="w-8 h-8 rounded-full bg-[#465238]/60 hover:bg-[#69764B] flex items-center justify-center text-[#D6DDC5] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="HirePulse on LinkedIn"
                className="w-8 h-8 rounded-full bg-[#465238]/60 hover:bg-[#69764B] flex items-center justify-center text-[#D6DDC5] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="HirePulse on GitHub"
                className="w-8 h-8 rounded-full bg-[#465238]/60 hover:bg-[#69764B] flex items-center justify-center text-[#D6DDC5] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77786B]">
              <li>
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="hover:text-[#D6DDC5] transition-colors">
                  AI Resume Parser
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="hover:text-[#D6DDC5] transition-colors">
                  Alignment Engine
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="hover:text-[#D6DDC5] transition-colors">
                  Skill Gap Matrix
                </a>
              </li>
              <li>
                <a href="#learning-hub" onClick={(e) => scrollToSection(e, '#learning-hub')} className="hover:text-[#D6DDC5] transition-colors">
                  Study Note Generator
                </a>
              </li>
              <li>
                <button onClick={onOpenSignUp} className="text-[#D6DDC5] hover:underline flex items-center gap-1 cursor-pointer">
                  Candidate Portal <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77786B]">
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="hover:text-[#D6DDC5] transition-colors">
                  Contextual ATS Audit
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollToSection(e, '#how-it-works')} className="hover:text-[#D6DDC5] transition-colors">
                  Multi-JD Benchmarking
                </a>
              </li>
              <li>
                <a href="#learning-hub" onClick={(e) => scrollToSection(e, '#learning-hub')} className="hover:text-[#D6DDC5] transition-colors">
                  Interview Practice Q&A
                </a>
              </li>
              <li>
                <a href="#learning-hub" onClick={(e) => scrollToSection(e, '#learning-hub')} className="hover:text-[#D6DDC5] transition-colors">
                  Tech Curriculum Sprints
                </a>
              </li>
              <li>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-[#465238] text-[#D6DDC5]">
                  API Coming Soon
                </span>
              </li>
            </ul>
          </div>

          {/* About & Trust Column */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#77786B]">
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-[#D6DDC5] transition-colors">
                  About Our Mission
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-[#D6DDC5] transition-colors">
                  Career Coaches
                </a>
              </li>
              <li>
                <a href="mailto:support@hirepulse.ai" className="hover:text-[#D6DDC5] transition-colors flex items-center gap-1">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("HirePulse prioritizes candidate privacy: all resumes are strictly encrypted with AES-256."); }} className="hover:text-[#D6DDC5] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("HirePulse Terms of Service: Designed to empower candidates transparently."); }} className="hover:text-[#D6DDC5] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#77786B]">
          <p>
            © {new Date().getFullYear()} HirePulse AI Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </span>
            <span className="hidden sm:inline text-[#465238]">•</span>
            <span>Crafted for high-growth talent</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
