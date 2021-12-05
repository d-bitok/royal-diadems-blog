import React from "react";
import Image from "next/image";

import { graphCMSImageLoader } from "../util";

export default function Author({ author }) {
  return (
    <>
      <div className="text-center">
        <h1 className="text-black font-bold text-3xl mb-2">Blog Author</h1>
      </div>

      <div className="text-center mt-20 p-12 relative rounded-lg bg-black mb-10 bg-opacity-20">
        <div className="absolute left-0 right-0 -top-14">
          <Image
            unoptimized
            loader={graphCMSImageLoader}
            alt={author.name}
            height="100px"
            width="100px"
            className="align-middle rounded-full"
            src={author.photo.url}
          />
        </div>
        <h3 className="text-white mt-4 mb-4 text-xl font-bold">
          {author.name}
        </h3>
        <p className="text-white text-ls">{author.bio}</p>
      </div>
      <div className="text-center">
        <h1 className="text-black font-bold text-3xl mb-2">More Posts</h1>
      </div>
    </>
  );
}
