import Image from "next/image";

import defaultUserImg from "/public/default-user.jpg";
import UpdateRoleForm from "@/components/account/UpdateRoleForm";
import Badge from "@/components/ui/Badge";
import { User } from "@/app/admin/users/page";

const UserItem = ({ user }: { user: User }) => {
  const { name, email, image, role } = user;

  return (
    <li className="flex flex-col items-center justify-between gap-4 gap-x-6 rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm sm:flex-row sm:gap-0">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-50">
          <Image
            src={image ?? defaultUserImg}
            fill
            alt="User image"
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold leading-6 text-gray-900 md:text-2xl">
            {name ?? "No name"}
          </h2>

          <h3 className="mt-1 truncate text-sm leading-5 text-gray-500 md:text-lg">
            {email}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge color={role === "ADMIN" ? "red" : "blue"}>{role}</Badge>

        <UpdateRoleForm user={user as User} />
      </div>
    </li>
  );
};

export default UserItem;
