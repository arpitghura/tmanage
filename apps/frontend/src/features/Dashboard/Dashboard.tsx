"use client";
import React from "react";
import SimpleTaskTable from "@/components/table/ReactTable";

export interface AllTaskByUserType {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  assignedToId: string | null;
  teamId: string | null;
  createdById: string;
}

const Dashboard = () => {
  return (
    <div className="bg-white">
      <div className="max-w-[95%] mx-auto rounded-lg">
        <SimpleTaskTable />
      </div>
    </div>
  );
};

export default Dashboard;
