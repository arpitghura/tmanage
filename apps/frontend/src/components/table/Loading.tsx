import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const TableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]"></TableHead>
        <TableHead>Task ID</TableHead>
        <TableHead className='flex-1'>Task Title</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Assignee</TableHead>
        <TableHead>Created</TableHead>
        <TableHead>Last Updated</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index} className='cursor-pointer hover:bg-gray-100'>
          <TableCell>
            <Skeleton className="w-8 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-20 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-80 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-20 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-36 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-48 h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-48 h-8" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);