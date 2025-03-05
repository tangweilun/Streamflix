import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div
        className={`bg-black text-white min-h-screen overflow-x-hidden pt-16`}
      >
        {children}
      </div>
    </>
  );
}
