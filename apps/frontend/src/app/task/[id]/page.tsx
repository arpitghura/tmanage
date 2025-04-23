import { TaskCard } from "@/features/Task";
import React from "react";

const Editor = ({ params }: { params: { id: string } }) => {
  return <TaskCard taskId={params.id} />;
};

export default Editor;
