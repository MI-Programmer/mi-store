"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationProps } from "@/components/header/Header";
import { classNames } from "@/utils/helper";

const LogoNavigation = ({ navigation }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <div className="ml-14 flex flex-1 items-center justify-start sm:ml-0 sm:items-stretch">
      <div className="flex flex-shrink-0 items-center text-white">
        <Link href="/">MI STORE</Link>
      </div>

      <div className="hidden sm:ml-6 sm:block">
        <div className="flex sm:space-x-2 md:space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={classNames(
                pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoNavigation;
