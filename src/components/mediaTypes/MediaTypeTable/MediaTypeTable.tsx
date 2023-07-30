"use client";

import { formatStarwarsDatePeriod } from "@/utils/formatStarwarsDatePeriod";
import { Events, MediaType } from "@prisma/client";
import { format } from "date-fns";
import { useLoadEvents } from "@/hooks/useLoadEvents";
import { useEffect, useState } from "react";
import { Table } from "../../Global/Table/Table";
import { TableColumn } from "../../Global/Table/TableHead";

import styles from "./MediaTypeTable.module.css";
import { useLoadMediaTypes } from "@/hooks/useLoadMediaTypes";

const columns: TableColumn[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "",
    label: "Actions",
  },
];

interface MediaTypeTableProps {
  mediaTypes: MediaType[];
}

export const MediaTypeTable = ({ mediaTypes }: MediaTypeTableProps) => {
  const { data, isLoading } = useLoadMediaTypes();
  const [tableData, setTableData] = useState<MediaType[]>(mediaTypes);

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
