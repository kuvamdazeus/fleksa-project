import { GetServerSideProps } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillTag, AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import Product from "../components/Product";
import Cart from "../components/Cart";

export default function MenuPage({ menuData }: { menuData: any }) {
  const [data, setData] = useState(menuData);
  const [visibleCategoryId, setVisibleCategoryId] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setVisibleCategoryId(parseInt(entry.target.id.split("_").at(-1)));
        });
      },
      {
        threshold: 1,
      }
    );

    data.categories.map((category) => {
      observer.observe(document.getElementById("category_section_" + category.id.toString()));
    });
  }, []);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) return setData(menuData);

    const searchResults = {
      ...data,
      categories: data.categories.map((category) => ({
        ...category,
        products: category.products.filter((product) =>
          product.name_json.english.toLowerCase().startsWith(e.target.value.toLowerCase())
        ),
      })),
    };

    setData(searchResults);
  };

  return (
    <section className="">
      <div className="relative bg-black w-full h-96 mb-24">
        <img src="/food.jpg" className="w-full object-cover h-96 opacity-40" />
        <div className="absolute top-0 w-full h-full px-24 flex justify-between items-center text-white">
          <div>
            <p className="text-5xl font-bold">Good Taste</p>
            <p className="text-lg mb-5">Food and drink!</p>

            <div className="flex items-center mb-5">
              <AiOutlineClockCircle className="mr-2" />
              <p className="text-sm font-bold">Today 11:30 - 14:30 | 17:30 - 23:59</p>
            </div>

            <div className="flex items-center text-black w-max bg-white rounded-lg p-3">
              <IoFastFoodOutline className="text-lg" />
              <p className="text-lg font-bold mx-2">DINE-IN</p>
              <RiEditBoxLine className="text-lg" />
            </div>
          </div>

          <div className="">
            <div className="border-b-2 border-yellow-400 w-max pr-3 mb-5">
              <p>OFFER</p>
            </div>

            <div className="flex items-center mb-4">
              <AiFillTag className="text-xl" />
              <div className="bg-white text-black text-sm font-bold px-1 mx-2">PIZZA</div>
              <p className="text-sm">Discount of 10% on orders above 10 €</p>
            </div>

            <div className="flex items-center mb-4">
              <AiFillTag className="text-xl" />
              <div className="bg-white text-black text-sm font-bold px-1 mx-2">PIZZA50</div>
              <p className="text-sm">Discount of 90% on orders above 0 € 90 % off on Cheese</p>
            </div>

            <div className="flex items-center mb-4">
              <AiFillTag className="text-xl" />
              <div className="bg-white text-black text-sm font-bold px-1 mx-2">GÜNSTIG</div>
              <p className="text-sm">Discount of 20% on orders above 20 € 20%</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-10 xl:mx-20 flex">
        <div className="flex flex-col items-end sticky top-24 h-max w-64 mr-10 overflow-y-scroll">
          <div className="flex items-center border-2 border-black w-max mb-5">
            <AiOutlineSearch className="text-xl mx-2" />
            <div className="w-[2px] h-9 bg-black mr-2" />
            <input onChange={search} placeholder="Search Here" className="outline-none mr-2" />
          </div>

          {data.categories.map((category) => {
            const isVisible = visibleCategoryId === category.id;

            return (
              <div
                id={"category_" + category.id.toString()}
                className={`mb-2 cursor-pointer ${
                  isVisible && "bg-black px-5 py-1 text-white rounded-full font-bold"
                }`}
                onClick={() => {
                  document
                    .getElementById("category_section_" + category.id.toString())
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                <p>{category.name_json.english}</p>
              </div>
            );
          })}
        </div>

        <div className="w-1/2 mr-10">
          {data.categories.map((category) => (
            <>
              <div
                id={"category_section_" + category.id.toString()}
                className="rounded-lg bg-yellow-50 mb-1 py-2"
              >
                <p className="text-lg text-center font-bold text-gray-700">{category.name_json.english}</p>
              </div>
              <p className="text-center text-sm text-gray-500 mb-5">{category.description_json.english}</p>

              <div className="mb-10">
                {category.products.map((product) => (
                  <Product {...product} />
                ))}
              </div>
            </>
          ))}
        </div>

        <Cart />
      </section>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await (await fetch("https://myqa.fleksa.com/pyapi/26/menu")).json();

  return {
    props: { menuData: data },
  };
};
