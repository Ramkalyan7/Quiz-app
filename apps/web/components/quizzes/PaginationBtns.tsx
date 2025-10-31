'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationBtns = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return params.toString();
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      router.push(`${pathname}?${createQueryString(currentPage + 1)}`);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      router.push(`${pathname}?${createQueryString(currentPage - 1)}`);
    }
  };

  return (
    <div className="py-12 flex items-center justify-between gap-4">
      <button
        onClick={goToPrevPage}
        disabled={currentPage <= 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
      >
        Previous
      </button>

      <div className="text-sm text-gray-600 font-medium">
        Page <span className="text-gray-900 font-bold">{currentPage}</span> of <span className="text-gray-900 font-bold">{totalPages}</span>
      </div>

      <button
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBtns;
