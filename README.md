# 인생 RE:cut

인생을 다시 편집하는 커뮤니티 플랫폼

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + DaisyUI
- **Database**: Supabase
- **State Management**: Zustand
- **Form Management**: React Hook Form + Zod

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router
├── components/       # 재사용 가능한 컴포넌트
├── lib/             # 유틸리티 및 설정 (Supabase 클라이언트 등)
├── types/           # TypeScript 타입 정의
├── stores/          # Zustand 상태 관리
└── apis/           # API 호출 함수들
```

## 환경 설정

1. `.env.local` 파일을 생성하고 Supabase 설정을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 개발 서버

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 주요 기능

- [ ] 사용자 인증 (로그인/회원가입)
- [ ] 게시판 기능
- [ ] 상품 관리
- [ ] 장바구니 기능
- [ ] 사용자 프로필 관리

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
