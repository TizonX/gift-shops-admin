import type { Metadata } from "next";
import "../globals.css";
import LayoutShell from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "Gift-Shops Admin",
  description: "Gift-Shops Admin Dashboard",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LayoutShell>{children}</LayoutShell>
    </div>
  );
}
