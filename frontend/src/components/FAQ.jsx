import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How is HirePulse different from standard ATS resume checkers?',
      answer: 'Standard ATS tools rely on basic keyword matching that penalizes candidates for synonym differences or non-standard formatting. HirePulse uses a semantic language model to evaluate real engineering competency, project scope, architecture depth, and business impact. Even if you use slightly different terminology, HirePulse understands the underlying technology and matches you accurately.'
    },
    {
      question: 'Is my resume and career data kept private and secure?',
      answer: 'Yes, completely. Your resume, personal details, and career history are encrypted at rest and in transit using enterprise-grade TLS and AES-256 standards. We never sell candidate data to third-party recruiters or training datasets without explicit candidate consent.'
    },
    {
      question: 'How does HirePulse generate the personalized study notes and questions?',
      answer: 'When our engine identifies a gap between your credentials and a target job description, it maps the required competencies against our curated engineering curriculum. It then synthesizes high-yield architectural briefs, code snippets, trade-offs, and actual interview questions frequently asked by top tech employers.'
    },
    {
      question: 'Can I compare my resume against multiple different roles?',
      answer: 'Yes! You can maintain your master resume in HirePulse and run comparisons against multiple job descriptions—such as comparing your readiness for a Senior Frontend role versus a Full-Stack or Solutions Architect role—to determine where your highest interview odds lie.'
    },
    {
      question: 'Is HirePulse really free to get started?',
      answer: 'Yes, our Free Tier allows you to upload your resume, receive comprehensive role alignment breakdowns, and view your first personalized study sprints without entering a credit card.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#F5F1E8] border-t border-[#E8E2D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#69764B] bg-[#D6DDC5]/50 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#292C24] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#77786B]">
            Have questions about how HirePulse parses resumes or curates your study roadmap? Here is what you need to know.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E8E2D2] bg-white transition-all duration-200 overflow-hidden shadow-xs hover:border-[#69764B]/40"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#292C24]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#465238] text-[#D6DDC5] rotate-180' : 'bg-[#F5F1E8] text-[#77786B]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#77786B] leading-relaxed border-t border-[#F5F1E8] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
