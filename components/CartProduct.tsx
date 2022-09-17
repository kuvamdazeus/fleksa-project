import { useRecoilState } from "recoil";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { cartAtom } from "../state";

export default function CartProduct(product: any) {
  const [cart, setCart] = useRecoilState(cartAtom);

  const quantity = cart.filter((cartProduct) => product.id === cartProduct.id).length;

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="w-1/2">
        <p className="text-sm font-bold w-full">{product.name_json.english}</p>
      </div>

      <div className="flex items-center">
        <AiOutlineMinus
          onClick={() =>
            setCart((prevCart) => {
              const oldCart = [...prevCart];
              oldCart.splice(cart.indexOf(product), 1);

              return oldCart;
            })
          }
          className="text-2xl text-white bg-black p-1 cursor-pointer"
        />
        <p className="w-9 text-center">{quantity}</p>
        <AiOutlinePlus
          onClick={() => setCart((prevCart) => [...prevCart, product])}
          className="text-2xl text-white bg-black p-1 mr-5 cursor-pointer"
        />

        <p className="text-right font-bold w-16">{product.price} €</p>
      </div>
    </div>
  );
}
