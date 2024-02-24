export const TableSkeleton = () => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="px-6 py-3">#</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Phone</th>
          <th className="px-6 py-3">Created At</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="animate-pulse">
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="bg-white border-b border-gray-50">
            <td className="px-6 py-4">
              <div className="h-4 w-4 rounded bg-gray-100"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-32 rounded bg-gray-100"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-20 rounded bg-gray-100"></div>
            </td>
            <td className="px-6 py-4">
              <div className="h-4 w-32 rounded bg-gray-100"></div>
            </td>
            <td className="flex justify-center gap-1 py-3">
              <div className="h-7 w-7 rounded-sm bg-gray-100"></div>
              <div className="h-7 w-7 rounded-sm bg-gray-100"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
