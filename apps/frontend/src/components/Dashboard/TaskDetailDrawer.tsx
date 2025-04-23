import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, MessageSquare, Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Task {
  title: string;
  dueDate: string;
  priority: string;
}

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose} >
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <Button variant="secondary" className='gap-1 cursor-pointer'>
            <Check className="h-4 w-4" />
            <Badge variant="secondary" className='p-0 m-0'>Mark as Completed</Badge>
            </Button>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <SheetTitle className="text-xl font-semibold">
            {task.title}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Assignee Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Assignee</h3>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
              <span className="text-sm">Jenifer Anniston</span>
            </div>
          </div>

          {/* Due Date Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Due Date</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{task.dueDate}</span>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Projects</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-pink-200" />
              <span className="text-sm">Event Planning</span>
            </div>
          </div>

          {/* Fields Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Fields</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  In Progress
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Priority</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm text-gray-600">
              Schedule and attend an appointment with an endocrinologist to evaluate and address any issues related to hormonal imbalances or endocrine disorders.
            </p>
          </div>

          {/* Comments Section */}
          <Tabs defaultValue="comments">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="space-y-4">
              <div className="mt-4 space-y-4">
                {/* Comment */}
                <div className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">John Smith</span>
                      <span className="text-xs text-gray-500">17th Feb 2024</span>
                    </div>
                    <p className="text-sm mt-1">
                      Hi 👋 I'll do that task now, you can start working on another task!
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="icon" className="rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailDrawer;