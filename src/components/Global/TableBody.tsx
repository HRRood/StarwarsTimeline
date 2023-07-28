"use client";

import { TableColumn } from "./TableHead";

interface TableBodyProps {
  data: any[];
  columns: TableColumn[];
}

export const TableBody = ({ data, columns }: TableBodyProps) => {
  if (!data) return null;

  const renderValueBasedOnType = (row: any, column: TableColumn) => {
    if (column.render) {
      return column.render(row);
    } else {
      const value = row[column.key];
      if (typeof value === "boolean") {
        return value ? "Yes" : "No";
      }

      if (typeof value === "object") {
        return JSON.stringify(value);
      }

      return value;
    }
  };

  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <td key={column.key}>{renderValueBasedOnType(row, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
