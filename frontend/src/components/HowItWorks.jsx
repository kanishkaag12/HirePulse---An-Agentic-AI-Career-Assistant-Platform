import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UploadCloud, 
  FileText, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Check, 
  TrendingUp, 
  BookOpen, 
  Cpu, 
  Sliders
} from 'lucide-react';

export default function HowItWorks({ onOpenSignUp }) {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Upload Your Resume',
      subtitle: 'Instant semantic breakdown',
      description: 'Upload your resume in PDF, DOCX, or text format. HirePulse reads between the lines—evaluating not just buzzwords, but your true scope, impact metrics, and foundational technical competencies.',
      icon: UploadCloud,
      visualBadge: 'Smart Extraction',
      details: [
        'Secure client-side document encryption',
        'Automatic recognition of technical stack & seniority',
        'Zero manual formatting required'
      ],
      previewSnippet: {
        title: 'Uploaded Document',
        meta: 'Resume_2026_Final.pdf (142 KB)',
        tags: ['Distributed Systems', 'Go / Node.js', 'System Architecture', 'Cloud Infrastructure']
      }
    },
    {
      step: '02',
      title: 'Add Your Target Job Description',
      subtitle: 'Paste JD or LinkedIn URL',
      description: 'Provide the job description for the role you desire. Our matching engine parses the underlying engineering requirements, team expectations, and core vs. secondary skills.',
      icon: Briefcase,
      visualBadge: 'Contextual Ingestion',
      details: [
        'Supports LinkedIn, Greenhouse, Lever, and raw text',
        'Separates hard requirements from aspirational criteria',
        'Calculates real-world hiring manager priorities'
      ],
      previewSnippet: {
        title: 'Target Position Parsed',
        meta: 'Principal Infrastructure Engineer @ CloudScale',
        tags: ['Kubernetes Operators', 'Zero-Downtime Migration', 'Observability', 'Go concurrency']
      }
    },
    {
      step: '03',
      title: 'Discover Your Potential & Build Roadmap',
      subtitle: 'Actionable intelligence & study guides',
      description: 'Instantly view your explainable match rating. HirePulse pinpoints the exact skills or experience descriptions you need to refine, and generates high-yield study notes with interview prep questions.',
      icon: Sparkles,
      visualBadge: 'Career Accelerated',
      details: [
        'Holistic alignment score with detailed reasoning',
        'Tailored study sprints with generated flash guides',
        'Interview practice questions with model answers'
      ],
      previewSnippet: {
        title: 'Roadmap Ready',
        meta: '87% Initial Match → 96% Projected After Sprint',
        tags: ['Study Guide: K8s Operators', '5 Interview Questions', 'Resume Revision Tips']
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F5F1E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest uppercase text-[#69764B] bg-[#D6DDC5]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Simple 3-Step Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292C24] tracking-tight mb-5">
            How HirePulse powers your next career leap.
          </h2>
          <p className="text-base sm:text-lg text-[#77786B] leading-relaxed">
            No convoluted setups or endless surveys. Get deep, personalized career intelligence in under two minutes.
          </p>
        </div>

        {/* Steps Connected Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-[#E8E2D2] -translate-y-12 z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedStep === index;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedStep(index)}
                className={`relative z-10 cursor-pointer rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-white shadow-xl border-2 border-[#69764B]' 
                    : 'bg-[#E8E2D2]/40 hover:bg-[#E8E2D2]/80 border border-[#D6DDC5]'
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif text-lg font-bold transition-colors ${
                      isSelected 
                        ? 'bg-[#465238] text-[#D6DDC5]' 
                        : 'bg-white text-[#465238] shadow-xs'
                    }`}>
                      {item.step}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-[#D6DDC5]/40 flex items-center justify-center text-[#465238]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title & Subtitle */}
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#69764B]">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#292C24] mt-1 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#77786B] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Details bullets */}
                  <div className="space-y-2 mb-6">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#292C24]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#69764B]"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Mini Card */}
                <div className="mt-4 pt-4 border-t border-[#E8E2D2] bg-[#F5F1E8]/70 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[#292C24] mb-1">
                    <span>{item.previewSnippet.title}</span>
                    <span className="text-[10px] text-[#69764B] font-semibold">{item.visualBadge}</span>
                  </div>
                  <p className="text-[11px] text-[#77786B] mb-2 font-mono truncate">{item.previewSnippet.meta}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.previewSnippet.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#E8E2D2] text-[#465238]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Action Callout Under Steps */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#E8E2D2]/60 border border-[#D6DDC5] p-3 sm:p-2 sm:pr-4 rounded-3xl sm:rounded-full">
            <div className="px-4 py-1.5 bg-[#465238] text-[#D6DDC5] text-xs font-semibold rounded-full">
              Ready to test?
            </div>
            <p className="text-xs sm:text-sm text-[#292C24] font-medium">
              Start with your existing resume — no credit card needed.
            </p>
            <button
              onClick={onOpenSignUp}
              className="px-4 py-2 bg-[#69764B] hover:bg-[#465238] text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
            >
              <span>Analyze Resume Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
