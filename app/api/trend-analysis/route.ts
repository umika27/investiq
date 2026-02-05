import { streamText } from 'ai'
import { xai } from '@ai-sdk/xai'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { data, timeframe } = await request.json()

    if (!data || data.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No trend data provided' 
      }), { status: 400 })
    }

    const values = data.map((d: { value: number }) => d.value)
    const first = values[0]
    const last = values[values.length - 1]
    const max = Math.max(...values)
    const min = Math.min(...values)
    const percentChange = ((last - first) / first * 100).toFixed(2)
    const volatilityRange = ((max - min) / first * 100).toFixed(2)

    const prompt = `Analyze this market trend data for ${timeframe} timeframe:
- Starting value: $${first}
- Current value: $${last}
- Change: ${percentChange}%
- High: $${max}
- Low: $${min}
- Volatility range: ${volatilityRange}%

Provide:
1. A volatility assessment (Low/Medium/High) with brief explanation
2. A practical learning tip for beginner investors based on this trend pattern

Keep response concise (3-4 sentences total). Focus on educational value.`

    const result = streamText({
      model: xai('grok-3-mini', {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt: prompt,
      system: 'You are a financial educator AI. Explain market trends in simple terms that beginner investors can understand. Be educational and encouraging, while noting that past performance does not guarantee future results.',
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error analyzing trend:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to analyze market trend' 
    }), { status: 500 })
  }
}
