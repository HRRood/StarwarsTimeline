"use client";

import { formatStarwarsDatePeriod } from "@/utils/formatStarwarsDatePeriod";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import { Table } from "@nextui-org/react";
import { Events } from "@prisma/client";
import { format } from "date-fns";

import styles from "./EventsTable.module.css";
import { useLoadEvents } from "@/hooks/useLoadEvents";
import { useEffect, useState } from "react";

const columns = [
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
  },
  {
    key: "toDate",
    label: "To Date",
  },
  {
    key: "createdAt",
    label: "Created",
  },
  {
    key: "updatedAt",
    label: "Updated",
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
      {/* <DataGrid rows={events} columns={DataGridColumns} hideFooter /> */}
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{formatStarwarsDatePeriod(event.fromDate)}</td>
              <td>{formatStarwarsDatePeriod(event.toDate)}</td>
              <td>{format(new Date(event?.createdAt ?? ""), "dd-MM-yy hh:mm:ss")}</td>
              <td>{format(new Date(event?.updatedAt ?? ""), "dd-MM-yy hh:mm:ss")}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
