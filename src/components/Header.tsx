'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores/userStore'

export default function Header() {
  const user = useUserStore((s) => s.user)

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl border-b-4 border-yellow-400 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-white hover:text-yellow-300 transition-colors no-underline">
              📸 인생 RE:cut
            </Link>
          </div>
          
          {/* 메뉴 - 오른쪽에 배치 */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="bg-blue-500 text-white hover:bg-blue-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 no-underline"
            >
              🏠 홈
            </Link>
            <Link
              href="/gallery"
              className="bg-green-500 text-white hover:bg-green-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 no-underline"
            >
              📷 갤러리
            </Link>
            <Link
              href="/upload"
              className="bg-purple-500 text-white hover:bg-purple-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 no-underline"
            >
              📤 업로드
            </Link>
            
            {/* 로그인/회원가입 */}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 no-underline"
                >
                  🔐 로그인
                </Link>
                <Link
                  href="/signup"
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 shadow-lg no-underline"
                >
                  ✨ 회원가입
                </Link>
              </>
            ) : (
              <Link
                href="/profile"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 no-underline"
              >
                👤 내 정보
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 