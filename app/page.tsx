import Button from "@/components/ui/Button";
import ImageGrid from "@/components/ui/ImageGrid";

const Home = () => {
  return (
    <div className="relative -my-12 overflow-hidden">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>

            <p className="mb-10 mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn&apos;t care if you live or
              die.
            </p>

            <Button as="Link" href="/products" size="large">
              Shop Collection
            </Button>
          </div>

          <ImageGrid />
        </div>
      </div>
    </div>
  );
};

export default Home;
