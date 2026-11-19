import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  ArrowRight, 
  Compass, 
  BookOpen, 
  Award,
  Zap,
  Target
} from 'lucide-react';

export default function WhyHirePulse({ onOpenSignUp }) {
  const comparisonItems = [
    {
      feature: 'Keyword Matching',
      generic: 'Blindly counts keyword frequencies and exact string matches',
      hirepulse: 'Evaluates contextual seniority, applied technologies, and real impact'
    },
    {
      feature: 'Skill Gap Detection',
      generic: 'Lists missing words without context or hierarchy',
      hirepulse: 'Identifies critical blockers vs. secondary preferences with market weights'
    },
    {
      feature: 'Remediation & Growth',
      generic: 'Leaves you stuck with a random percentage score',
      hirepulse: 'Generates structured study guides, curated resources, and practice questions'
    },
    {
      feature: 'Interview Readiness',
      generic: 'Zero interview preparation or role-specific drills',
      hirepulse: 'Simulates targeted technical and behavioral Q&A tailored to target JD'
    }
  ];

  const pillars = [
    {
      title: 'Understand your actual job alignment',
      description: 'Forget opaque black-box rejections. HirePulse provides an explainable score showing exactly where your past projects meet the requirements and where clarification is needed.',
      icon: Target,
      tag: 'True Alignment'
    },
    {
      title: 'Discover skills you need to improve',
      description: 'Pinpoint precise technical blind spots before you interview. We highlight missing frameworks, cloud architectures, and methodologies with clear prioritization.',
      icon: Compass,
      tag: 'Gap Diagnostics'
    },
    {
      title: 'Receive personalized study recommendations',
      description: 'Curated technical reading lists, open-source repositories, and interactive tutorials selected to match your specific learning pace and background.',
      icon: Brain,
      tag: 'Curated Growth'
    },
    {
      title: 'Generate structured notes & practice questions',
      description: 'Get bite-sized AI executive summaries and tough interview questions designed to help you speak confidently during technical screens and architecture rounds.',
      icon: BookOpen,
      tag: 'Interview Mastery'
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F5F1E8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-xs font-bold tracking-widest uppercase text-[#69764B] bg-[#D6DDC5]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Why HirePulse
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292C24] tracking-tight mb-6">
            More than a resume analyzer.
          </h2>
          <p className="text-lg text-[#77786B] leading-relaxed">
            Most career tools stop at scoring your resume with superficial keyword checks. 
            HirePulse is an active career copilot designed to bridge the gap between where your credentials 
            stand today and the exact expectations of your dream position.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E8E2D2] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D6DDC5]/50 flex items-center justify-center text-[#465238] mb-6 group-hover:bg-[#465238] group-hover:text-[#D6DDC5] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#69764B] uppercase tracking-wider block mb-2">
                  {pillar.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#292C24] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#77786B] leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Showcase (Traditional ATS vs HirePulse) */}
        <div className="bg-[#E8E2D2]/50 border border-[#D6DDC5] rounded-3xl p-6 sm:p-10 lg:p-12 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-bold text-[#465238]">The Architectural Difference</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#292C24] mt-2 mb-3">
              Keyword Scanners vs. Career Intelligence
            </h3>
            <p className="text-sm text-[#77786B]">
              See how HirePulse delivers actionable mastery where conventional resume checkers fall short.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D6DDC5]">
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#77786B] w-1/4">Evaluation Layer</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#77786B] w-3/8">Traditional Resume Checkers</th>
                  <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider text-[#465238] bg-[#D6DDC5]/40 rounded-t-xl w-3/8">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#69764B]" />
                      HirePulse Intelligence
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D2]">
                {comparisonItems.map((item, i) => (
                  <tr key={i} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 px-4 text-sm font-bold text-[#292C24]">{item.feature}</td>
                    <td className="py-4 px-4 text-xs sm:text-sm text-[#77786B]">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item.generic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs sm:text-sm font-medium text-[#292C24] bg-[#D6DDC5]/20">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#69764B] shrink-0 mt-0.5" />
                        <span>{item.hirepulse}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Editorial Candidate Testimonial */}
        <div className="rounded-3xl bg-white border border-[#E8E2D2] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-1 text-[#69764B] mb-4">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-xs font-bold uppercase tracking-wider">Candidate Success Story</span>
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#292C24] leading-relaxed italic mb-6">
              "HirePulse showed me that my resume was technically strong, but missing two architectural terms required for Staff roles. The generated study notes on distributed caching gave me the exact talking points that aced my on-site loop."
            </p>
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Marcus Sterling" 
                className="w-12 h-12 rounded-full object-cover border border-[#D6DDC5]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#292C24]">Marcus Sterling</h4>
                <p className="text-xs text-[#77786B]">Staff Systems Engineer at Vercel (Formerly Senior Dev)</p>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center sm:items-start bg-[#F5F1E8] p-6 rounded-2xl border border-[#E8E2D2] text-center sm:text-left">
            <span className="text-3xl font-serif font-bold text-[#465238]">+35%</span>
            <span className="text-xs text-[#77786B] font-medium">Average compensation bump</span>
            <button
              onClick={onOpenSignUp}
              className="mt-4 px-5 py-2.5 bg-[#465238] hover:bg-[#69764B] text-white text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
            >
              <span>Start Your Free Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
