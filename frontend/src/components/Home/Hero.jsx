import React from "react";

const Hero = () => {
  return (
    <div className="h-[75vh] flex">
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 lg:text-left text-center">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Uncover a world of stories with StorySeeker – Your ultimate
          destination for books that inspire, entertain, and enlighten.
        </p>
        <div className="mt-6">
          <button className="text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </button>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-full flex items-center justify-center">
      <img src="./Hero2.png" alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;
