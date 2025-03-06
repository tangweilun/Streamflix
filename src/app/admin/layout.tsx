import AdminNavbar from "@/components/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      <div className={`bg-black text-white min-h-screen pt-16`}>{children}</div>
    </>
  );
}
