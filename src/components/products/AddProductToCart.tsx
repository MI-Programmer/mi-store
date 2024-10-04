"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

import Button from "@/components/ui/Button";
import ButtonIcon from "@/components/ui/ButtonIcon";
import { useCart } from "@/contexts/CartContext";

interface AddProductToCartProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    colors: string[];
    sizes: { name: string; inStock: boolean }[];
  };
}

const AddProductToCart = ({
  product: { id, name, price, image, colors, sizes },
}: AddProductToCartProps) => {
  const {
    cartItemQuantity,
    addCartItem,
    deleteCartItem,
    incCartItemQuantity,
    decCartItemQuantity,
  } = useCart();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const quantity = cartItemQuantity(id);

  const handleAddCartItem = () => {
    addCartItem({ id, name, image, price, selectedColor, selectedSize });
    toast.success(`Sucessfully added "${name}" to cart`);
  };

  const handleDeleteCartItem = () => {
    deleteCartItem(id);
    toast.success(`Sucessfully deleted "${name}" from cart`);
  };

  return (
    <>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Available Colors:
        </h3>
        <div className="mt-2 flex gap-2">
          {colors.map((color, index) => (
            <Button
              key={index}
              type={color === selectedColor ? "primary" : "secondary"}
              size="small"
              spinner={false}
              onClick={() => setSelectedColor(color)}
              disabled={Boolean(quantity)}
            >
              {color}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Available Sizes:
        </h3>
        <div className="mt-2 flex gap-2">
          {sizes.map((size, index) => (
            <Button
              key={index}
              type={size.name === selectedSize.name ? "primary" : "secondary"}
              size="small"
              spinner={false}
              onClick={() => setSelectedSize(size)}
              disabled={Boolean(quantity)}
            >
              {size.name} {size.inStock ? "" : "(Out of Stock)"}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        {quantity ? (
          <Button size="large" type="danger" onClick={handleDeleteCartItem}>
            Delete
          </Button>
        ) : (
          <Button size="large" onClick={handleAddCartItem}>
            Add to Cart
          </Button>
        )}

        {quantity && (
          <div className="flex items-center gap-2">
            <ButtonIcon onClick={() => decCartItemQuantity(id)}>
              <MinusIcon className="h-4 w-4" />
            </ButtonIcon>

            <p className="w-5 text-center">{quantity}</p>

            <ButtonIcon onClick={() => incCartItemQuantity(id)}>
              <PlusIcon className="h-4 w-4" />
            </ButtonIcon>
          </div>
        )}
      </div>
    </>
  );
};

export default AddProductToCart;
