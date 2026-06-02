export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <button
        disabled={
          currentPage === 1
        }
        onClick={() =>
          onPageChange(
            currentPage - 1
          )
        }
        className="px-4 py-2 border rounded"
      >
        Previous
      </button>

      {[...Array(totalPages)].map(
        (_, index) => (
          <button
            key={index}
            onClick={() =>
              onPageChange(
                index + 1
              )
            }
            className={`px-4 py-2 rounded ${
              currentPage ===
              index + 1
                ? "bg-red-600 text-white"
                : "border"
            }`}
          >
            {index + 1}
          </button>
        )
      )}

      <button
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1
          )
        }
        className="px-4 py-2 border rounded"
      >
        Next
      </button>
    </div>
  );
}