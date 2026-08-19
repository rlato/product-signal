// ProductSignal analysis layer.
// This deterministic fallback keeps the demo useful without exposing an AI API key.
// A hosted AI provider can later implement the same input/output contract.

const themeDefinitions = [
  {
    name: 'Manual work and duplicate entry',
    terms: ['enter', 'copy', 'manual', 'repetitive', 'same information', 'duplicate'],
    description: 'Customers describe repetitive administrative work and duplicate entry.',
    opportunity: 'Reduce repetitive data entry',
  },
  {
    name: 'Reporting is hard to act on',
    terms: ['report', 'reporting', 'numbers', 'data', 'insight'],
    description: 'Customers can access information but struggle to turn it into useful decisions.',
    opportunity: 'Make reporting easier to understand',
  },
  {
    name: 'Need access on the go',
    terms: ['mobile', 'away', 'phone', 'computer', 'desk', 'remote'],
    description: 'Customers want to complete common tasks away from their main workstation.',
    opportunity: 'Improve mobile workflow',
  },
]

export function analyzeFeedback(feedback) {
  return themeDefinitions
    .map(theme => {
      const matches = feedback.filter(item =>
        theme.terms.some(term => item.text.toLowerCase().includes(term))
      )
      return {
        ...theme,
        evidence: matches.map(item => ({ id: item.id, customer: item.customer, text: item.text })),
        mentions: matches.length,
        customers: new Set(matches.map(item => item.customer)).size,
        confidence: matches.length >= 3 ? 'High' : matches.length > 0 ? 'Medium' : 'Low',
      }
    })
    .filter(theme => theme.evidence.length > 0)
    .sort((a, b) => b.evidence.length - a.evidence.length)
}

export function buildAnalysisPrompt(feedback) {
  return `You are assisting a Product Manager with customer discovery. Identify recurring customer problems, group related feedback into themes, cite the exact evidence used for each theme, identify unanswered questions, and suggest product opportunities. Do not invent evidence and do not decide what should be built.\n\nCUSTOMER FEEDBACK:\n${feedback.map(item => `[${item.customer}] ${item.text}`).join('\n')}`
}
