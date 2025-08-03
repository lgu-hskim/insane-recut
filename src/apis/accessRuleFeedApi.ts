import { supabase } from "@/lib/supabase";

// 사용자의 피드 조회
export async function getFeedsByUserId(userId: string) {
  const { data, error } = await supabase
    .from("view_feed_with_user_rule")
    .select(
      `
      *
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
