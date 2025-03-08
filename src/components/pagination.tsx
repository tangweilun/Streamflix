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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null; //pagination is not rendered if there's only one page

  const getPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(1); //always show first page

    const startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 3);

    if (startPage > 2) {
      pageNumbers.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-orange-500"
            }
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page as number)}
                className={
                  currentPage === page
                    ? "text-black bg-orange-500 border-orange-500 hover:bg-orange-600"
                    : "text-white hover:bg-orange-500"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-orange-500"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
