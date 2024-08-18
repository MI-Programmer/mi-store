"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DisclosureButton, DisclosurePanel } from "@headlessui/react";

import { NavigationProps } from "@/components/header/Header";
import { classNames } from "@/utils/helper";

const MobileNavigation = ({ navigation }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className={classNames(
              pathname === item.href
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-md px-3 py-2 text-base font-medium",
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </DisclosurePanel>
  );
};

export default MobileNavigation;
