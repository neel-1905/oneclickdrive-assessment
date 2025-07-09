import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const ListingPagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const pageLink = (page: number) => `/dashboard?page=${page}`;

  const isFirstPage = currentPage === 1;

  return (
    <Pagination className="justify-end py-2">
      <PaginationContent>
        {!isFirstPage ? (
          <PaginationItem>
            <PaginationPrevious href={pageLink(currentPage - 1)} />
          </PaginationItem>
        ) : null}

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={pageLink(pageNum)}
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

        <PaginationItem>
          <PaginationNext href={pageLink(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ListingPagination;
