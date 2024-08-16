import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
  

<section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-xl font-semibold sm:text-5xl">
        Unleach Your Potential with
        <strong className="font-extrabold text-theme sm:block text-4xl mt-4"> NAFS Training Platform </strong>
      </h1>

     

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-theme px-12 py-3 text-sm font-medium text-white shadow hover:bg-theme focus:outline-none focus:ring active:bg-theme sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-theme shadow hover:theme focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  );
};

export default Hero;