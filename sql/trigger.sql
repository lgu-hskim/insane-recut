DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_insane_recut_user;

-- 유저 생성후 TB_USER에 유저 추가 함수
CREATE OR REPLACE FUNCTION public.handle_new_insane_recut_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."TB_USER" (user_id, nickname, email, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    split_part(NEW.email, '@', 1),
    timezone('utc', now())
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 유저 생성후 TB_USER에 유저 추가 함수 트리거
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_insane_recut_user();