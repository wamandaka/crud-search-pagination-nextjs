import { CreateButton } from "@/components/buttons";
import ContactTable from "@/components/contact-table";
import Search from "@/components/search";
import { getContactsPages } from "@/lib/data";
import Pagination from "@/components/pagination";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";

const Contact = async ({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) => {
  const query = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalpages = await getContactsPages(query);
  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalpages={totalpages} />
      </div>
    </div>
  );
};

export default Contact;
