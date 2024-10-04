import { Metadata } from "next";
import Image from "next/image";

import image1 from "/public/imagesAbout/01.jpg";
import image2 from "/public/imagesAbout/02.jpg";

export const metadata: Metadata = { title: "About" };

const About = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Mi-Store</h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
          Mi-Store offers premium, modern, and fashionable clothing that
          elevates your style. Our collection is curated with a focus on quality
          and sophistication to meet the needs of our discerning customers.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-center sm:grid-cols-2 sm:gap-8">
        <div className="flex max-h-60 justify-center overflow-hidden">
          <Image
            src={image1}
            alt="Fashionable clothing"
            className="rounded-lg object-cover object-center shadow-lg"
          />
        </div>

        <div className="mt-4 flex max-h-60 justify-center overflow-hidden sm:mt-0">
          <Image
            src={image2}
            alt="Premium clothing"
            className="rounded-lg object-cover object-center shadow-lg"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-gray-500">
          At Mi-Store, our mission is to provide our customers with an
          exceptional shopping experience by offering a curated selection of
          high-quality clothing. We believe in the power of fashion to express
          individuality and confidence.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Why Choose Us?</h2>
        <p className="mt-4 text-gray-500">
          We are committed to excellence in every aspect of our business. From
          the materials we select to the craftsmanship of our garments, we
          strive to deliver products that exceed expectations. Choose Mi-Store
          for a seamless blend of style and substance.
        </p>
      </div>
    </div>
  );
};

export default About;
