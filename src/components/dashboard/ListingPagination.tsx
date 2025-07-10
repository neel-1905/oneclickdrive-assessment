import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useRouter } from "next/router";

const ListingPagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const currentQuery = router.query;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleNextClick = () => {
    const newPage = currentPage + 1;
    router.push({
      pathname: router.pathname,
      query: { ...currentQuery, page: newPage },
    });
  };

  const handlePrevClick = () => {
    const newPage = currentPage - 1;
    router.push({
      pathname: router.pathname,
      query: { ...currentQuery, page: newPage },
    });
  };

  const handlePageNumClick = (num: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...currentQuery, page: num },
    });
  };

  return (
    <Pagination className="justify-end py-2 px-2">
      <PaginationContent>
        {!isFirstPage ? (
          <PaginationItem>
            <PaginationPrevious
              // href={pageLink(currentPage - 1)}
              onClick={handlePrevClick}
            />
          </PaginationItem>
        ) : null}

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                // href={pageLink(pageNum)}
                onClick={() => handlePageNumClick(pageNum)}
                isActive={currentPage === pageNum}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )} */}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext
              // href={pageLink(currentPage + 1)}
              onClick={handleNextClick}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ListingPagination;
