import styles from "./Table.module.css";
import { TableBody } from "./TableBody";
import { TableColumn, TableHead } from "./TableHead";

interface TableProps {
  columns: TableColumn[];
  data: any[];
}

export const Table = ({ columns, data }: TableProps) => {
  return (
    <table className={styles.table}>
      <TableHead columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};
