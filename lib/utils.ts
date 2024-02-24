export const formatDate = (datestr: string) => {
  const date = new Date(datestr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPage: number) => {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPage - 1, totalPage];
  }

  if (currentPage >= totalPage - 2) {
    return [1, 2, 3, "...", totalPage - 2, totalPage - 1, totalPage];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPage,
  ];
};
