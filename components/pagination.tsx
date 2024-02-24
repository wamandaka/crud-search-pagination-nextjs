"use client";

import Link from "next/link";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { generatePagination } from "@/lib/utils";

const Pagination = ({ totalpages }: { totalpages: number }) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: string | number) => {
    const param = new URLSearchParams(searchParams);
    param.set("page", pageNumber.toString());
    return `${pathName}?${param.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalpages);
  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "rounded-l-sm": position === "first" || position === "single",
        "rounded-r-sm": position === "last" || position === "single",
        "z-10 bg-blue-100 border-blue-500 text-white": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300 pointer-eventnone": position === "middle",
      }
    );
    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };
  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "pointer-events-none text-gray--300": isDisabled,
        "hover:bg-gray-100": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );
    const icon =
      direction === "left" ? (
        <HiChevronDoubleLeft size={20} />
      ) : (
        <HiChevronDoubleRight size={20} />
      );
    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };
  return (
    <div className="inline-flex">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction="left"
        isDisabled={currentPage <= 1}
      />
      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "middle" | "single" | undefined;
          if (index === 0) {
            position = "first";
          } else if (index === allPages.length - 1) {
            position = "last";
          } else if (allPages.length === 1) {
            position = "single";
          } else {
            position = "middle";
          }
          return (
            <PaginationNumber
              key={index}
              page={page}
              href={createPageURL(page)}
              position={position}
              isActive={page === currentPage}
            />
          );
        })}
      </div>
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction="right"
        isDisabled={currentPage >= totalpages}
      />
    </div>
  );
};

export default Pagination;
