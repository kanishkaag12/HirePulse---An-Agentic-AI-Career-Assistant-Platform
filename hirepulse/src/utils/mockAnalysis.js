/**
 * SIMULATED analysis for the frontend demo.
 * Skills/keywords are looked up in the pasted job description with simple text matching.
 * The resume file is NOT read – which skills count as "matched" is decided by a seeded
 * random generator so the same inputs always give the same demo result.
 * No TF-IDF, cosine similarity, embeddings or other NLP runs here.
 */
import {
  DEMO_RESUME_NAME,
  FALLBACK_KEYWORDS,
  FALLBACK_SKILLS,
  KEYWORD_LIBRARY,
  SEED_ANALYSES,
  SKILL_LIBRARY,
} from '../data/mockData';
import { listToText } from './format';

const DAY = 24 * 60 * 60 * 1000;

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const percent = (part, total) => (total ? Math.round((part / total) * 100) : 0);
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function findTerm(text, term) {
  const match = new RegExp(`(?<![a-z0-9])${escapeRegex(term)}(?![a-z0-9])`, 'i').exec(text);
  return match ? match.index : -1;
}

function firstMention(text, terms) {
  const positions = terms.map((term) => findTerm(text, term)).filter((pos) => pos >= 0);
  return positions.length ? Math.min(...positions) : -1;
}

function extractExperience(text) {
  const match = text.match(/(\d+)\s*(\+|-\s*\d+|to\s*\d+)?\s*years?/i);
  if (!match) return 'Not explicitly specified';
  return `${match[0].replace(/\s+/g, ' ').trim()} of relevant experience`;
}

