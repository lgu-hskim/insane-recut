"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string, searchType: 'feed' | 'comment') => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<'feed' | 'comment'>('feed');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim(), searchType);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("", searchType);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="검색어를 입력하세요..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'feed' | 'comment')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          >
            <option value="feed">피드 검색</option>
            <option value="comment">댓글 검색</option>
          </select>
          
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-6 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {isLoading ? "검색 중..." : "검색"}
          </button>
        </div>
      </form>
    </div>
  );
} 