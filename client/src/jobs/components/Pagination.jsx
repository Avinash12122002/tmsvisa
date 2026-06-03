export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-8 flex-wrap" aria-label="Pagination">

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600
                   bg-white border border-gray-200 rounded-lg shadow-sm
                   hover:border-red-500 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200
                          ${currentPage === page
                            ? "bg-red-600 text-white shadow-md shadow-red-200 scale-105"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-600"
                          }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600
                   bg-white border border-gray-200 rounded-lg shadow-sm
                   hover:border-red-500 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <span className="hidden sm:inline">Next</span>
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  );
}