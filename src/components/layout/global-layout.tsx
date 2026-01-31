import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import defaultAvatar from "@/assets/default-avatar.png";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-15 border-b">
        <div className="flex h-full justify-between max-w-175 w-full m-auto px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="h-5" src={logo} alt="로고" />
            <div className="font-bold">한입 로그</div>
          </Link>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img className="h-6" src={defaultAvatar} alt="사용자 이미지" />
          </div>
        </div>
      </header>
      <main className="flex-1 m-auto w-full max-w-175 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t py-10 text-muted-foreground text-center">
        @kaeuhy
      </footer>
    </div>
  );
}
