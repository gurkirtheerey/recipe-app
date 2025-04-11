'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CreateRecipeModal from '@/components/Recipe/CreateRecipeModal';
import Link from 'next/link';

import { useChat } from '@ai-sdk/react';
import { useFlags } from 'flagsmith/react';

export default function DashboardContent() {
  const { 'ai-chatbot': aiChatbot } = useFlags(['ai-chatbot']);
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/chat',
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between p-4 w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex justify-center gap-4">
          <Button>
            <Link href="/discover">Discover</Link>
          </Button>
          <Button onClick={() => setOpen((prev) => !prev)} variant="outline">
            Create Recipe
          </Button>
        </div>

        {/* AI Chatbot */}
        {aiChatbot.enabled && (
          <div>
            {messages.map((message) => (
              <div key={message.id}>
                <strong>{`${message.role}: `}</strong>
                {message.parts.map((part, index) => {
                  switch (part.type) {
                    case 'text':
                      return <span key={index}>{part.text}</span>;

                    // other cases can handle images, tool calls, etc
                  }
                })}
              </div>
            ))}

            <form onSubmit={handleSubmit}>
              <input
                value={input}
                placeholder="Send a message..."
                onChange={handleInputChange}
                disabled={status !== 'ready'}
              />
            </form>
          </div>
        )}
      </div>
      {open && <CreateRecipeModal open={open} setOpen={setOpen} />}
    </>
  );
}
