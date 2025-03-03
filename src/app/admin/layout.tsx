import Navbar from "@/components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className={`bg-black text-white min-h-screen`}>{children}</div>
    </>
  );
}
