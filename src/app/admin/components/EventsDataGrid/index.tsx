"use client";

import { formatStarwarsDatePeriod } from "@/utils/formatStarwarsDatePeriod";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Events } from "@prisma/client";
import { format } from "date-fns";

const DataGridColumns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "title",
    headerName: "Title",
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "fromDate",
    headerName: "From Date",
    valueGetter: (params: GridValueGetterParams) => formatStarwarsDatePeriod(params.row.fromDate),
  },
  {
    field: "toDate",
    headerName: "To Date",
    valueGetter: (params: GridValueGetterParams) => formatStarwarsDatePeriod(params.row.toDate),
  },
  {
    field: "createdAt",
    headerName: "Created",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => format(params.row.createdAt, "dd-MM-yyyy HH:mm:ss"),
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 200,
    valueGetter: (params: GridValueGetterParams) => format(params.row.updatedAt, "dd-MM-yyyy HH:mm:ss"),
  },
  {
    field: "",
    headerName: "Actions",
  },
];

interface EventsDataGridProps {
  events: Events[];
}

export const EventsDataGrid = ({ events }: EventsDataGridProps) => {
  return (
    <div>
      <DataGrid rows={events} columns={DataGridColumns} hideFooter />
    </div>
  );
};
