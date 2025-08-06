'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/stores/searchStore'
import { searchFeedsIntegrated } from '@/apis/feedApi'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { 
    searchTerm, 
    setSearchTerm, 
    setSearchResults, 
    setIsSearching 
  } = useSearchStore()
  
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    try {
      setIsSearching(true)
      const results = await searchFeedsIntegrated(searchTerm.trim())
      setSearchResults(results)
      onClose()
      // 검색 후 갤러리 페이지로 이동
      router.push('/gallery')
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 z-50">
      <div 
        ref={modalRef}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl border-b-4 border-yellow-400 rounded-b-2xl mt-1 w-96"
      >
        <div className="p-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="제목, 내용, 댓글을 검색하세요..."
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
            <button
              type="submit"
              disabled={!searchTerm.trim()}
              className="px-4 py-1.5 text-sm bg-orange-500 hover:bg-orange-400 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all duration-300"
            >
              검색
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-semibold transition-all duration-300"
            >
              취소
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 