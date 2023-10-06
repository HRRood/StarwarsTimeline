import { PaginationType } from "@/hooks/useLoadCharacters";
import { Button } from "@mui/material";

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { nextPage, previousPage, hasNextPage, hasPreviousPage, totalPages, currentPage } = pagination;

  const pageNumbers = [];

  if (currentPage >= 3) {
    pageNumbers.push({ label: 1, value: 1 });
    if (currentPage > 3) pageNumbers.push({ label: "...", value: currentPage - 2 });
  }

  if (hasPreviousPage && currentPage >= 2) {
    pageNumbers.push({ label: currentPage - 1, value: currentPage - 1 });
  }

  pageNumbers.push({ label: currentPage, value: currentPage });

  if (hasNextPage && currentPage <= totalPages - 1) {
    pageNumbers.push({ label: currentPage + 1, value: currentPage + 1 });
  }

  if (currentPage <= totalPages - 2) {
    if (currentPage < totalPages - 2) pageNumbers.push({ label: "...", value: currentPage + 2 });
    pageNumbers.push({ label: totalPages, value: totalPages });
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "end", gap: "5px", margin: "10px 0" }}>
      {hasPreviousPage && (
        <Button size="small" variant="outlined" onClick={() => onPageChange(previousPage)}>
          {"<"}
        </Button>
      )}
      {pageNumbers.map((page) => (
        <Button
          size="small"
          key={`${page.label}-${page.value}`}
          onClick={() => onPageChange(page.value)}
          variant={page.value === currentPage ? "contained" : "outlined"}
        >
          {page.label}
        </Button>
      ))}

      {hasNextPage && (
        <Button size="small" variant="outlined" onClick={() => onPageChange(nextPage)}>
          {">"}
        </Button>
      )}
    </div>
  );
};
