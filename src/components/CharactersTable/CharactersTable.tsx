"use client";

import { Characters } from "@prisma/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Table } from "../Global/Table";
import { TableColumn } from "../Global/TableHead";
import { useLoadCharacters } from "@/hooks/useLoadCharacters";

import styles from "./CharactersTable.module.css";

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
    key: "description",
    label: "Description",
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

interface CharactersTableProps {
  characters: Characters[];
}

export const CharactersTable = ({ characters }: CharactersTableProps) => {
  const { data, isLoading } = useLoadCharacters();
  const [tableData, setTableData] = useState<Characters[]>(characters);

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
