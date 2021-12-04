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
          <span className="transition duration-700 cursor-pointer text-black hover:text-green-600 text-xl font-semibold">
            <Link href="https://royal-diadems.web.app/"> Home </Link>
          </span>
          <span className="transition duration-700 cursor-pointer hover:text-green-600 text-black text-xl ml-6 font-semibold">
            <Link href="/"> All </Link>
          </span>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-black ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
