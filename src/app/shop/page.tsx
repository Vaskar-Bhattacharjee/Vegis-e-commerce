"use client";
import { Container } from "@/src/components/ui/container";
import { Heading } from "@/src/components/ui/header";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import {
  BarView,
  BarViewThree,
  BarViewTwo,
  GridView,
} from "@/src/SVG illustrations/page";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "@/src/components/ui/dropdown";

const Fallback_Product = [
  {
    id: 1,
    category: "Women's Fashion",
    productName: "Minimalist Silk Blazer",
    description:
      "A tailored silhouette crafted from 100% mulberry silk. This blazer features structured shoulders and a hidden button closure for a sleek, modern finish. Perfect for transitional seasonal layering.",
    price: 450,
    img: "https://images.pexels.com/photos/7622259/pexels-photo-7622259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    category: "Men's Collection",
    productName: "Classic Wool Overcoat",
    description:
      "Timeless outerwear designed for durability and warmth. Made from heavy-weight Italian wool with a deep navy hue and traditional notched lapels.",
    price: 890,
    img: "https://images.pexels.com/photos/9849633/pexels-photo-9849633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    category: "Accessories",
    productName: "Leather Tote Bag",
    description:
      "Handcrafted pebble-grain leather bag featuring gold-toned hardware and a spacious interior lined with premium suede. The ultimate companion for city life and travel.",
    price: 1200,
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    category: "Women's Fashion",
    productName: "Satin Evening Gown",
    description:
      "Elegant floor-length gown with a draped neckline and open back. The fluid satin fabric catches the light beautifully for any formal occasion.",
    price: 650,
    img: "https://images.pexels.com/photos/2733337/pexels-photo-2733337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];
interface gridLayout {
  layout: "grid" | "list" | "barTwo" | "barThree";
}

export default function ShopPage() {
  const [layout, setLayout] = useState<gridLayout["layout"]>("grid");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  console.log("category", category);
  console.log("sortBy", sortBy);

  

  const displayedProducts = [...Fallback_Product]
    .filter((p)=> category === "All" ? true : p.category === category)
    .sort((a, b) => {
      if (sortBy === "Price: High to Low") {
        return b.price - a.price;
      }
      if (sortBy === "Price: Low to High") {
        return a.price - b.price;
      }
      return 0;
    });
  
  

  return (
    <Container className="min-h-screen pt-4 md:pt-20 lg:pt-28 w-full px-3  lg:w-6xl flex flex-col items-start justify-start bg-transparent">
      <div className="w-full flex flex-col justify-center items-start gap-4 border-b border-neutral-200 pb-4">
        <Heading className="text-[29px] lg:text-4xl md:pb-0">
          Our Collection for Your Style Needs
        </Heading>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-2 md:gap-3">
            <p className="text-neutral-600 text-[14px] md:text-[16px] font-bold">View:</p>

            <div className="flex items-start justify-center gap-1">
              <GridView
                onClick={() => {
                  setLayout("grid");
                }}
                size={15}
                className={cn(
                  "flex text-neutral-900  transition-colors cursor-pointer",
                  layout === "grid" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
              <BarViewTwo
                onClick={() => {
                  setLayout("barTwo");
                  console.log(layout);
                }}
                size={15}
                className={cn(
                  "text-neutral-900  transition-colors cursor-pointer",
                  layout === "barTwo" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
              <BarViewThree
                onClick={() => {
                  setLayout("barThree");
                  console.log(layout);
                }}
                size={15}
                className={cn(
                  "text-neutral-900  transition-colors cursor-pointer",
                  layout === "barThree" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
              <BarView
                onClick={() => {
                  setLayout("list");
                  console.log(layout);
                }}
                size={16}
                rotate="90deg"
                className={cn(
                  "text-neutral-900  transition-colors cursor-pointer",
                  layout === "list" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
            </div>

          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-4">

            <Dropdown 
            sortname="Category:" 
            onSelect={(val) => setCategory(val)}           
            items={["All", "Women's Fashion", "Men's Collection", "Accessories", "Wedding Collection"]}
            />

            <Dropdown 
            sortname="Sort by:" 
            onSelect={(val) => setSortBy(val)}
            items={[ "Price: Low to High", "Price: High to Low"]}
            />

          </div>



        </div>
      </div>
      {layout === "grid" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {displayedProducts.map((product) => (
            <CardLayoutOne
              key={product.id}
              src={product.img}
              category={product.category}
              productName={product.productName}
              description={product.description}
              price={product.price}
            />
          ))}
        </motion.div>
      )}
      {layout === "barTwo" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-4 flex-wrap"
        >
          {displayedProducts.map((product) => (
            <CardLayoutTwo
              key={product.id}
              src={product.img}
              category={product.category}
              productName={product.productName}
              description={product.description}
              price={product.price}
            />
          ))}
        </motion.div>
      )}
      {layout === "barThree" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 pl-0 lg:pl-20"
        >
          {displayedProducts.map((product) => (
            <CardLayoutThree
              key={product.id}
              src={product.img}
              category={product.category}
              productName={product.productName}
              description={product.description}
              price={product.price}
            />
          ))}
        </motion.div>
      )}
      {layout === "list" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-0 md:gap-4"
        >
          {displayedProducts.map((product) => (
            <CardLayoutFour
              key={product.id}
              src={product.img}
              category={product.category}
              productName={product.productName}
              description={product.description}
              price={product.price}
            />
          ))}
        </motion.div>
      )}
    </Container>
  );
}

export const CardLayoutOne = ({
  category,
  productName,
  description,
  price,
  src,
}: {
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={"#"}
      className=" md:w-65 md:h-105 mt-7 md:flex flex-col  border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-60 relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className="w-full h-45 flex flex-col items-start justify-center px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>

          <p className="font-bold text-lg text-black leading-tight">
            {productName}
          </p>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[22px] font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};
export const CardLayoutTwo = ({
  category,
  productName,
  description,
  price,
  src,
}: {
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={"#"}
      className=" lg:w-100 lg:h-105 mt-7 flex flex-col border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-60 relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className="w-full h-45 flex flex-col items-start justify-center px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>

          <p className="font-bold text-lg text-black leading-tight">
            {productName}
          </p>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[22px] font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export const CardLayoutThree = ({
  category,
  productName,
  description,
  price,
  src,
}: {
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={"#"}
      className="lg:w-80 lg:h-105 mt-7 flex flex-col border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-60 relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className="w-full h-45 flex flex-col items-start justify-center px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>

          <p className="font-bold text-lg text-black leading-tight">
            {productName}
          </p>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[22px] font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export const CardLayoutFour = ({
  category,
  productName,
  description,
  price,
  src,
}: {
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={"#"}
      className="w-full h-35 md:h-40 mt-7 flex items-center justify-between md:gap-10 border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-40 md:w-60 h-full relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className=" h-full  flex flex-col items-start justify-center px-3 md:px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center md:gap-1 py-2">
          <span className="text-xs md:text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>
          <p className="font-bold text-xl text-black leading-tight">
            {productName}
          </p>

          <p className="text-xs  md:text-sm w-50 md:w-200 text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[18px] md:text-[22px] font-bold md:font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};
