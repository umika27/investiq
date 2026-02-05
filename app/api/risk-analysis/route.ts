import { streamText } from 'ai'
import { createXai } from '@ai-sdk/xai'
import type { NextRequest } from 'next/server'

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { equity, gold, bonds, totalAllocation } = await request.json()

    if (totalAllocation !== 100) {
      return new Response('Total allocation must equal 100%', { status: 400 })
    }

    const prompt = `Analyze this investment portfolio allocation and provide a risk assessment:
- Equity: ${equity}%
- Gold: ${gold}%
- Bonds: ${bonds}%

Provide a brief analysis (2-3 sentences) covering:
1. Overall risk level (Low/Moderate/High)
2. Key insight about this allocation
3. One actionable suggestion

Keep it concise and practical for beginner investors.`

    const result = streamText({
      model: xai('grok-3-mini-fast'),
      prompt: prompt,
      system: 'You are a financial advisor AI. Provide clear, concise risk assessments for investment portfolios. Be helpful but remind users this is educational, not financial advice.',
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error analyzing risk:', error)
    return new Response('Failed to analyze portfolio risk', { status: 500 })
  }
}
