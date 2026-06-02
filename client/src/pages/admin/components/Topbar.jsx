export default function Topbar() {
  return (
    <div
      style={{
        height: 70,
        background: "white",

        borderBottom:
          "1px solid #E2E8F0",

        display: "flex",

        alignItems: "center",

        justifyContent:
          "space-between",

        padding: "0 24px",
      }}
    >
      <h3>Admin Panel</h3>

      <div>Admin</div>
    </div>
  );
}