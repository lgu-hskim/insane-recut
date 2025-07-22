export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <div className="text-8xl mb-6">📸</div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">페이지를 찾을 수 없습니다</h2>
        <p className="text-lg opacity-90">
          찾으시는 페이지가 삭제되었거나 주소가 변경되었습니다.
        </p>
      </div>
    </div>
  )
} 