import { Metadata } from "next";

import defaultProfileImage from "/public/default-user.jpg";
import UpdateImageForm from "@/components/account/UpdateImageForm";
import AccountSettingsForm from "@/components/account/AccountSettingsForm";
import { getUser } from "@/actions/user";

export const metadata: Metadata = { title: "Settings" };

export interface UserData {
  name: string | null;
  email: string;
  image?: string | null;
  phone: string | null;
  shippingAddress: string | null;
}

const Settings = async () => {
  const user = await getUser([
    "name",
    "email",
    "phone",
    "shippingAddress",
    "image",
  ]);
  const profileImage = user?.image ?? defaultProfileImage;

  return (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 pb-8 shadow-md sm:px-8 sm:py-6">
      <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
        Settings
      </h1>

      <div className="flex flex-col justify-center gap-8 sm:flex-row sm:items-start">
        <UpdateImageForm image={profileImage} />

        <AccountSettingsForm userData={user as UserData} />
      </div>
    </div>
  );
};

export default Settings;
