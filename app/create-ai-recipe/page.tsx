'use client';

import React from 'react';
import { Send, ChefHat, MessageSquare } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { useFlags } from 'flagsmith/react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const CreateAiRecipe = () => {
  const { 'ai-chatbot': aiChatbot } = useFlags(['ai-chatbot']);
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Recipe Assistant</h1>
              <p className="text-sm text-gray-500">AI-powered recipe creation</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {aiChatbot.enabled &&
          (messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <ChefHat className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg font-medium text-gray-700">Start a conversation</p>
              <p className="text-sm mt-2 text-center max-w-md text-gray-500">
                Ask me to create a recipe, suggest ingredients, or help with cooking techniques.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                      : 'bg-white text-gray-800 shadow-sm rounded-2xl rounded-tl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  </div>
                )}
              </div>
            ))
          ))}
      </div>

      {/* Input area */}

      <div className="bg-white border-t border-gray-200 p-4 shadow-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            placeholder="Send a message..."
            onChange={handleInputChange}
            disabled={status !== 'ready'}
            className="flex-1 rounded-full bg-gray-50 border border-gray-200 px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAiRecipe;
