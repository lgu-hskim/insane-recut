import { supabase } from "@/lib/supabase";
import { PhotoFeed } from "@/types/photo";

// 피드 생성
export async function createFeed(
  feedData: Omit<PhotoFeed, "feed_id" | "created_at">
) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .insert([feedData])
    .select()
    .single();

  if (error) throw error;
  return data as PhotoFeed;
}

// 모든 공개 피드 조회 (사진 정보와 함께)
export async function getPublicFeeds() {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .select(
      `
      *,
      TB_PHOTO (*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 사용자의 피드 조회
export async function getFeedsByUserId(userId: string) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .select(
      `
      *,
      TB_PHOTO (*)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// 특정 피드 조회
export async function getFeedById(feedId: string) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .select("*")
    .eq("feed_id", feedId)
    .single();

  if (error) throw error;
  return data;
}

// 피드 업데이트
export async function updateFeed(
  feedId: string,
  updates: Partial<Omit<PhotoFeed, "feed_id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .update(updates)
    .eq("feed_id", feedId)
    .select()
    .single();

  if (error) throw error;
  return data as PhotoFeed;
}

// 피드 삭제
export async function deleteFeed(feedId: string) {
  const { error } = await supabase
    .from("TB_PHOTO_FEED")
    .delete()
    .eq("feed_id", feedId);
  if (error) throw error
}

// 피드 summary 검색
export async function searchFeedsBySummary(searchTerm: string) {
  console.log('Searching feeds with term:', searchTerm);
  
  const { data, error } = await supabase
    .from('TB_PHOTO_FEED')
    .select('*')
    .ilike('summary', `%${searchTerm}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Feed search error:', error);
    throw error;
  }
  
  console.log('Feed search results:', data);
  return data
} 