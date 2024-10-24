export interface OrderItem {
  id: string;
  product: { image: string; name: string; price: number };
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
