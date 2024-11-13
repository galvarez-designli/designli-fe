import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC, useEffect, useState } from "react";

type CustomPaginationProps = {
  total?: number;
  limit?: number;
  page: number;
  onPageChange?: (pagination: {
    page: number;
    limit: number;
    offset: number;
  }) => void;
};

export const CustomPagination: FC<CustomPaginationProps> = ({
  total,
  limit,
  page,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total && limit) {
      setTotalPages(Math.ceil(total / limit));
    }
  }, [total, limit]);

  const handlePrevious = () => {
    if (!onPageChange || page === 1) return;

    const previousPage = page - 1;

    onPageChange({
      page: previousPage,
      limit: limit!,
      offset: previousPage * (limit || 9),
    });
  };

  const handleNext = () => {
    if (!onPageChange || page === totalPages) return;

    const nextPage = page + 1;

    onPageChange({
      page: nextPage,
      limit: limit!,
      offset: nextPage * (limit || 9),
    });
  };

  const handlePageChange = (page: number) => {
    if (!onPageChange) return;

    onPageChange({
      page,
      limit: limit!,
      offset: (page - 1) * (limit || 9),
    });
  };

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i} className="cursor-pointer">
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrevious} />
        </PaginationItem>
        {renderPages()}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
