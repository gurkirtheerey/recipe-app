'use client';

import React from 'react';
import { ChefHat, Plus, ArrowUp } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { useFlags } from 'flagsmith/react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Function to extract information from the recipe paragraph
function extractRecipeData(paragraph: string) {
  const recipe = {
    title: '', // Extracted dynamically
    description: '',
    ingredients: [] as string[],
    instructions: [] as string[],
    prep_time: 0,
    cook_time: 0,
    servings: 0,
  };

  // Regular expressions to extract data from the paragraph
  const titleMatch = paragraph.match(/Title:\s([\s\S]*?)\n/); // Extract title
  const descriptionMatch = paragraph.match(/Description:\s([\s\S]*?)\n/);
  const prepTimeMatch = paragraph.match(/Prep Time:\s([\d\w\s-]+)/);
  const cookTimeMatch = paragraph.match(/Cook Time:\s([\d\w\s-]+)/);
  const servingsMatch = paragraph.match(/Servings:\s(\d+)/);
  const ingredientsMatch = paragraph.match(/Ingredients:\s([\s\S]*?)Instructions:/);
  const instructionsMatch = paragraph.match(/Instructions:\s([\s\S]*)/);

  // Assign matches to respective keys
  if (titleMatch) recipe.title = titleMatch[1].trim();
  if (descriptionMatch) recipe.description = descriptionMatch[1].trim();
  if (prepTimeMatch) recipe.prep_time = parseInt(prepTimeMatch[1].trim());
  if (cookTimeMatch) recipe.cook_time = parseInt(cookTimeMatch[1].trim());
  if (servingsMatch) recipe.servings = parseInt(servingsMatch[1].trim());
  // Extract ingredients and instructions; remove any leading numbers, dashes,and whitespace
  if (ingredientsMatch) {
    recipe.ingredients = ingredientsMatch[1]
      .split('\n')
      .map((ingredient) => ingredient.replace(/^[-\d.]+\s*/, '').trim())
      .filter((ingredient) => ingredient !== '');
  }
  if (instructionsMatch) {
    recipe.instructions = instructionsMatch[1]
      .split('\n')
      .map((instruction) => instruction.replace(/^[-\d.]+\s*/, '').trim())
      .filter((instruction) => instruction !== '');
  }

  return recipe;
}

const CreateAiRecipe = () => {
  // Feature flag to control AI chatbot visibility
  const { 'ai-chatbot': aiChatbot } = useFlags(['ai-chatbot']);
  const supabase = createClient();
  const { user } = useAuth();

  // Chat hook that handles message state, input, and submission
  // Connects to the /api/chat endpoint for AI responses
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: '/api/chat',
  });

  if (!user) {
    toast.error('Please login to add recipes');
    return;
  }

  // Handler for adding a recipe to the user's recipe list
  const handleAddRecipe = async (content: string) => {
    const recipe = extractRecipeData(content);

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
      },
    ]);

    if (error) {
      console.error('Error adding recipe:', error);
      toast.error('Error adding recipe, please try again.');
    } else {
      toast.success(`Recipe added successfully! View it in the Recipes section.`);
    }
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
      <main className="flex-1 overflow-y-auto p-8 space-y-4">
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
                <div
                  className={`flex flex-col gap-1 max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none'
                        : 'bg-white text-gray-800 shadow-sm rounded-2xl rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  {/* "Add to Recipes" button that appears below assistant messages only if the message contains Prep Time  */}
                  {message.role === 'assistant' && message.content.includes('Prep Time:') && (
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
      <div className="bg-white border-t border-gray-200 p-4 shadow-sm mb-10">
        <div className="flex items-center rounded-full bg-gray-50 border border-gray-200">
          <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
            <input
              value={input}
              placeholder="Send a message..."
              onChange={handleInputChange}
              disabled={status !== 'ready'}
              className="flex-1 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:border-none focus:ring-none px-4 py-2"
            />
          </form>
          <button type="submit" className="rounded-full bg-blue-600 text-white hover:bg-blue-700 p-2 m-1">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAiRecipe;
