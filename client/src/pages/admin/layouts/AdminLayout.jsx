import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-100 h-screen overflow-hidden">
      {/* Mobile Hamburger */}

      <button
        onClick={() => setSidebarOpen(true)}
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-[100]
          bg-blue-600
          text-white
          w-12
          h-12
          rounded-lg
          shadow-lg
          flex
          items-center
          justify-center
          text-xl
        "
      >
        ☰
      </button>

      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className="
          md:ml-[280px]
          h-screen
          flex
          flex-col
        "
      >
        <Topbar />

        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            md:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
