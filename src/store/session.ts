import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import type { Session } from "@supabase/supabase-js";

type State = {
  isLoaded: boolean,
  session: Session | null
}

// as로 타입 단언을 한 이유는 느슨한 검사가 이루어지기 때문에 확장성 측면에서 좋음
const initialState = {
  isLoaded: false,
  session: null
} as State;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        // 로그아웃 상황이 발생할 수 있어 null 타입도 포함시킴
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        }
      }
    })),
    // 옵션 객체
    {
      name: "sessionStore"
    }
  )
);

// sessionState에 접근하는 커스텀 훅
export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};

export const useIsSessionLoaded = () => {
  const isSessionLoaded = useSessionStore((store) => store.isLoaded);
  return isSessionLoaded;
};

export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);
  return setSession;
};