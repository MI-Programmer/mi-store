import { getUser } from "@/actions/user";
import CartCheckout from "@/components/cart/CartCheckout";
import CartList from "@/components/cart/CartList";

export interface UserTypes {
  name: string | null;
  email: string;
  phone: string | null;
  shippingAddress: string | null;
}

const Cart = async () => {
  const user = await getUser(["name", "email", "phone", "shippingAddress"]);

  return (
    <div className="mx-auto max-w-6xl rounded-lg border border-gray-200 bg-gray-50 px-8 py-6 max-md:max-w-xl">
      <h1 className="text-center text-4xl font-bold">Shopping Cart</h1>

      <div className="mt-10 flex flex-col gap-8 md:flex-row">
        <CartList />

        <CartCheckout user={user as UserTypes} />
      </div>
    </div>
  );
};

export default Cart;
