"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCommentsByFeedId } from "@/apis/commentApi";
import { createComment } from "@/apis/commentApi";
import { useUserStore } from "@/stores/userStore";

export default function CommentListPage() {
  const { feed_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((s) => s.user);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      setLoading(true);
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
    <div>
      <h3>내 사진에 대한 피드</h3>
      {comments.length > 0 ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
          {/* 왼쪽: 피드 이미지 */}
          <div>
            <img
              src={comments[0].TB_PHOTO_FEED?.image_url}
              alt="피드 이미지"
              style={{ width: 200, borderRadius: 8, objectFit: "cover" }}
            />
          </div>
          {/* 오른쪽: 댓글 목록 및 입력창 */}
          <div style={{ flex: 1 }}>
            <ul>
              {comments.map((c) => (
                <li key={c.comment_id} style={{ marginBottom: 8 }}>
                  <b>{c.comment}</b>{" "}
                  <span style={{ color: "#888" }}>
                    ({c.TB_USER?.nickname ?? c.user_id},{" "}
                    {c.created_at.slice(0, 19).replace("T", " ")})
                  </span>
                </li>
              ))}
            </ul>
            {/* 댓글 입력 UI */}
            {user ? (
              <div style={{ marginTop: 16 }}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  style={{ width: 500, marginRight: 8 }}
                />
                <button onClick={handleAddComment}>댓글 추가</button>
              </div>
            ) : (
              <div style={{ marginTop: 16, color: "gray" }}>
                로그인 후 댓글을 작성할 수 있습니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        // comments.length === 0일 때
        <div style={{ marginTop: 32 }}>
          <div style={{ marginBottom: 16, color: "#888" }}>
            첫 번째 피드를 입력해주세요
          </div>
          {user ? (
            <div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
                style={{ width: 500, marginRight: 8 }}
              />
              <button onClick={handleAddComment}>댓글 추가</button>
            </div>
          ) : (
            <div style={{ color: "gray" }}>
              로그인 후 댓글을 작성할 수 있습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
