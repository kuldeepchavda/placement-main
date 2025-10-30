import { Link } from "react-router-dom";
export default function ListCard({
  item,
  index,
  type,
  headerContent,
  bodyContent,
  idKey = "_id",
  edit
}) {
  const id = item[idKey];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  return (
    <div
      key={id}
      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.02] min-w-[300px] w-full lg:w-5/12"
    >
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1 font-bold rounded-full flex-shrink-0">
            #{index + 1}
          </span>
          <div>
            {headerContent}
          </div>
        </div>
       {edit && <Link
          to={`/${type}/${id}`}
          className="py-1 px-3 bg-blue-600 rounded-lg text-white text-sm font-medium hover:bg-blue-700 transition duration-200 flex-shrink-0"
        >
          Edit
        </Link>}
      </div>

      {bodyContent}

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 border-t pt-3 mt-4">
        <p>
          <span className="font-medium">ID:</span> {id?.substring(0, 8)}...
        </p>
        <div>
          <p>
            <span className="font-medium">Created:</span>{" "}
            {formatDate(item.createdAt)}
          </p>
          <p>
            <span className="font-medium">Updated:</span>{" "}
            {formatDate(item.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}