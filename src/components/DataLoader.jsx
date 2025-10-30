export default function DataLoader({
  loading,
  error,
  data,
  emptyMessage,
  children,
}) {
  const isDataEmpty = !loading && data && data.length === 0;

  if (loading) {
    return (
      <div className="w-4/5 mx-auto py-12 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading data, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-4/5 mx-auto py-12 text-center p-6 bg-red-50 border border-red-300 rounded-lg">
        <p className="text-red-700 font-semibold text-lg"> Error Loading Data</p>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );
  }

  if (isDataEmpty) {
    return (
      <div className="w-4/5 mx-auto py-12 text-center p-6 bg-gray-50 border border-gray-300 rounded-lg">
        <p className="text-gray-700 font-medium text-lg">  Nothing to show here.</p>
        <p className="text-gray-500 mt-2">{emptyMessage || "No records found."}</p>
      </div>
    );
  }

  return children;
}