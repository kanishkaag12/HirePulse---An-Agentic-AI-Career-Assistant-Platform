import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Copy, 
  Check, 
  ArrowRight,
  Code2,
  FileCheck2,
  BrainCircuit
} from 'lucide-react';

export default function LearningHub({ onOpenSignUp }) {
  const [selectedTopic, setSelectedTopic] = useState('distributed');
  const [revealedAnswer, setRevealedAnswer] = useState(null);
  const [copied, setCopied] = useState(false);

  const topics = [
    {
      id: 'distributed',
      name: 'Distributed Systems & Caching',
      badge: 'Systems & Backend',
      readTime: '6 min study sprint',
      summary: 'Architectural patterns for cache invalidation, Redis cluster sharding, and high-concurrency consistency models.',
      keyTakeaways: [
        'Cache-Aside vs. Write-Through: Trade-offs in write latency and data staleness.',
        'Thundering Herd Mitigation: Probabilistic early expiration (XFetch) and distributed mutexes.',
        'Two-Phase Commit vs Sagas: Eventual consistency models in modern microservices.'
      ],
      sampleQuestion: 'How would you architect a cache invalidation strategy for a globally distributed e-commerce catalog with 10M RPM?',
      sampleAnswer: 'Adopt a Cache-Aside pattern combined with CDC (Change Data Capture) via Debezium and Kafka. Use soft TTLs with probabilistic early refresh to prevent thundering herds, and edge caching (CDN) for static assets with cache-tags.'
    },
    {
      id: 'frontend',
      name: 'React 19 & Server Components',
      badge: 'Frontend Architecture',
      readTime: '4 min study sprint',
      summary: 'Deep dive into asynchronous actions, optimistic UI updates, and streaming SSR architecture.',
      keyTakeaways: [
        'useActionState & useOptimistic: Eliminating manual loading & error state boilerplate.',
        'React Server Components (RSC): Zero-bundle-size dependencies on the client boundary.',
        'Suspense Boundaries: Selective hydration and waterfall elimination.'
      ],
      sampleQuestion: 'Explain the conceptual difference between client component state and server action execution in React 19.',
      sampleAnswer: 'Server actions are endpoints executed on the server, invokable via form action or transitions without writing explicit API routes. Client component state remains localized in the browser VDOM while server actions trigger server re-render passes.'
    },
    {
      id: 'database',
      name: 'PostgreSQL Indexing & Optimization',
      badge: 'Data & Performance',
      readTime: '5 min study sprint',
      summary: 'Index types, execution plan analysis (EXPLAIN ANALYZE), and table partitioning strategies for scaling writes.',
      keyTakeaways: [
        'B-Tree vs BRIN Indexes: When sequential time-series data saves 90% memory with BRIN.',
        'Covering Indexes (INCLUDE): Satisfying index-only scans without expanding the index key size.',
        'Dead Tuples & Vacuum Tuning: Preventing table bloat in write-heavy transactional tables.'
      ],
      sampleQuestion: 'When would you choose a Partial Index over an unconstrained B-Tree index, and what are the limitations?',
      sampleAnswer: 'Partial indexes index only rows matching a WHERE clause (e.g., WHERE status = "pending"). They drastically reduce disk size and buffer pool consumption when queries target a skewed subset of data, but cannot satisfy queries with different WHERE predicates.'
    }
  ];

  const currentTopic = topics.find(t => t.id === selectedTopic) || topics[0];

  const handleCopyNotes = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAnswer = (id) => {
    setRevealedAnswer(revealedAnswer === id ? null : id);
  };

  return (
    <section id="learning-hub" className="py-24 md:py-32 bg-[#E8E2D2]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#69764B] bg-[#D6DDC5]/60 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Interactive Learning Hub
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#292C24] tracking-tight mb-5">
            Turn skill gaps into interview advantages.
          </h2>
          <p className="text-base sm:text-lg text-[#77786B] leading-relaxed">
            Whenever HirePulse discovers a mismatch between your resume and target role, 
            it automatically generates concise, high-yield study notes and mock interview questions.
          </p>
        </div>

        {/* Interactive Workspace Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Topic selector sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#77786B] px-1 mb-2">
              Select Sample Gap Topic
            </h4>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setRevealedAnswer(null);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                  selectedTopic === topic.id
                    ? 'bg-white border-[#69764B] shadow-md ring-1 ring-[#69764B]/20'
                    : 'bg-[#F5F1E8] border-[#E8E2D2] hover:bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#69764B] bg-[#D6DDC5]/40 px-2 py-0.5 rounded-md">
                    {topic.badge}
                  </span>
                  <span className="text-[11px] text-[#77786B] font-medium">{topic.readTime}</span>
                </div>
                <h5 className="font-bold text-sm text-[#292C24] mb-1">{topic.name}</h5>
                <p className="text-xs text-[#77786B] line-clamp-2">{topic.summary}</p>
              </button>
            ))}

            <div className="p-4 rounded-2xl bg-[#D6DDC5]/40 border border-[#D6DDC5] mt-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#465238] mb-1">
                <BrainCircuit className="w-4 h-4" />
                <span>Need custom notes for your target role?</span>
              </div>
              <p className="text-xs text-[#77786B] mb-3">
                HirePulse customizes flash notes dynamically for any tech stack or company.
              </p>
              <button
                onClick={onOpenSignUp}
                className="w-full py-2 bg-[#465238] hover:bg-[#69764B] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Generate For My Resume
              </button>
            </div>
          </div>

          {/* Generated Study Guide & Q&A Canvas */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E8E2D2] p-6 sm:p-8 shadow-sm">
            
            {/* Guide Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F5F1E8]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#69764B] bg-[#D6DDC5]/40 px-2.5 py-0.5 rounded-md">
                    AI Study Note • Generated for Candidate
                  </span>
                  <span className="text-xs text-[#77786B]">• 98% Relevance</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#292C24]">
                  {currentTopic.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyNotes}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8E2D2] hover:bg-[#F5F1E8] text-xs font-medium text-[#292C24] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#77786B]" />}
                  <span>{copied ? 'Copied' : 'Copy Notes'}</span>
                </button>
              </div>
            </div>

            {/* Core Summary */}
            <div className="my-6">
              <h5 className="text-xs uppercase tracking-wider font-bold text-[#77786B] mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#69764B]" />
                Executive Summary
              </h5>
              <p className="text-sm text-[#292C24] leading-relaxed bg-[#F5F1E8]/70 p-4 rounded-2xl border border-[#E8E2D2]">
                {currentTopic.summary}
              </p>
            </div>

            {/* High-Yield Key Takeaways */}
            <div className="mb-6">
              <h5 className="text-xs uppercase tracking-wider font-bold text-[#77786B] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#69764B]" />
                High-Yield Interview Takeaways
              </h5>
              <div className="space-y-2.5">
                {currentTopic.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E8E2D2]/80 hover:border-[#69764B]/30 transition-colors">
                    <span className="w-5 h-5 rounded-full bg-[#D6DDC5]/60 text-[#465238] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm text-[#292C24] leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Interview Question */}
            <div className="p-5 rounded-2xl bg-[#F5F1E8] border border-[#E8E2D2]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#465238] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#69764B]" />
                  Simulated Interview Question
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  Staff Level
                </span>
              </div>
              <p className="text-sm font-semibold text-[#292C24] mb-4">
                "{currentTopic.sampleQuestion}"
              </p>

              {revealedAnswer === currentTopic.id ? (
                <div className="p-3.5 rounded-xl bg-white border border-[#D6DDC5] text-xs sm:text-sm text-[#292C24] leading-relaxed animate-fadeIn">
                  <span className="font-bold text-[#465238] block mb-1">Model Talking Points:</span>
                  {currentTopic.sampleAnswer}
                  <button 
                    onClick={() => toggleAnswer(currentTopic.id)}
                    className="block mt-2 text-xs font-semibold text-[#77786B] hover:text-[#292C24]"
                  >
                    Hide Answer ▲
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleAnswer(currentTopic.id)}
                  className="px-4 py-2 bg-[#69764B] hover:bg-[#465238] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Reveal Model Answer & Framework</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
