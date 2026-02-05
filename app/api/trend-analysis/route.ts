import { streamText } from 'ai'
import { xai } from '@ai-sdk/xai'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { data, year } = await request.json()

    if (!data || data.length === 0) {
      return new Response('No data provided', { status: 400 })
    }

    // Calculate basic statistics
    const values = data.map((d: { value: number }) => d.value)
    const first = values[0]
    const last = values[values.length - 1]
    const max = Math.max(...values)
    const min = Math.min(...values)
    const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length
    const percentChange = ((last - first) / first * 100).toFixed(2)
    const volatilityRange = ((max - min) / avg * 100).toFixed(2)

    // Calculate standard deviation for volatility
    const variance = values.reduce((sum: number, val: number) => sum + Math.pow(val - avg, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)
    const coefficientOfVariation = ((stdDev / avg) * 100).toFixed(2)

    const prompt = `You are a financial analyst AI. Analyze this market trend data and provide insights.

Period: ${year === "all" ? "Last 12 months" : `Year ${year}`}
Data Points: ${data.length}
Starting Value: $${first.toFixed(2)}
Ending Value: $${last.toFixed(2)}
Highest Value: $${max.toFixed(2)}
Lowest Value: $${min.toFixed(2)}
Average Value: $${avg.toFixed(2)}
Overall Change: ${percentChange}%
Price Range Volatility: ${volatilityRange}%
Coefficient of Variation: ${coefficientOfVariation}%

Provide a JSON response with EXACTLY this structure (no markdown, no code blocks, just pure JSON):
{
  "volatility": "Low" or "Medium" or "High",
  "volatilityScore": number between 0-100,
  "volatilityExplanation": "Brief explanation of volatility level",
  "trend": "Bullish" or "Bearish" or "Sideways",
  "trendStrength": "Weak" or "Moderate" or "Strong",
  "learningTip": "Educational tip for beginner investors based on this data",
  "keyInsight": "One key observation about this market period",
  "recommendation": "Brief actionable advice for investors"
}`

    const result = streamText({
      model: xai('grok-4', {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt,
      system: 'You are a helpful financial analyst AI. Always respond with valid JSON only, no markdown formatting or code blocks. Provide educational and insightful analysis suitable for beginner investors.',
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error analyzing trend:', error)
    return new Response('Failed to analyze trend', { status: 500 })
  }
}
