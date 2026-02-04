import { type ReactNode, useEffect } from "react";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session.ts";
import supabase from "@/lib/supabase.ts";
import GlobalLoader from "@/components/global-loader.tsx";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  // isPending은 data의 데이터 값 유무만 확인
  // isLoading은 queryFn이 실행되면 true로 변경되어 실행
  const { data: profile, isLoading: isProfileLoading } = useProfileData(session?.user.id);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}