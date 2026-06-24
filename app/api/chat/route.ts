// app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: await convertToModelMessages(messages),
    system: `You are an elite, concise financial advisor. 
             If the user asks about a stock price or asset performance, you MUST use the 'showStockPerformance' tool. 
             Do not try to describe the numbers or render ASCII text charts if the tool applies.`,
    tools: {
      showStockPerformance: tool({
        description: 'Generates and renders a comprehensive stock price history chart for a given stock ticker symbol.',
        inputSchema: z.object({
          ticker: z.string().toUpperCase().describe('The stock ticker symbol (e.g. AAPL, TSLA, NVDA, GOOG)'),
        }),
        execute: async ({ ticker }) => {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const basePrice = ticker === 'AAPL' ? 180 : ticker === 'NVDA' ? 120 : 200;
          const mockChartData = [
            { date: 'Mon', price: basePrice + Math.random() * 15 },
            { date: 'Tue', price: basePrice + Math.random() * 20 },
            { date: 'Wed', price: basePrice + Math.random() * 10 },
            { date: 'Thu', price: basePrice + Math.random() * 30 },
            { date: 'Fri', price: basePrice + Math.random() * 25 },
          ];

          return { ticker, chartData: mockChartData };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
