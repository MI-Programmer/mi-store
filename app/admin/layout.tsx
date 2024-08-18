import { redirect } from "next/navigation";
import { LayoutProps } from "@/.next/types/app/layout";
import {
  ClipboardDocumentCheckIcon,
  CubeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import TabsAccount from "@/components/account/TabsAccount";
import { getUser } from "@/actions/user";

const tabs = [
  {
    value: "/admin/user-orders",
    label: "User orders",
    icon: <ClipboardDocumentCheckIcon className="h-6 w-6" />,
  },
  {
    value: "/admin/products",
    label: "Products",
    icon: <CubeIcon className="h-6 w-6" />,
  },
  {
    value: "/admin/users",
    label: "Users",
    icon: <UserIcon className="h-6 w-6" />,
  },
];

const Layout = async ({ children }: LayoutProps) => {
  const user = await getUser(["role"]);
  if (user?.role !== "ADMIN") return redirect("/");

  return (
    <>
      <TabsAccount tabs={tabs} />

      <div className="mt-4 p-4">{children}</div>
    </>
  );
};

export default Layout;
