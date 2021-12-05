import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

export default function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="container mx-auto mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <img
            src="/royal-diadems-logo.png"
            className="h-10 w-10 top-6 absolute"
            alt=""
          />
          <span className="ml-10 cursor-pointer text-white text-xl font-semibold">
            <Link href="https://royal-diadems.web.app/">Royal Diadems</Link>
          </span>
          <span className="transition duration-700 ml-8 cursor-pointer text-green-500 hover:text-green-100 text-xl font-semibold">
            <Link href="https://royal-diadems.web.app/">Home</Link>
          </span>
          <span className="transition duration-700 cursor-pointer hover:text-green-100 text-green-500 text-xl ml-3 font-semibold">
            <Link href="/"> All </Link>
          </span>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
