'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { uploadPhoto } from '@/apis/photoApi'
import { createFeed } from '@/apis/feedApi'
import { useUserStore } from '@/stores/userStore'
import { usePhotoStore } from '@/stores/photoStore'

export default function UploadPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const user = useUserStore((s) => s.user)
  const addPhoto = usePhotoStore((s) => s.addPhoto)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('로그인이 필요합니다.')
      return
    }

    if (!imageFile || !title.trim()) {
      setError('이미지와 제목을 입력해주세요.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // TODO: 실제로는 이미지를 Supabase Storage에 업로드하고 URL을 받아야 함
      // 지금은 임시로 data URL 사용
      const imageUrl = imagePreview || ''

      // 사진 데이터 생성
      const photoData = {
        user_id: user.user_id,
        image_url: imageUrl,
        image_title: title,
        taken_at: new Date().toISOString(),
      }

      // 사진 업로드
      const photo = await uploadPhoto(photoData)
      addPhoto(photo)

      // 공개 설정이면 피드도 생성
      if (isPublic) {
        const feedData = {
          photo_id: photo.photo_id,
          user_id: user.user_id,
          rule_id: 'public', // TODO: 실제 공개 규칙 ID 사용
          summary: summary || title,
        }
        await createFeed(feedData)
      }

      // 성공시 갤러리로 이동
      router.push('/gallery')
    } catch (err) {
      setError('업로드에 실패했습니다. 다시 시도해주세요.')
      console.error('Upload error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔐</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-6">사진을 업로드하려면 먼저 로그인해주세요</p>
          <a 
            href="/login" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            로그인하기
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📤 사진 업로드</h1>
        <p className="text-gray-600">소중한 인생네컷을 공유해보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* 이미지 업로드 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            사진 선택
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            required
          />
        </div>

        {/* 이미지 미리보기 */}
        {imagePreview && (
          <div className="mb-6">
            <img
              src={imagePreview}
              alt="미리보기"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* 제목 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="사진 제목을 입력해주세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* 설명 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명 (선택사항)
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="사진에 대한 설명을 입력해주세요"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* 공개 설정 */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              갤러리에 공개하기
            </span>
          </label>
        </div>

        {/* 업로드 버튼 */}
        <button
          type="submit"
          disabled={loading || !imageFile || !title.trim()}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? '업로드 중...' : '📸 업로드하기'}
        </button>
      </form>
    </div>
  )
} 