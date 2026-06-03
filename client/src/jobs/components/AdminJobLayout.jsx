import AdminSidebar from "../../pages/admin/components/AdminSidebar";

export default function AdminJobLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      {/* Main content — offset for desktop sidebar */}
      <main className="flex-1 md:ml-[220px] mt-[56px] md:mt-0 p-5 md:p-8">
        {children}
      </main>
    </div>
  );
}