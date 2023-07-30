export interface TableColumn {
  key: string;
  label: string;
  render?: (data: any) => JSX.Element | string;
}

interface TableHeadProps {
  columns: TableColumn[];
}

export const TableHead = ({ columns }: TableHeadProps) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.key}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
};
