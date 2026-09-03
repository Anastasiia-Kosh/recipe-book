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
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel={<Icon name="arrow-right" size={20} />}
      previousLabel={<Icon name="arrow-left" size={20} />}
    />
  );
}
