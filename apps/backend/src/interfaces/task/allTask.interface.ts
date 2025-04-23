export interface AllTaskInterface {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  assignedToId: string | null;
  teamId: string | null;
  createdById: string;
  labels: Label[];
  //description: string | null;
}

export interface Label {
  label: string;
  id: string;
  taskId: string;
  labelId: string | null;
}
