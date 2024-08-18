import { Suspense } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Metadata } from "next";

import UserItem from "@/components/account/UserItem";
import Filter from "@/components/ui/Filter";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/ui/Pagination";
import { getAllUsers, getUsersLength } from "@/actions/user";

export const metadata: Metadata = { title: "Users" };

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
}

const filters = [
  { value: "ALL", label: "All" },
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

const Users = async ({ searchParams }: { searchParams: Params }) => {
  const page = Number(searchParams.page) || 1;
  const filter = searchParams.filter ?? "ALL";

  const users = await getAllUsers(page, filter);

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-50 px-8 py-6 shadow-md">
      <div className="mb-6 flex justify-between">
        <h1 className="text-center text-4xl font-bold">All Users</h1>

        <Filter filterOptions={filters} />
      </div>

      <Suspense fallback={<Spinner mini={false} />} key={page + filter}>
        <ul role="list" className="space-y-4">
          {users.map((user) => (
            <UserItem key={user.id} user={user as User} />
          ))}
        </ul>

        <Pagination
          page={page}
          filter={filter}
          getItemsLength={getUsersLength}
        />
      </Suspense>
    </div>
  );
};

export default Users;
