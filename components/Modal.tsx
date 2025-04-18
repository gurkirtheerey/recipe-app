'use client';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DrawerDescription,
} from './ui';
import { cn } from '@/lib/utils';

/**
 * Modal component that renders a dialog or drawer depending on the screen size
 * @param title - The title of the modal
 * @param description - The description of the modal
 * @param children - The children of the modal
 * @param open - Whether the modal is open
 * @param onOpenChange - The function to call when the modal is opened or closed
 * @returns A modal component
 */
const Modal = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  dialogClassName,
  drawerClassName,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogClassName?: string;
  drawerClassName?: string;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn('px-4', drawerClassName)}>
          <DrawerTitle className="mt-4">{title}</DrawerTitle>
          <DrawerDescription className="text-sm mb-4">{description}</DrawerDescription>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('px-4', dialogClassName)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
