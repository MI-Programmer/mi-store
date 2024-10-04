import Image from "next/image";

import image1 from "/public/imagesGrid/01.jpg";
import image2 from "/public/imagesGrid/02.jpg";
import image3 from "/public/imagesGrid/03.jpg";
import image4 from "/public/imagesGrid/04.jpg";
import image5 from "/public/imagesGrid/05.jpg";
import image6 from "/public/imagesGrid/06.jpg";
import image7 from "/public/imagesGrid/07.jpg";

const style = {
  gridCol: "grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8",
  size: "h-64 w-44 overflow-hidden rounded-lg",
  image: "h-full w-full object-cover object-center",
};

const ImageGrid = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
    >
      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className={style.gridCol}>
            <div className={`${style.size} sm:opacity-0 lg:opacity-100`}>
              <Image src={image1} alt="image" className={style.image} />
            </div>

            <div className={style.size}>
              <Image src={image2} alt="image" className={style.image} />
            </div>
          </div>

          <div className={style.gridCol}>
            <div className={style.size}>
              <Image src={image3} alt="image" className={style.image} />
            </div>

            <div className={style.size}>
              <Image src={image4} alt="image" className={style.image} />
            </div>

            <div className={style.size}>
              <Image src={image5} alt="image" className={style.image} />
            </div>
          </div>

          <div className={style.gridCol}>
            <div className={style.size}>
              <Image src={image6} alt="image" className={style.image} />
            </div>

            <div className={style.size}>
              <Image src={image7} alt="image" className={style.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
