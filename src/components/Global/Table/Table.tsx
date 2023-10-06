import { PaginationType } from "@/hooks/useLoadCharacters";
import styles from "./Table.module.css";
import { TableBody } from "./TableBody";
import { TableColumn, TableHead } from "./TableHead";
import { Pagination } from "./Pagination";

interface TableProps {
  columns: TableColumn[];
  data: any[];
  pagination?: PaginationType;
  setPageNumber?: (page: number) => void;
}

export const Table = ({ columns, data, pagination, setPageNumber }: TableProps) => {
  return (
    <div>
      {pagination && setPageNumber && <Pagination pagination={pagination} onPageChange={setPageNumber} />}
      <table className={styles.table}>
        <TableHead columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
      {pagination && setPageNumber && <Pagination pagination={pagination} onPageChange={setPageNumber} />}
    </div>
  );
};