function extractResponsibilities(text) {
  const lines = text.split('\n').map((line) => line.trim());
  const bulletPattern = /^[-•*]\s+/;
  const start = lines.findIndex((line) => /responsibilit|what you('|’)ll do/i.test(line));
  const bullets = [];

  if (start !== -1) {
    for (let i = start + 1; i < lines.length; i++) {
      if (bulletPattern.test(lines[i])) bullets.push(lines[i].replace(bulletPattern, ''));
      else if (bullets.length && lines[i].endsWith(':')) break;
    }
  }

  if (!bullets.length) {
    bullets.push(...lines.filter((line) => bulletPattern.test(line)).map((line) => line.replace(bulletPattern, '')));
  }

  return bullets.length
    ? bullets.slice(0, 5)
    : ['No clearly listed responsibilities were found in the pasted text.'];
}

export function extractJobRequirements(jobDescription) {
  const preferredIndex = jobDescription.search(/preferred|nice[- ]to[- ]have|good[- ]to[- ]have|bonus/i);
  const cutoff = preferredIndex === -1 ? Infinity : preferredIndex;
  const required = [];
  const preferred = [];

  SKILL_LIBRARY.forEach((skill) => {
    const position = firstMention(jobDescription, [skill.name, ...(skill.aliases ?? [])]);
    if (position === -1) return;
    (position < cutoff ? required : preferred).push(skill.name);
  });

  return {
    required,
    preferred,
    keywords: KEYWORD_LIBRARY.filter((keyword) => findTerm(jobDescription, keyword) !== -1),
    experience: extractExperience(jobDescription),
    responsibilities: extractResponsibilities(jobDescription),
  };
}

function buildSuggestions({ matchedSkills, unconfirmedSkills, missingKeywords }) {
  const suggestions = [];

  if (unconfirmedSkills.length) {
    suggestions.push({
      priority: 'high',
      category: 'Skills',
      title: `Clarify your experience with ${listToText(unconfirmedSkills.slice(0, 3))}`,
      detail:
        "These appear in the job description but are not clearly represented in your resume. If you have genuinely used them, say where and how in your experience or project sections. If you haven't, leave them out and treat them as learning goals.",
    });
  }

  if (matchedSkills.includes('REST APIs') || unconfirmedSkills.includes('REST APIs')) {
    suggestions.push({
      priority: 'medium',
      category: 'Projects',
      title: 'Show how you have worked with REST APIs',
      detail: 'Add a project description that explains which APIs you built or consumed, what they did and the outcome.',
    });
  }

  if (matchedSkills.length) {
    suggestions.push({
      priority: 'medium',
      category: 'Visibility',
      title: `Make ${listToText(matchedSkills.slice(0, 2))} easier to spot`,
      detail:
        'Move your strongest matching skills higher – for example into a summary or skills section – and back them with a concrete role or project where you used them.',
    });
  }

  suggestions.push({
    priority: 'medium',
    category: 'Impact',
    title: 'Add measurable outcomes to project descriptions',
    detail: 'Quantify results where you can, e.g. "reduced page load time by 30%". Only use numbers you can back up.',
  });

  if (missingKeywords.length) {
    suggestions.push({
      priority: 'low',
      category: 'Wording',
      title: 'Use relevant terminology where it is accurate',
      detail: `Terms like ${listToText(missingKeywords.slice(0, 3).map((k) => `"${k}"`))} are not clearly represented. Use them only where they truthfully describe your work.`,
    });
  }

  suggestions.push({
    priority: 'low',
    category: 'Integrity',
    title: 'Never add skills or experience you do not have',
    detail: 'Tailor how you present real experience. Claims are verified in interviews, and accuracy builds trust.',
  });

  return suggestions.map((suggestion, index) => ({ id: `s${index + 1}`, ...suggestion }));
}

export function generateMockAnalysis({
  id,
  fileName,
  fileSize,
  jobDescription,
  jobTitle,
  company,
  targetScore,
  createdAt = new Date().toISOString(),
}) {
  const random = seededRandom(hashString(`${fileName}|${jobDescription}`));
  const requirements = extractJobRequirements(jobDescription);

  const usedFallback = requirements.required.length + requirements.preferred.length < 3;
  const required = usedFallback ? FALLBACK_SKILLS.required : requirements.required;
  const preferred = usedFallback ? FALLBACK_SKILLS.preferred : requirements.preferred;
  const matchChance = targetScore != null ? targetScore / 100 : 0.55 + random() * 0.3;

  const matchedSkills = [];
  const unconfirmedSkills = [];
  [...required, ...preferred].forEach((skill) => {
    const bias = required.includes(skill) ? 0.1 : -0.15;
    (random() < matchChance + bias ? matchedSkills : unconfirmedSkills).push(skill);
  });
  if (!unconfirmedSkills.length && matchedSkills.length > 3) unconfirmedSkills.push(matchedSkills.pop());
  if (!matchedSkills.length && unconfirmedSkills.length > 1) matchedSkills.push(unconfirmedSkills.shift());

  const keywordPool = requirements.keywords.length >= 3 ? requirements.keywords : FALLBACK_KEYWORDS;
  const foundKeywords = [];
  const missingKeywords = [];
  keywordPool.forEach((keyword) => (random() < matchChance ? foundKeywords : missingKeywords).push(keyword));
  if (!missingKeywords.length && foundKeywords.length > 3) missingKeywords.push(foundKeywords.pop());

  const breakdown = {
    skills: percent(matchedSkills.length, matchedSkills.length + unconfirmedSkills.length),
    keywords: percent(foundKeywords.length, keywordPool.length),
    experience: Math.round(55 + random() * 35),
    education: Math.round(75 + random() * 20),
  };

  let overallScore = clamp(
    Math.round(breakdown.skills * 0.45 + breakdown.keywords * 0.25 + breakdown.experience * 0.2 + breakdown.education * 0.1),
    35,
    97,
  );

  // Seed data uses fixed scores; shift the illustrative breakdown so it stays consistent.
  if (targetScore != null) {
    const delta = targetScore - overallScore;
    overallScore = targetScore;
    Object.keys(breakdown).forEach((key) => {
      breakdown[key] = clamp(breakdown[key] + delta, 20, 98);
    });
  }

  return {
    id: id ?? `an_${Date.now().toString(36)}${Math.floor(random() * 1e6).toString(36)}`,
    createdAt,
    jobTitle: jobTitle?.trim() || 'Untitled role',
    company: company?.trim() || 'Company not specified',
    fileName,
    fileSize,
    jobDescription,
    overallScore,
    breakdown,
    matchedSkills,
    unconfirmedSkills,
    keywords: { found: foundKeywords, notFound: missingKeywords },
    suggestions: buildSuggestions({ matchedSkills, unconfirmedSkills, missingKeywords }),
    jdSummary: {
      required,
      preferred,
      experience: requirements.experience,
      responsibilities: requirements.responsibilities,
    },
    usedFallback,
    simulated: true,
  };
}

export function buildSeedHistory() {
  const now = Date.now();
  return SEED_ANALYSES.map((seed, index) =>
    generateMockAnalysis({
      id: `demo-${index + 1}`,
      fileName: DEMO_RESUME_NAME,
      fileSize: 248_000,
      jobDescription: seed.jobDescription,
      jobTitle: seed.jobTitle,
      company: seed.company,
      targetScore: seed.score,
      createdAt: new Date(now - seed.daysAgo * DAY).toISOString(),
    }),
  );
}
