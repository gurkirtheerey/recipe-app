import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

function errorHandler(error: unknown) {
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

    // Create a copy of the messages array
    const messagesCopy = [...messages];

    // Find the index of the last user message
    const lastMsgIndex = messagesCopy.map((m) => m.role).lastIndexOf('user');

    // If there is a user message, update content with recipe-specific requirements
    if (lastMsgIndex !== -1) {
      messagesCopy[lastMsgIndex] = {
        ...messagesCopy[lastMsgIndex],
        // Add recipe-specific requirements to the user's message
        content: `${messagesCopy[lastMsgIndex].content}. Include title, prep time in minutes, cook time in minutes, servings, and a short description.`,
      };
    }

    // Clean the messages to prevent other metadata and ensure only role and content are sent to the AI
    const cleanMessages = messagesCopy.map(({ role, content }) => ({
      role,
      content,
    }));

    const result = streamText({
      model: openai('gpt-3.5-turbo'),
      system: 'You are a helpful assistant.',
      messages: cleanMessages,
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
