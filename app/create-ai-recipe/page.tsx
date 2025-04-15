'use client';

import React from 'react';
import { Send, ChefHat, Plus } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { useFlags } from 'flagsmith/react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const CreateAiRecipe = () => {
  // Feature flag to control AI chatbot visibility
  const { 'ai-chatbot': aiChatbot } = useFlags(['ai-chatbot']);

  // Chat hook that handles message state, input, and submission
  // Connects to the /api/chat endpoint for AI responses
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/chat',
  });

  // Handler for adding a recipe to the user's recipe list
  const handleAddRecipe = async (content: string) => {
    console.log('Adding recipe:', content);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Recipe Assistant</h1>
            <p className="text-sm text-gray-500">AI-powered recipe creation</p>
          </div>
        </div>
      </header>

      {/* Chat messages area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Show empty state if no messages */}
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
            // Map through messages and display them
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant avatar with chef hat */}
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  {/* Message bubble with different styles for user and assistant */}
                  <div
                    className={`max-w-[75%] p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                        : 'bg-white text-gray-800 shadow-sm rounded-2xl rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {/* "Add to Recipes" button that appears below assistant messages */}
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => handleAddRecipe(message.content)}
                      className="self-start flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Recipes</span>
                    </button>
                  )}
                </div>
                {/* User avatar */}
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
      </main>

      {/* Input area */}
      <footer className="bg-white border-t border-gray-200 p-4 shadow-sm">
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
      </footer>
    </div>
  );
};

export default CreateAiRecipe;
