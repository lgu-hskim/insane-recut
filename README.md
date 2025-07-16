# 인생 RE:cut

## Project Setup

- [Team B 개요](https://www.notion.so/B-2324576d6ffa809eaaeffcc09716d90e?source=copy_link)

```bash
# 프로젝트 pull 받은 경우
$ npm install
$ npm run dev


# 프로젝트 초기 세팅
# 현재 nodejs LTS 22 설치
$ nvm install 22

# 22버전 사용
$ nvm use 22

# 현재 디렉토리에서 nextjs 시작
$ npx create-next-app@latest . --typescript
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack for `next dev`? … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*

# supabase-js, axios, zustand 라이브러리 추가
$ npm install @supabase/supabase-js axios zustand

```
