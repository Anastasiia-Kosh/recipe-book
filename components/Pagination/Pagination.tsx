"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import Icon from "../Icon/Icon";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages,
  );




  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => handlePageChange(selected + 1)}
      forcePage={safeCurrentPage  - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel={<Icon name="arrow-right" size={20} />}
      previousLabel={<Icon name="arrow-left" size={20} />}
    />
  );
}
