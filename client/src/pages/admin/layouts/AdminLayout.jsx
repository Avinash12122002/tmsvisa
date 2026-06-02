import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout({
  children,
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F7FB",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          marginLeft: 210,  // ← add this
          flex: 1,
        }}
      >
        <Topbar />

        <div
          style={{
            padding: 24,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}