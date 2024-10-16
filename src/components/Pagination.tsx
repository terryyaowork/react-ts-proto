import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;         
  currentPage: number;        
  onPageChange: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';  
  enableJumpByTen?: boolean;
  enableDirectPageInput?: boolean;  // 是否啟用直接頁數跳轉
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  size = 'md',
  enableJumpByTen = false,
  enableDirectPageInput = false,  // 預設為 false
}) => {
  const [inputPage, setInputPage] = useState('');  // 用來儲存輸入的頁數

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const handleJumpToPage = () => {
    const page = parseInt(inputPage);
    if (!isNaN(page)) {
      handlePageChange(page);
      setInputPage('');  // 清空輸入框
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return (
    <div className="flex flex-col items-center my-4">
      <ul className="flex list-none">
        {/* 上一頁 */}
        <li>
          <button
            className={`mx-1 border rounded ${sizeClasses[size]} ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
        </li>

        {/* 前後 10 頁跳轉 */}
        {enableJumpByTen && currentPage > 10 && (
          <li>
            <button
              className={`mx-1 border rounded ${sizeClasses[size]}`}
              onClick={() => handlePageChange(Math.max(currentPage - 10, 1))}
            >
              -10
            </button>
          </li>
        )}

        {/* 頁數按鈕 */}
        {generatePages().map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <button
                className={`mx-1 border rounded ${sizeClasses[size]} ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ) : (
              <span className={`mx-1 ${sizeClasses[size]}`}>...</span>
            )}
          </li>
        ))}

        {/* 後 10 頁跳轉 */}
        {enableJumpByTen && currentPage + 10 <= totalPages && (
          <li>
            <button
              className={`mx-1 border rounded ${sizeClasses[size]}`}
              onClick={() => handlePageChange(Math.min(currentPage + 10, totalPages))}
            >
              +10
            </button>
          </li>
        )}

        {/* 下一頁 */}
        <li>
          <button
            className={`mx-1 border rounded ${sizeClasses[size]} ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>

      {/* 跳轉到指定頁數 */}
      {enableDirectPageInput && (
        <div className="mt-4 flex items-center">
          <input
            type="number"
            className={`border ${sizeClasses[size]} px-2`}
            placeholder="跳至頁數"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
          />
          <button
            className={`btn btn-primary ml-2 ${sizeClasses[size]}`}
            onClick={handleJumpToPage}
          >
            跳轉
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
