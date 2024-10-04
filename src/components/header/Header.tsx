import { Disclosure } from "@headlessui/react";

import ButtonMenuMobile from "@/components/header/MobileMenuButton";
import UserMenu from "@/components/header/UserMenu";
import LogoNavigation from "@/components/header/LogoNavigation";
import MobileNavigation from "@/components/header/MobileNavigation";
import { getUser } from "@/actions/user";

export interface NavigationProps {
  navigation: { name: string; href: string }[];
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Admin", href: "/admin/user-orders" },
];

const Header = async () => {
  const user = await getUser(["role"]);

  const allowNavigation =
    user?.role === "ADMIN"
      ? navigation
      : navigation.slice(0, navigation.length - 1);

  return (
    <header className="sticky top-0 z-50 w-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <ButtonMenuMobile />

            <LogoNavigation navigation={allowNavigation} />

            <UserMenu />
          </div>
        </div>

        <MobileNavigation navigation={allowNavigation} />
      </Disclosure>
    </header>
  );
};

export default Header;
