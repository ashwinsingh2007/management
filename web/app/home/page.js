"use client"

import * as React from "react"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PencilSquareIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/solid'
import TaskDrawer from "@/components/TaskDrawer"
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons"
import { Label } from "@/components/ui/label"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  saveTaskDataSliceStore,
  getTaskDataSliceStore,
  updateTaskDataSliceStore,
  deleteTaskDataSliceStore
} from '@/store/slices/applicationSlice';


const statuses = [
  "All",
  "To Do",
  "In Progress",
  "Done",
]

export default function Home() {
  const [sorting, setSorting] = useState([])
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const [data, setData] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [statusFilter, setStatusFilter] = useState("All")
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openViewDrawer, setOpenViewDrawer] = useState(false)
  const [title, setTitle] = useState("")
  const [updatingId, setUpdatingId] = useState()
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("To Do")
  const dispatch = useDispatch();
  const { data: getTaskData } = useSelector((state) => {
    return state.getTaskDataSliceReducer
  });
  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            className="p-[0px]"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Task
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="lowercase">{row.getValue("title")}</div>
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            className="p-[0px]"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div className="lowercase">{row.getValue("description")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-6">
            <span className="text-brand-400 cursor-pointer" onClick={() => initiateViewTask(row.original.id)}><EyeIcon className="w-5" /></span>
            <span className="text-brand-400 cursor-pointer" onClick={() => initiateUpdateTask(row.original.id)}><PencilSquareIcon className="w-5" /></span>
            <span className="text-red-500 cursor-pointer" onClick={() => deleteTask(row.original.id)}><TrashIcon className="w-5" /></span>
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  useEffect(() => {
    dispatch(getTaskDataSliceStore.actions.getTaskDataRequest())
  }, [dispatch])

  useEffect(() => {
    if (getTaskData?.data?.tasks?.rows) {
      setData(getTaskData?.data?.tasks?.rows)
    }
  }, [getTaskData])

  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      if (innerWidth < 550) {
        table.getAllColumns().find(column => column.id === "description").toggleVisibility(false);
      } else {
        table.getAllColumns().find(column => column.id === "description").toggleVisibility(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addTask = () => {
    dispatch(saveTaskDataSliceStore.actions.saveTaskDataRequest({
      title,
      description,
      status: "To Do"
    }))
    setOpenCreateDrawer(false)
  }

  const deleteTask = (id) => {
    dispatch(deleteTaskDataSliceStore.actions.deleteTaskDataRequest({
      taskId: id
    }))
  }

  const initiateUpdateTask = (id) => {
    const updatingData = data.find(dt => dt.id === id)
    setTitle(updatingData.title)
    setDescription(updatingData.description)
    setStatus(updatingData.status)
    setOpenUpdateDrawer(true)
    setUpdatingId(id)
  }

  const initiateCreateTask = (id) => {
    setTitle("")
    setDescription("")
    setStatus("")
    setOpenCreateDrawer(true)
  }

  const initiateViewTask = (id) => {
    const viewingData = data.find(dt => dt.id === id)
    setTitle(viewingData.title)
    setDescription(viewingData.description)
    setStatus(viewingData.status)
    setOpenViewDrawer(true)
  }

  const updateTask = () => {
    console.log("updatingId:::", updatingId)
    dispatch(updateTaskDataSliceStore.actions.updateTaskDataRequest({
      title,
      description,
      status,
      taskId: updatingId
    }))
    // setData([...newData])
    setOpenUpdateDrawer(false)
  }

  return (
    <div className="w-full p-[20px]">
      <TaskDrawer
        openUpdateDrawer={openUpdateDrawer}
        setOpenUpdateDrawer={setOpenUpdateDrawer}
        header="Update Task"
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        type="update"
        submitFunc={updateTask}
      />

      <TaskDrawer
        openUpdateDrawer={openCreateDrawer}
        setOpenUpdateDrawer={setOpenCreateDrawer}
        header="Create New Task"
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        type="create"
        submitFunc={addTask}
      />

      <TaskDrawer
        openUpdateDrawer={openViewDrawer}
        setOpenUpdateDrawer={setOpenViewDrawer}
        header="Detailed Task"
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        type="view"
        submitFunc={addTask}
      />

      <div className="flex justify-end pr-[5px] md:pr-[50px]">
        <Button className="bg-brand-400 w-[150px] hover:bg-brand-500" onClick={initiateCreateTask}>Create New Task</Button>
      </div>

      <div className="p-[5px] md:p-[50px]">
        <div className="flex items-center py-4 gap-2 justify-between">
          <div className="flex flex-col gap-1">
            <Label className="text-[12px] text-gray-500">Search Task</Label>
            <Input
              placeholder="Filter tasks..."
              value={(table.getColumn("title").getFilterValue())}
              onChange={(event) =>
                table.getColumn("title").setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-[12px] text-gray-500">Status</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto w-[140px] justify-between">
                  {statusFilter} <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statuses
                  .map((status, index) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={index}
                        className="capitalize"
                        checked={status === statusFilter}
                        onCheckedChange={() => {
                          setStatusFilter(status)
                          if (status === "All") {
                            table.getColumn("status").setFilterValue("")
                          } else {
                            table.getColumn("status").setFilterValue(status)
                          }
                        }}
                      >
                        {status}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
