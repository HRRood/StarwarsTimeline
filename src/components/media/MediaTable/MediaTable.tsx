"use client";

import { formatStarwarsDatePeriod } from "@/utils/formatStarwarsDatePeriod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Table } from "../../Global/Table/Table";
import { TableColumn } from "../../Global/Table/TableHead";
import { useLoadMedia } from "@/hooks/useLoadMedia";

import styles from "./MediaTable.module.css";
import { MediaWithMediaType } from "@/repository/media/getMedia";

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
    key: "releaseDate",
    label: "Release Date",
    render: (data: MediaWithMediaType) => format(new Date(data.releaseDate), "dd-MM-yyyy"),
  },
  {
    key: "MediaType.name",
    label: "Media Type",
    render: (data: MediaWithMediaType) => <>{data.MediaType?.name}</>,
  },
  {
    key: "dateFrom",
    label: "Date From",
    render: (data: MediaWithMediaType) => formatStarwarsDatePeriod(data.dateFrom),
  },
  {
    key: "dateTo",
    label: "Date To",
    render: (data: MediaWithMediaType) => formatStarwarsDatePeriod(data.dateTo),
  },
  {
    key: "",
    label: "Actions",
  },
];

interface MediaTableProps {
  media: MediaWithMediaType[];
}

export const MediaTable = ({ media }: MediaTableProps) => {
  const { data, isLoading } = useLoadMedia();
  const [tableData, setTableData] = useState<MediaWithMediaType[]>(media);

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
