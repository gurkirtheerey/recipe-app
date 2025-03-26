import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Clock, FolderOpen } from "lucide-react";

export default async function Profile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }
  const username = user.user_metadata.first_name;

  return (
    <div className="container space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {/* PROFILE PIC PLACEHOLDER */}
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl font-semibold">hi</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{username || "User"}'s Kitchen</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Recipe Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Recent Recipes</h2>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Favorite Recipes</h2>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-semibold">Recipe Collections</h2>
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Recent Recipes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Recipes</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <p className="text-muted-foreground">No recipes yet.</p>
            <Button variant="link" className="mt-2">
              Create your first recipe
            </Button>
          </div>
        </div>
      </div>

      {/* Favorite Recipes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Favorite Recipes</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <p className="text-muted-foreground">No favorite recipes yet.</p>
            <Button variant="link" className="mt-2">
              Discover recipes
            </Button>
          </div>
        </div>
      </div>

      {/* Recipe Collections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recipe Collections</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border p-6 text-center">
            <p className="text-muted-foreground">No collections yet.</p>
            <Button variant="link" className="mt-2">
              Create your first collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
