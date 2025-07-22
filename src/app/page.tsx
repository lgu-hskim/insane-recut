import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg p-8 mb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            📸 인생 RE:cut
          </h1>
          <p className="text-xl mb-6">
            당신의 소중한 순간을 4컷으로 기록하세요
          </p>
          <div className="space-x-4">
            <Link 
              href="/upload"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-medium inline-block transition-colors"
            >
              📷 사진 촬영하기
            </Link>
            <Link 
              href="/gallery"
              className="bg-white hover:bg-gray-100 text-purple-600 px-6 py-2 rounded-md font-medium inline-block transition-colors"
            >
              🖼️ 갤러리 보기
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">지금 바로 시작해보세요!</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link 
            href="/upload"
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
          >
            📤 사진 업로드
          </Link>
          <Link 
            href="/gallery"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
          >
            📷 갤러리 둘러보기
          </Link>
        </div>
      </div>
    </div>
  )
}
