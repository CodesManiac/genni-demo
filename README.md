# Genni Demo — Generative UI with AI SDK v6

[![QR code — scan to fork](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/CodesManiac/genni-demo)](https://github.com/CodesManiac/genni-demo)

A demo application showcasing **tool-driven generative UI** — the LLM (Gemini 2.5 Flash) streams back not just text but live React components directly into the chat.

You can scan the QR code above to fork this repo.

## How it works

| Layer | File | Role |
|-------|------|------|
| UI | `app/page.tsx` | Root page, renders `ChatInterface` |
| Chat hook | `app/components/ChatInterface.tsx` | Uses `useChat()` from AI SDK to manage messages, input, and streaming |
| API route | `app/api/chat/route.ts` | Receives messages, calls Gemini 2.5 Flash with a `showStockPerformance` tool |
| Tool component | `app/components/StockChart.tsx` | Rendered inline when the tool returns chart data |
| Loading state | `app/components/ChartSkeleton.tsx` | Shown while the tool is executing |

### Flow

1. User types a message (e.g. *"How is Apple stock looking?"*)
2. `useChat` sends `{ messages }` to `POST /api/chat`
3. Gemini receives the messages and decides to call `showStockPerformance` with `{ ticker: "AAPL" }`
4. The tool simulates a 2s delay, returns mock weekly price data
5. The response streams back — the client sees a tool part with `state: 'output-available'`
6. `ChatInterface` swaps the `<ChartSkeleton>` for a `<StockChart>` component

## Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/apikey) API key

## Getting started

```bash
# Install dependencies
npm install

# Add your Google API key
echo "GOOGLE_GENERATIVE_AI_API_KEY=your_key_here" > .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and ask about a stock ticker (e.g. AAPL, NVDA, TSLA).

## Stack

- **Next.js** (App Router)
- **AI SDK v6** (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Zod** — tool input schema validation
- **Lucide React** — icons
- **TypeScript** — language
- **Tailwind CSS v4** — styling
