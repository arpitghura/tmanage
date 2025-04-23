import React, { useState } from 'react';
import { Maximize2, Minimize2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TaskFormData, User } from './types';
import { TaskForm } from './CreateTaskForm';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: TaskFormData) => void;
  users: User[];
  initialData?: Partial<TaskFormData>;
}

export function TaskDialog({
  open,
  onOpenChange,
  onSubmit,
  users,
  initialData,
}: TaskDialogProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && hasUnsavedChanges) {
      // Show confirmation dialog
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onOpenChange(newOpen);
        setHasUnsavedChanges(false);
      }
    } else {
      onOpenChange(newOpen);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          '',
          isMaximized ? 'w-[100%] h-screen' : 'w-[80%]'
        )}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Task Details</DialogTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMaximized(!isMaximized)}
            >
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <TaskForm
          onSubmit={(data) => {
            onSubmit(data);
            setHasUnsavedChanges(false);
          }}
          users={users}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
}

