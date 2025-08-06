import { supabase } from "@/lib/supabase";
import { Photo } from "@/types/photo";

// 사진 업로드
export async function uploadPhoto(
  photoData: Omit<Photo, "photo_id" | "created_at">
) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .insert([photoData])
    .select()
    .single();

  if (error) throw error;
  return data as Photo;
}

// 모든 사진 조회
export async function getPhotosOfAll() {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Photo[];
}

// 사용자의 모든 사진 조회
export async function getPhotosByUserId(userId: string) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Photo[];
}

// 특정 사진 조회
export async function getPhotoById(photoId: string) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .select("*")
    .eq("photo_id", photoId)
    .single();

  if (error) throw error;
  return data as Photo;
}

// 사진 정보 업데이트
export async function updatePhoto(
  photoId: string,
  updates: Partial<Omit<Photo, "photo_id" | "created_at">>
) {
  const { data, error } = await supabase
    .from("TB_PHOTO_FEED")
    .update(updates)
    .eq("photo_id", photoId)
    .select()
    .single();

  if (error) throw error;
  return data as Photo;
}

// 사진 삭제
export async function deletePhoto(photoId: string) {
  const { error } = await supabase
    .from("TB_PHOTO_FEED")
    .delete()
    .eq("photo_id", photoId);

  if (error) throw error;
}
