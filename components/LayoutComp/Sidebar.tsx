import { SIDEBAR_MENU } from "@/util/constants";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  closeMobileSidebar: () => void;
}

export function Sidebar({
  isOpen,
  isMobileOpen,
  closeMobileSidebar,
}: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed pt-16 left-0 h-screen bg-gray-800 text-white transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"} overflow-hidden z-30`}
      >
        <SidebarContent isOpen={isOpen} />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={closeMobileSidebar}
        >
          <aside
            className="w-64 h-full bg-gray-800 text-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent isOpen={true} />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="mt-4 space-y-4 px-2">
      {SIDEBAR_MENU.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center space-x-2"
        >
          <div key={item.name} className="flex items-center space-x-2">
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
