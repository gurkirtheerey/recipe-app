'use client';
import { useParams } from 'next/navigation';
import { SidebarTrigger } from '../ui/sidebar';

// This component is used to trigger the sidebar on mobile devices
const AppSidebarTrigger = () => {
  const params = useParams();

  if (params.id) {
    return null;
  }

  return (
    <div className="sm:hidden absolute top-2 right-4 flex items-center justify-center mt-3">
      <SidebarTrigger className="h-6 w-6 text-muted-foreground" />
    </div>
  );
};

export default AppSidebarTrigger;
