"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPublicFeeds } from "@/apis/feedApi";
import { getPhotosOfAll } from "@/apis/photoApi";
import { useUserStore } from "@/stores/userStore";
import { useSearchStore } from "@/stores/searchStore";
import { PhotoFeed } from "@/types/photo";

export default function GalleryPage() {
  const [feeds, setFeeds] = useState<PhotoFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore((s) => s.user);
  const { searchResults, clearSearch } = useSearchStore();

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    try {
      setLoading(true);
      const data = await getPhotosOfAll();
      console.log(data, error, error);
      setFeeds(data as PhotoFeed[]);
    } catch (err) {
      setError("피드를 불러오는데 실패했습니다.");
      console.error("Error loading feeds:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📸</div>
          <p className="text-lg text-gray-600">갤러리를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">😞</div>
          <p className="text-lg text-red-600">{error}</p>
          <button
            onClick={loadFeeds}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📷 갤러리</h1>
        <p className="text-gray-600">모든 사용자들의 인생네컷을 감상해보세요</p>
      </div>

      {/* 검색 결과 또는 전체 피드 표시 */}
      {searchResults ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">검색 결과</h2>
            <button
              onClick={clearSearch}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              전체 보기
            </button>
          </div>

          {/* 피드 검색 결과 */}
          {searchResults.feeds && searchResults.feeds.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">📸 피드 검색 결과</h3>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 justify-center">
                {searchResults.feeds.map((feed: PhotoFeed) => (
                  <div
                    key={feed.feed_id}
                    className="w-[200px] aspect-[2/7] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[2/6] bg-gray-200 flex items-center justify-center">
                      <img
                        src={feed.image_url}
                        alt={feed.summary}
                        className="w-52 h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {feed.title || feed.summary}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{feed.summary}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{new Date(feed.created_at).toLocaleDateString()}</span>
                        <Link
                          href={`/comment/${feed.feed_id}`}
                          className="text-blue-500 hover:text-blue-600 font-medium"
                        >
                          댓글 보기
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 댓글 검색 결과 */}
          {searchResults.comments && searchResults.comments.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">💬 댓글 검색 결과</h3>
              <div className="space-y-4">
                {searchResults.comments.map((comment: any) => (
                  <div key={comment.comment_id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={comment.TB_PHOTO_FEED?.image_url}
                          alt="피드 이미지"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 mb-2">{comment.comment}</p>
                        <div className="text-sm text-gray-500">
                          <span>작성자: {comment.TB_USER?.nickname}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2">
                          <Link
                            href={`/comment/${comment.feed_id}`}
                            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                          >
                            전체 댓글 보기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 검색 결과가 없는 경우 */}
          {((!searchResults.feeds || searchResults.feeds.length === 0) && 
            (!searchResults.comments || searchResults.comments.length === 0)) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                검색 결과가 없습니다
              </h2>
              <p className="text-gray-600">다른 검색어를 시도해보세요.</p>
            </div>
          )}
        </div>
      ) : (
        // 기존 갤러리 표시
        feeds.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📷</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              아직 공유된 사진이 없어요
            </h2>
            <p className="text-gray-600 mb-6">첫 번째 사진을 업로드해보세요!</p>
            {user && (
              <a
                href="/upload"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                📤 사진 업로드하기
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 justify-center">
            {feeds.map((feed) => (
              <div
                key={feed.feed_id}
                className="w-[200px] aspect-[2/7] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[2/6] bg-gray-200 flex items-center justify-center">
                  <img
                    src={feed.image_url}
                    alt={feed.summary}
                    className="w-52 h-full object-contain rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {feed.title || feed.summary}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{feed.summary}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(feed.created_at).toLocaleDateString()}</span>
                    <Link
                      href={`/comment/${feed.feed_id}`}
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      댓글 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
