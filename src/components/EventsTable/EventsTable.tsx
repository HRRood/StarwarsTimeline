"use client";

import { formatStarwarsDatePeriod } from "@/utils/formatStarwarsDatePeriod";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import { Table } from "@nextui-org/react";
import { Events } from "@prisma/client";
import { format } from "date-fns";

import styles from "./EventsTable.module.css";
import { useLoadEvents } from "@/hooks/useLoadEvents";
import { useEffect, useState } from "react";
import { Table } from "../Global/Table";
import { TableColumn, TableHead } from "../Global/TableHead";
import { TableBody } from "../Global/TableBody";

const columns: TableColumn[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "fromDate",
    label: "From Date",
    render: (row) => formatStarwarsDatePeriod(row.fromDate),
  },
  {
    key: "toDate",
    label: "To Date",
    render: (row) => formatStarwarsDatePeriod(row.toDate),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row) => format(new Date(row.createdAt), "dd-MM-yy hh:mm:ss"),
  },
  {
    key: "updatedAt",
    label: "Updated",
    render: (row) => format(new Date(row.updatedAt), "dd-MM-yy hh:mm:ss"),
  },
  {
    key: "",
    label: "Actions",
  },
];

interface EventsTableProps {
  events: Events[];
}

export const EventsTable = ({ events }: EventsTableProps) => {
  const { data, isLoading } = useLoadEvents();
  const [tableData, setTableData] = useState<Events[]>(events);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <div className={styles.table_container}>
      <Table data={tableData} columns={columns} />
    </div>
  );
};
