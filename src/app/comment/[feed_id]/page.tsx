"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCommentsByFeedId } from "@/apis/commentApi";
import { createComment } from "@/apis/commentApi";
import { useUserStore } from "@/stores/userStore";
import { getFeedById } from "@/apis/feedApi";

export default function CommentListPage() {
  const { feed_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((s) => s.user);
  const [newComment, setNewComment] = useState("");
  const [feedData, setFeedData] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);

      // 피드 정보 가져오기
      const feed = await getFeedById(feed_id);
      setFeedData(feed);

      const commentData = await getCommentsByFeedId(feed_id);
      console.log("commentData:", commentData);
      setComments(commentData);
      setLoading(false);
    }
    if (feed_id) fetchComments();
  }, [feed_id]);

  // 댓글 추가 핸들러
  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;
    try {
      await createComment({
        user_id: user.user_id,
        feed_id,
        comment: newComment,
      });
      setNewComment("");
      // 댓글 목록 새로고침
      const commentData = await getCommentsByFeedId(feed_id);
      setComments(commentData);
    } catch (e) {
      alert("댓글 추가 실패: " + (e.message || e));
    }
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">✏️ 댓글</h1>
          <p className="text-gray-600">사진에 대한 의견을 나누어보세요</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* 왼쪽: 피드 이미지 */}
            <div className="lg:w-1/3 p-6 bg-gray-50">
              <div className="aspect-[2/6] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={feedData?.image_url}
                  alt="피드 이미지"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              {feedData && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {feedData.image_title || "제목 없음"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {feedData.summary}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(feedData.created_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* 오른쪽: 댓글 목록 및 입력창 */}
            <div className="lg:w-2/3 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  댓글 ({comments.length})
                </h2>

                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div
                        key={c.comment_id}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium mb-1">
                              {c.comment}
                            </p>
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="font-medium">
                                {c.TB_USER?.nickname ?? c.user_id}
                              </span>
                              <span className="mx-2">•</span>
                              <span>
                                {new Date(c.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">💭</div>
                    <p className="text-gray-600 mb-2">아직 댓글이 없어요</p>
                    <p className="text-sm text-gray-500">
                      첫 번째 댓글을 작성해보세요!
                    </p>
                  </div>
                )}
              </div>

              {/* 댓글 입력 UI */}
              {user ? (
                <div className="border-t pt-6">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="댓글을 입력하세요..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddComment()
                      }
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                    >
                      댓글 작성
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t pt-6 text-center">
                  <p className="text-gray-600 mb-2">
                    댓글을 작성하려면 로그인이 필요합니다
                  </p>
                  <a
                    href="/login"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    로그인하기
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
