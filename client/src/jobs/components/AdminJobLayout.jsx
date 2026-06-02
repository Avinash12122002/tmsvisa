import AdminSidebar from "../../pages/admin/components/AdminSidebar";

export default function AdminJobLayout({
  children,
}) {
  return (
    <>
      <AdminSidebar />

      <div
        style={{
          marginLeft: 220,
          padding: 24,
        }}
      >
        {children}
      </div>
    </>
  );
}