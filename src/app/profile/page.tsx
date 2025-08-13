"use client";

import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const user = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const router = useRouter();

  const handleLogout = () => {
    clearUser();
    router.push('/');
  };

  return (
    <div className="min-h-[350px] py-16 px-2 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-10 flex items-center space-x-12 flex-col">
        <div className="flex items-center space-x-10 w-full">
          <span className="text-[5rem] mr-2">👤</span>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-3">
              {user?.nickname || "닉네임 없음"}
            </div>
            <div className="text-gray-600 text-lg mb-2">
              ID: <span className="font-mono">{user?.user_id || "-"}</span>
            </div>
            <div className="text-gray-600 text-lg">
              이메일: {user?.email || "없음"}
            </div>
          </div>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="mt-8 px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            로그아웃
          </button>
        ) : (
          <div className="text-2xl text-gray-500 font-medium mt-8">
            로그인된 사용자가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
