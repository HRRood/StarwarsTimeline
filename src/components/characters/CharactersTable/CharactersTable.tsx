"use client";

import { format } from "date-fns";
import { Table } from "../../Global/Table/Table";
import { TableColumn } from "../../Global/Table/TableHead";
import { useLoadCharacters } from "@/hooks/useLoadCharacters";

import styles from "./CharactersTable.module.css";
import Loader from "@/components/Global/loader";
import { useState } from "react";

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

export const CharactersTable = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading } = useLoadCharacters(pageNumber);

  if (!isLoading && (!data || !data.success)) {
    return <div>No data</div>;
  }

  return (
    <div className={styles.table_container}>
      <Loader isLoading={isLoading} />
      {data && (
        <Table
          data={data.data.characters}
          columns={columns}
          pagination={data.data.pagination}
          setPageNumber={(number) => {
            setPageNumber(number);
          }}
        />
      )}
    </div>
  );
};
