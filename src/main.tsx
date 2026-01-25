import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 서버 상태 관리 store라고 생각
// 글로벌로 사용되는 캐싱 옵션 추가
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 일반적으로 staleTime은 사용자가 바로 방문시 refetch되게 0으로 설정
      staleTime: 0,
      // gcTime은 보통 5분으로 설정
      gcTime: 5 * 60 * 1000,

      // 원하는 시점에서 stale data refetching
      // 채팅, 주식처럼 실시간 데이터가 변하는게 아니면 보통 Mount만 true로 설정
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
