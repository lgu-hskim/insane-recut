"use client";

import { supabase } from "./supabase";
import { useUserStore } from "../stores/userStore";

export function useUserData() {
  const { setLoading, setUser, clearUser } = useUserStore();

  const getUserData = async () => {
    setLoading(true);

    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser({
        user_id: data.user.id,
        nickname: data.user.email ? data.user.email.split("@")[0] : "undefined",
        email: data.user.email ? data.user.email : "undefined",
        created_at: data.user.created_at,
      });
      setLoading(false);
      return { success: true, user: data.user };
    } else {
      clearUser();
      setLoading(false);
      return { success: false, error: "사용자 없음" };
    }
  };

  return { getUserData };
}
