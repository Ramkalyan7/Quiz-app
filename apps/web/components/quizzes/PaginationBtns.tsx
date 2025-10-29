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
    <div className="py-12 flex flex-row justify-between items-center">
      <button
        onClick={goToPrevPage}
        disabled={currentPage <= 1}
        className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={goToNextPage}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};


export default PaginationBtns;