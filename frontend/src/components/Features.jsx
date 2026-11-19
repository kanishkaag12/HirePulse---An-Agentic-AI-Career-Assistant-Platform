import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileSearch, 
  Target, 
  Compass, 
  BookMarked, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  HelpCircle,
  Code,
  GraduationCap,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function Features({ onOpenSignUp }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'resume-analysis',
      title: 'AI Resume Analysis',
      subtitle: 'Deconstruct your career story with contextual precision',
      description: 'Extract skills, education, experience and projects. Understand your professional profile the way elite hiring teams and modern ATS algorithms do.',
      icon: FileSearch,
      highlight: 'Contextual Extraction',
      details: [
        'Multi-format parsing: PDF, DOCX, and LinkedIn imports',
        'Distinguishes core competencies from secondary technologies',
        'Measures quantifiable business impact and seniority signals'
      ],
      interactiveType: 'resume',
      tag: 'Foundation'
    },
    {
      id: 'job-matching',
      title: 'Smart Job Matching',
      subtitle: 'Explainable alignment that goes far beyond dumb keywords',
      description: 'Compare your resume with job descriptions. Get an explainable alignment score and discover matching requirements with clear breakdown rationale.',
      icon: Target,
      highlight: 'Explainable Score',
      details: [
        'Deep semantic similarity between your past impact and target role',
        'Weighted criteria: Required vs. Nice-to-Have expectations',
        'Domain and tech stack compatibility benchmarks'
      ],
      interactiveType: 'matching',
      tag: 'Benchmarking'
    },
    {
      id: 'skill-gap',
      title: 'Skill Gap Detection',
      subtitle: 'Pinpoint exactly where your profile falls short',
      description: 'Identify missing technical skills and understand where improvement is needed to clear recruiter screenings and technical interview loops.',
      icon: Compass,
      highlight: 'Gap Diagnostic',
      details: [
        'Categorized by priority: Critical Blocker vs. Value-Add skill',
        'Contextual insights explaining why the employer asks for it',
        'Industry benchmark trends for compensation impact'
      ],
      interactiveType: 'gap',
      tag: 'Diagnostics'
    },
    {
      id: 'personalized-learning',
      title: 'Personalized Learning',
      subtitle: 'Transform missing skills into interview mastery',
      description: 'Get relevant study resources, generate AI-powered study notes, and prepare for interviews with tailored practice questions based on your specific gaps.',
      icon: BookMarked,
      highlight: 'AI Study Engine',
      details: [
        'Tailored executive study summaries generated in seconds',
        'Curated technical articles, documentation links, and sandbox repos',
        'Mock behavioral and architecture interview questions'
      ],
      interactiveType: 'learning',
      tag: 'Acceleration'
    }
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#E8E2D2]/40 relative">
      {/* Decorative divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#D6DDC5] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest uppercase text-[#69764B] bg-[#D6DDC5]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Intelligent Career OS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292C24] tracking-tight mb-5">
            Everything you need to become job-ready.
          </h2>
          <p className="text-base sm:text-lg text-[#77786B] leading-relaxed">
            From parsing the nuanced impact of your past work to producing targeted study guides, 
            HirePulse delivers end-to-end intelligence for high-growth careers.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-[#F5F1E8] border border-[#E8E2D2] p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-[#69764B]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#465238] flex items-center justify-center text-[#D6DDC5] shadow-xs group-hover:scale-105 group-hover:bg-[#69764B] transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8E2D2] text-[#465238]">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="font-serif text-2xl font-bold text-[#292C24] mb-2 group-hover:text-[#465238] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-[#69764B] mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-sm text-[#77786B] leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>

                  {/* Key bullet points */}
                  <div className="space-y-2.5 pt-4 border-t border-[#E8E2D2]/80">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#292C24]">
                        <CheckCircle2 className="w-4 h-4 text-[#69764B] shrink-0 mt-0.5" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Interactive Micro-Card */}
                <div className="mt-8 pt-5 border-t border-[#E8E2D2]/60">
                  {feature.interactiveType === 'resume' && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#E8E2D2] text-xs">
                      <div className="flex items-center justify-between font-semibold text-[#292C24] mb-2">
                        <span>Extracted Profile Metrics</span>
                        <span className="text-[#69764B] text-[11px]">8 Core Skills • 4 Projects</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#D6DDC5]/40 text-[#465238] text-[11px]">Full-Stack Web</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#D6DDC5]/40 text-[#465238] text-[11px]">Distributed Systems</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#D6DDC5]/40 text-[#465238] text-[11px]">PostgreSQL</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#E8E2D2] text-[#77786B] text-[11px]">+5 more</span>
                      </div>
                    </div>
                  )}

                  {feature.interactiveType === 'matching' && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#E8E2D2] text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-[#292C24]">Alignment Breakdown</span>
                        <span className="font-bold text-[#465238]">91% Holistic</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#77786B] mt-2">
                        <div className="bg-[#F5F1E8] p-1.5 rounded-md">
                          <div className="font-bold text-[#292C24]">94%</div>
                          <div>Hard Skills</div>
                        </div>
                        <div className="bg-[#F5F1E8] p-1.5 rounded-md">
                          <div className="font-bold text-[#292C24]">88%</div>
                          <div>Seniority</div>
                        </div>
                        <div className="bg-[#F5F1E8] p-1.5 rounded-md">
                          <div className="font-bold text-[#292C24]">90%</div>
                          <div>Domain fit</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {feature.interactiveType === 'gap' && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#E8E2D2] text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#292C24]">Detected Technical Gaps</span>
                        <span className="text-amber-700 font-semibold text-[11px]">Action Required</span>
                      </div>
                      <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200/50 p-2 rounded-lg text-[11px]">
                        <span className="text-[#292C24] font-medium">GraphQL Schema Stitching</span>
                        <span className="text-amber-800 font-bold">Priority #1</span>
                      </div>
                    </div>
                  )}

                  {feature.interactiveType === 'learning' && (
                    <div className="bg-white/80 rounded-xl p-3.5 border border-[#E8E2D2] text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[#292C24]">AI Generated Study Brief</span>
                        <span className="text-[#69764B] font-semibold text-[11px]">Auto-Synced</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#465238] bg-[#D6DDC5]/30 p-2 rounded-lg">
                        <span>3 Core Concepts • 5 Mock Q&As</span>
                        <button 
                          onClick={onOpenSignUp}
                          className="font-bold text-[#465238] hover:underline"
                        >
                          Preview →
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#465238] group-hover:text-[#292C24] transition-colors">
                      {feature.highlight}
                    </span>
                    <button 
                      onClick={onOpenSignUp}
                      className="text-xs font-semibold text-[#69764B] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Try with your resume
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
