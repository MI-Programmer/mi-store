import Image from "next/image";
import { Metadata } from "next";

import defaultProfileImage from "/public/default-user.jpg";
import { getUser } from "@/actions/user";

export const metadata: Metadata = { title: "Account" };

const Account = async () => {
  const user = await getUser();
  const name = user?.name ?? "-";
  const email = user?.email;
  const phone = user?.phone ?? "-";
  const shippingAddress = user?.shippingAddress ?? "-";
  const profileImage = user?.image ?? defaultProfileImage;

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-50 p-6 px-8 shadow-md">
      <h1 className="text-center text-4xl font-bold">My Account</h1>

      <div className="mb-12 mt-6 flex flex-col justify-evenly gap-12 text-center sm:flex-row sm:items-start sm:text-start">
        <div className="flex justify-center">
          <div className="relative h-60 w-60 overflow-hidden rounded-full p-1 ring-2 ring-gray-300">
            <Image
              src={profileImage}
              fill
              alt="Profile image"
              className="object-cover"
            />
          </div>
        </div>

        <dl className="max-w-md grow divide-y divide-gray-700 text-gray-900">
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg">Name :</dt>
            <dd className="text-lg font-semibold">{name}</dd>
          </div>
          <div className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg">Email address :</dt>
            <dd className="text-lg font-semibold">{email}</dd>
          </div>
          <div className="flex flex-col py-3">
            <dt className="mb-1 text-gray-500 md:text-lg">
              Shipping address :
            </dt>
            <dd className="text-lg font-semibold">{shippingAddress}</dd>
          </div>
          <div className="flex flex-col pt-3">
            <dt className="mb-1 text-gray-500 md:text-lg">Phone number :</dt>
            <dd className="text-lg font-semibold">{phone}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Account;
