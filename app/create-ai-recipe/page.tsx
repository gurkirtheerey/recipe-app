'use client';

import React, { useState } from 'react';
import { ChefHat, Plus, ArrowUp, CircleCheckBig } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { useFlags } from 'flagsmith/react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { UIMessage } from 'ai';
import { extractRecipeData } from './utils';
import { useQuery } from '@tanstack/react-query';
const CreateAiRecipe = () => {
  // Feature flag to control AI chatbot visibility
  const { 'ai-chatbot': aiChatbot } = useFlags(['ai-chatbot']);
  const supabase = createClient();
  const { user } = useAuth();
  const [savedResponses, setSavedResponses] = useState<string[]>([]);

  const { data: profile } = useQuery({
    queryKey: ['profile-ai-recipe', user?.id],
    queryFn: async () => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
      return data;
    },
    enabled: !!user,
  });

  // Chat hook that handles message state, input, and submission
  // Connects to the /api/chat endpoint for AI responses
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/chat',
  });

  // Check if the recipe is saved
  const isRecipeSaved = (messageId: string) => {
    return savedResponses.includes(messageId);
  };

  // Handler for adding a recipe to the user's recipe list
  const handleAddRecipe = async (message: UIMessage) => {
    const recipe = extractRecipeData(message.content);

    if (!user) {
      toast.error('Please login to add recipes');
      return;
    }

    const { error } = await supabase.from('recipes').insert([
      {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        total_time: recipe.prep_time + recipe.cook_time,
        servings: recipe.servings,
        image: '',
        user_id: user.id,
        nutrition: recipe.nutrition,
        is_ai_generated: true,
      },
    ]);

    // Add the message id to the savedResponses array
    setSavedResponses([...savedResponses, message.id]);

    if (error) {
      console.error('Error adding recipe:', error);
      toast.error('Error adding recipe, please try again.');
    } else {
      toast.success(`Recipe added successfully! View it in the Recipes section.`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f8f8] dark:bg-black text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <ChefHat className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recipe Assistant</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered recipe creation</p>
          </div>
        </div>
      </header>

      {/* Chat messages area */}
      <main className="flex-1 overflow-y-auto p-8 space-y-4">
        {/* Show empty state if no messages */}
        {aiChatbot.enabled &&
          (messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-400">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <ChefHat className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Start a conversation</p>
              <p className="text-sm mt-2 text-center max-w-md text-gray-600 dark:text-gray-400">
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
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                <div
                  className={`flex flex-col gap-1 max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm rounded-2xl rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  {/* "Add to Recipes" button that appears below assistant messages only if the message contains Prep Time  */}
                  {message.role === 'assistant' &&
                    message.content.includes('Prep Time:') &&
                    // If the recipe is not saved, show the "Add to Recipes" button
                    (!isRecipeSaved(message.id) ? (
                      <button
                        onClick={() => handleAddRecipe(message)}
                        className="self-start flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add to Recipes</span>
                      </button>
                    ) : (
                      // If the recipe is saved, show the "Saved" button
                      <span className="self-start flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <CircleCheckBig className="w-3 h-3" />
                        <span>Saved</span>
                      </span>
                    ))}
                </div>
                {/* User avatar */}
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={profile?.profile_picture} />
                    </Avatar>
                  </div>
                )}
              </div>
            ))
          ))}
      </main>

      {/* Input area */}
      <div className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-center rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
            <input
              value={input}
              placeholder="Send a message..."
              onChange={handleInputChange}
              disabled={status !== 'ready'}
              className="flex-1 rounded-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:border-none focus:ring-0 px-4 py-2"
            />
            <button type="submit" className="rounded-full bg-blue-600 text-white hover:bg-blue-700 p-2 m-1">
              <ArrowUp className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAiRecipe;
