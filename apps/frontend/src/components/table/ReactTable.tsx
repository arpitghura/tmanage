import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AllTaskByUserType } from "@/features/Dashboard/Dashboard";
import { useGetAllUserTasksQuery } from "@/redux/queries/user.query";
import cookies from "js-cookie";
import { USER_ID } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TableSkeleton } from "./Loading";

type Task = {
  id: string;
  title: string;
  status: "Pending" | "Completed" | "In Progress" | "Progress";
  lastUpdated: string;
};

interface DynamicTaskTableProps {
  tasks: AllTaskByUserType[];
}

const columns: ColumnDef<AllTaskByUserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        className="w-4 h-4"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="w-4 h-4"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Task ID",
    cell: (info) => {
      const actualValue = info.getValue();
      const trimValue = String(actualValue).substring(0, 8);
      return <span className="text-sm text-gray-600">{trimValue}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Task Title",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as AllTaskByUserType["status"];
      const statusColors: Record<AllTaskByUserType["status"], string> = {
        pending: "bg-yellow-200 text-yellow-800 capitalize",
        completed: "bg-green-200 text-green-800 capitalize",
        "in-progress": "bg-blue-200 text-blue-800 capitalize",
        progress: "bg-gray-200 text-gray-800 capitalize",
      };
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: (info) => info.getValue() || "You",
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Created',
  //   cell: info => info.getValue(),
  // },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: (info) => info.getValue() || "-",
  },
];

export default function DynamicTaskTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const userId = cookies.get(USER_ID) || "";
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const {
    data: tasksData,
    error: tasksError,
    isLoading: tasksLoading,
  } = useGetAllUserTasksQuery({ userId, limit, offset });
  const allTasksData: AllTaskByUserType[] = useMemo(() => {
    if (tasksData?.statusCode === "0") {
      return tasksData.data.tasks;
    }
    return [];
  }, [tasksData]);

  const table = useReactTable({
    data: allTasksData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    manualPagination: true,
    pageCount: tasksData?.data.totalPages,
  });

  // TODO: Implement API call to fetch data for search filter from backend
  // useEffect(() => {
  //   if (globalFilter) {
  //     // fetch data from backend
  //   }
  // }, [globalFilter]);

  if (tasksLoading) return <TableSkeleton />;
  // @ts-ignore
  if (tasksError) return <div>Error: {tasksError?.message}</div>;

  if (allTasksData.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl">No Task Found</h1>
      </div>
    );
  }

  const handleBulkMarkAsCompleted = () => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    console.log(selectedRows);
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border rounded w-full max-w-sm text-gray-700"
          placeholder="Search all columns..."
        />
        <div className="flex items-center gap-4">
          {Object.keys(rowSelection).length > 0 && (
            <div>
              <button
                className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                onClick={() => {
                  handleBulkMarkAsCompleted();
                }}
              >
                Mark as Completed
              </button>
            </div>
          )}
          <div className="text-sm text-gray-700">
            {Object.keys(rowSelection).length} of{" "}
            {table.getPreFilteredRowModel().rows.length} rows selected
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-2 px-4 text-left font-semibold text-sm text-gray-600"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUp className="inline-block ml-1 h-4 w-4" />
                          ),
                          desc: (
                            <ChevronDown className="inline-block ml-1 h-4 w-4" />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-200 hover:bg-slate-100 cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <Select
            value={String(limit)}
            onValueChange={(value: string) => {
              setLimit(Number(value));
              //table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[180px] text-gray-700">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Rows per page: 10</SelectItem>
              <SelectItem value="20">Rows per page: 20</SelectItem>
              <SelectItem value="30">Rows per page: 30</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 text-sm text-gray-700">
            Showing {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} pages
          </div>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => {
              table.previousPage();
              setOffset(offset - limit);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => {
              table.nextPage();
              setOffset(offset + limit);
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
