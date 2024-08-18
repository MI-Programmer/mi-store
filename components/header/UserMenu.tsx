import Link from "next/link";
import Image from "next/image";

import defaultUserImg from "@/public/default-user.jpg";
import CartLink from "@/components/cart/CartLink";
import Button from "@/components/ui/Button";
import ButtonAction from "@/components/ui/ButtonAction";
import { auth } from "@/lib/auth";
import { logout } from "@/actions/auth";
import { getUser } from "@/actions/user";

const UserMenu = async () => {
  const session = await auth();
  const user = await getUser(["name", "image"]);
  const userImage = user?.image ?? defaultUserImg;

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="flex items-center space-x-2 md:space-x-4">
        {session?.user ? (
          <>
            <Link
              href="/account"
              className="relative h-11 w-11 overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Image
                src={userImage}
                className="object-cover"
                fill
                alt="User image profile"
              />
            </Link>

            <ButtonAction
              action={logout}
              pending="Loading..."
              success="Logged out successfully"
            >
              Logout
            </ButtonAction>
          </>
        ) : (
          <>
            <Button as="Link" href="/login">
              Login
            </Button>
            <Button as="Link" href="/register">
              Register
            </Button>
          </>
        )}

        <CartLink />
      </div>
    </div>
  );
};

export default UserMenu;
