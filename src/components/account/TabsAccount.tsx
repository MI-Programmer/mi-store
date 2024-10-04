"use client";

import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

interface TabsAccountProps {
  tabs: { value: string; label: string; icon: ReactNode }[];
}

const TabsAccount = ({ tabs }: TabsAccountProps) => {
  const activeTab = usePathname();
  const router = useRouter();

  const handleChangeTab = (value: string) => {
    router.replace(value, { scroll: false });
  };

  return (
    <div className="text-center">
      <div className="relative inline-flex gap-1 overflow-hidden rounded-md border border-gray-300 p-1 shadow-sm shadow-gray-500/25">
        {tabs.map(({ value, label, icon }) => (
          <button
            key={label}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-indigo-500 hover:text-white disabled:cursor-not-allowed ${activeTab === value && "bg-indigo-600 text-white hover:bg-indigo-600"}`}
            onClick={() => handleChangeTab(value)}
            disabled={activeTab === value}
          >
            {icon} <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsAccount;
