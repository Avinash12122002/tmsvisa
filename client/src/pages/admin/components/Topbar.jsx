import {
  Bell,
  Search,
  User,
} from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        bg-white
        border-b
        border-slate-200
        px-4
        md:px-8
        h-[70px]
        flex
        items-center
        justify-between
        sticky
        top-0
        z-30
      "
    >
      {/* Left Side */}

      <div
        className="
          flex
          items-center
          gap-4
          ml-16
          md:ml-0
        "
      >
        <div>
          <h1
            className="
              text-xl
              font-bold
              text-slate-800
            "
          >
            Admin Panel
          </h1>

          <p
            className="
              text-sm
              text-slate-500
              hidden
              md:block
            "
          >
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Search */}

      <div
        className="
          hidden
          lg:flex
          items-center
          bg-slate-100
          rounded-xl
          px-4
          py-2
          w-[350px]
        "
      >
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          type="text"
          placeholder="Search..."
          className="
            bg-transparent
            outline-none
            ml-2
            w-full
          "
        />
      </div>

      {/* Right Side */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <button
          className="
            relative
            p-2
            rounded-lg
            hover:bg-slate-100
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              top-1
              right-1
              w-2
              h-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
            "
          >
            <User size={18} />
          </div>

          <div className="hidden md:block">
            <div className="font-semibold text-slate-800">
              Admin
            </div>

            <div className="text-xs text-slate-500">
              Super Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}