import { streamText } from 'ai'
import { xai } from '@ai-sdk/xai'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { equity, gold, bonds, investmentGoal, riskTolerance } = await request.json()

    if (equity === undefined || gold === undefined || bonds === undefined) {
      return new Response('Allocation values are required', { status: 400 })
    }

    const prompt = `Analyze this investment portfolio allocation and provide a risk assessment:

Portfolio Allocation:
- Equity (Stocks & Mutual Funds): ${equity}%
- Gold (Precious Metals): ${gold}%
- Bonds (Fixed Income): ${bonds}%

${investmentGoal ? `Investment Goal: ${investmentGoal}` : ''}
${riskTolerance ? `Risk Tolerance: ${riskTolerance}` : ''}

Provide a concise analysis with:
1. Overall Risk Score (0-100, where 0 is lowest risk and 100 is highest)
2. Risk Level (Low, Moderate, or High)
3. A brief 2-3 sentence assessment of this allocation
4. One specific recommendation to improve the portfolio

Format your response as JSON:
{
  "riskScore": <number>,
  "riskLevel": "<Low|Moderate|High>",
  "assessment": "<brief assessment>",
  "recommendation": "<one recommendation>",
  "marketRisk": <number 0-100>,
  "creditRisk": <number 0-100>,
  "liquidityRisk": <number 0-100>
}`

    const result = streamText({
      model: xai('grok-4', {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt: prompt,
      system: 'You are a professional financial advisor AI. Provide accurate, helpful investment risk assessments. Always respond with valid JSON only, no additional text.',
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error generating risk assessment:', error)
    return new Response('Failed to generate risk assessment', { status: 500 })
  }
}
