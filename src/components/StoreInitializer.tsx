"use client";

import { useEffect } from "react";
import { hydrateUserStore } from "@/stores/userStore";

export default function StoreInitializer() {
  useEffect(() => {
    // localStorage에서 사용자 정보를 로드
    hydrateUserStore();
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않고 초기화만 수행
  return null;
}