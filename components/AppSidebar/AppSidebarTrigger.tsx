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
    <div className="sm:hidden">
      <SidebarTrigger />
    </div>
  );
};

export default AppSidebarTrigger;
