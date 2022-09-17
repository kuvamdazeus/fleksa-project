import { useRecoilState } from "recoil";
import { cartAtom } from "../state";
import CartProduct from "./CartProduct";

export default function Cart() {
  const [cart, setCart] = useRecoilState(cartAtom);

  const cartItems = Array.from(new Set(cart.map((cartProduct) => cartProduct.id))).map((productId) =>
    cart.find((cartProduct) => cartProduct.id === productId)
  );

  let total = 0;
  cart.forEach((product) => (total += product.price));

  return (
    <div className="h-screen w-96 pb-48 sticky top-24 overflow-y-scroll">
      <p className="text-center text-2xl font-bold border-b pt-3 pb-5">Your Cart</p>

      {cartItems.length === 0 && (
        <>
          <img src="/cart-empty.svg" className="object-contain w-full" />
          <p className="text-[14px] text-gray-500 text-center w-full mb-5">
            Please select at least one product to place an order
          </p>
        </>
      )}

      {cartItems.length > 0 && (
        <div className="py-5 border-b mb-5">
          {cartItems.map((product) => (
            <CartProduct {...product} />
          ))}

          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Total</p>
            <p className="font-bold text-xl">{total.toFixed(2)} €</p>
          </div>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="w-full py-3 bg-black rounded mb-5 cursor-pointer">
          <p className="text-white font-bold text-center">Checkout</p>
        </div>
      )}

      <section className="flex flex-col items-center">
        <img src="/payment-providers.png" className="w-96 object-contain" />
      </section>
    </div>
  );
}
