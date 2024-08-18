import { LayoutProps } from "@/.next/types/app/layout";
import {
  CogIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import TabsAccount from "@/components/account/TabsAccount";

const tabs = [
  {
    value: "/account",
    label: "Account",
    icon: <UserCircleIcon className="h-6 w-6" />,
  },
  {
    value: "/account/orders",
    label: "Orders",
    icon: <ShoppingBagIcon className="h-6 w-6" />,
  },
  {
    value: "/account/settings",
    label: "Settings",
    icon: <CogIcon className="h-6 w-6" />,
  },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <TabsAccount tabs={tabs} />

      <div className="mt-4 p-4">{children}</div>
    </>
  );
};

export default Layout;
