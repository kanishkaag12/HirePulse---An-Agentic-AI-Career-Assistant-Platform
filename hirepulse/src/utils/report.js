import { formatDate } from './format';

export function buildTextReport(analysis) {
  const line = '-'.repeat(60);
  const section = (title, items) =>
    [`\n${title}`, line, ...(items.length ? items.map((item) => `  • ${item}`) : ['  (none)'])].join('\n');
  const { breakdown, jdSummary, keywords } = analysis;

  return [
    'HIREPULSE – RESUME MATCH REPORT',
    line,
    `Role:         ${analysis.jobTitle}`,
    `Company:      ${analysis.company}`,
    `Resume file:  ${analysis.fileName}`,
    `Date:         ${formatDate(analysis.createdAt)}`,
    '',
    `Overall match score: ${analysis.overallScore}%`,
    'This score represents the textual alignment between your resume and the job description.',
    'It is not a prediction of hiring success.',
    ...(analysis.simulated ? ['Demo mode: these results were simulated with frontend demo data.'] : []),
    section('MATCH BREAKDOWN (illustrative)', [
      `Skills alignment: ${breakdown.skills}%`,
      `Keyword alignment: ${breakdown.keywords}%`,
      `Experience alignment: ${breakdown.experience}%`,
      `Education alignment: ${breakdown.education}%`,
    ]),
    section('MATCHING SKILLS', analysis.matchedSkills),
    section('NOT CLEARLY REPRESENTED IN YOUR RESUME', analysis.unconfirmedSkills),
    section('KEYWORDS FOUND', keywords.found),
    section('KEYWORDS NOT CLEARLY REPRESENTED', keywords.notFound),
    section('SUGGESTIONS', analysis.suggestions.map((s) => `${s.title} – ${s.detail}`)),
    section('JOB DESCRIPTION SUMMARY', [
      `Required skills: ${jdSummary.required.join(', ') || '—'}`,
      `Preferred skills: ${jdSummary.preferred.join(', ') || '—'}`,
      `Experience: ${jdSummary.experience}`,
      ...jdSummary.responsibilities.map((r) => `Responsibility: ${r}`),
    ]),
  ].join('\n');
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
