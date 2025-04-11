import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export function errorHandler(error: unknown) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-3.5-turbo'),
      system: 'You are a helpful assistant.',
      messages,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
