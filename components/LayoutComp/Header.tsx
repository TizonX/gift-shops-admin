import DarkModeToggle from "./DarkMode";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export function Header({
  isSidebarOpen,
  toggleSidebar,
  toggleMobileSidebar,
}: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-4 shadow z-40 transition-all duration-300
      ${isSidebarOpen ? "md:ml-64 " : "md:ml-20 "} ml-0 `}
    >
      {/* Toggle sidebar */}
      <button onClick={toggleSidebar} className="hidden md:block mr-4">
        <svg
          className={`w-6 h-6`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile menu button */}
      <button onClick={toggleMobileSidebar} className="md:hidden mr-4">
        <svg
          className={`w-6 h-6`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <h1 className="text-xl font-semibold">Gift Shop</h1>
      <div>
        <DarkModeToggle />
      </div>
    </header>
  );
}
