import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { cartAtom } from "../state";

export default function Product(product: any) {
  const [cart, setCart] = useRecoilState(cartAtom);

  const generateDescriptionText = (description: string | null) => {
    if (!description) return "";

    if (description.length > 100) return description.slice(0, 100) + "...";
    return description;
  };

  const quantity = cart.filter((cartProduct) => product.id === cartProduct.id).length;

  const isInCart = cart.filter((cartProduct) => product.id === cartProduct.id).length > 0;

  return (
    <div className="border-t py-7 px-5 flex justify-between items-center transition-all duration-500 hover:shadow-2xl">
      <div className="w-2/3">
        <p className="font-bold mb-1">{product.name_json.english}</p>
        <p className="text-xs mb-3">{generateDescriptionText(product.description_json.english)}</p>
        <p className="text-lg font-bold">{product.price} €</p>
      </div>

      <div className="flex flex-col items-center">
        {product.image && <img src={product.image} className="object-contain w-20 h-20 rounded-xl" />}
        {!isInCart && (
          <div
            className="w-max h-max py-2 px-5 rounded bg-yellow-300 cursor-pointer"
            onClick={() => {
              if (isInCart) return;

              setCart((prevCart) => [...prevCart, product]);
            }}
          >
            <p className="font-bold">ADD</p>
          </div>
        )}

        {isInCart && (
          <div className="flex items-center">
            <AiOutlineMinus
              onClick={() =>
                setCart((prevCart) => {
                  const oldCart = [...prevCart];
                  oldCart.splice(cart.indexOf(product), 1);

                  return oldCart;
                })
              }
              className="text-2xl bg-yellow-400 p-1 cursor-pointer"
            />
            <p className="w-9 text-center">{quantity}</p>
            <AiOutlinePlus
              onClick={() => setCart((prevCart) => [...prevCart, product])}
              className="text-2xl bg-yellow-400 p-1 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
