export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: 'AI analysis is not configured. Add OPENAI_API_KEY to the deployment environment.' })

  try {
    const { feedback } = req.body || {}
    if (!Array.isArray(feedback) || feedback.length === 0) return res.status(400).json({ error: 'Feedback is required.' })

    const input = feedback.map(item => `[${item.id}] [${item.customer}] ${item.text}`).join('\n')
    const schema = {
      type: 'object',
      additionalProperties: false,
      properties: {
        themes: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
          name: { type: 'string' }, description: { type: 'string' }, evidenceIds: { type: 'array', items: { type: 'number' } }, confidence: { type: 'string', enum: ['High', 'Medium', 'Low'] }, opportunity: { type: 'string' }, unansweredQuestion: { type: 'string' }
        }, required: ['name', 'description', 'evidenceIds', 'confidence', 'opportunity', 'unansweredQuestion'] } },
        summary: { type: 'string' }
      },
      required: ['themes', 'summary']
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        store: false,
        instructions: 'You are a product discovery assistant. Identify recurring customer problems from the supplied feedback. Every evidenceIds value must reference an actual feedback id. Never invent evidence. Do not decide what should be built. Surface unanswered questions that a Product Manager should investigate before committing to a solution. Keep themes distinct and avoid creating a theme from a single isolated request unless it reveals an important problem.',
        input,
        text: { format: { type: 'json_schema', name: 'product_discovery_analysis', strict: true, schema } }
      })
    })

    const data = await response.json()
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'OpenAI request failed.' })
    return res.status(200).json(JSON.parse(data.output_text))
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unexpected analysis error.' })
  }
}
