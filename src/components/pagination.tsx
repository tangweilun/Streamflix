"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function PaginationControl({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationControlProps) {
  if (totalPages <= 1) return null;

  const renderPaginationItems = () => {
    const items = [];

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => hasPrevPage && onPageChange(currentPage - 1)}
          className={
            !hasPrevPage
              ? "pointer-events-none opacity-50"
              : "hover:bg-orange-500"
          }
        />
      </PaginationItem>
    );

    items.push(
      <PaginationItem key="1">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => onPageChange(1)}
          className={
            currentPage === 1
              ? "bg-orange-500 border-orange-500 hover:bg-orange-600 text-white"
              : "hover:bg-orange-500 text-white"
          }
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    const startPage = Math.max(
      2,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => onPageChange(i)}
            className={
              currentPage === i
                ? "bg-orange-500 border-orange-500 hover:bg-orange-600 text-white"
                : "hover:bg-orange-500 text-white"
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className={
              currentPage === totalPages
                ? "bg-orange-500 border-orange-500 hover:bg-orange-600"
                : ""
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => hasNextPage && onPageChange(currentPage + 1)}
          className={
            !hasNextPage
              ? "pointer-events-none opacity-50"
              : "hover:bg-orange-500"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </Pagination>
  );
}
