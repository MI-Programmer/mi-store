"use client";

import Button from "@/components/ui/Button";

const Error = () => {
  return (
    <section className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-red-600">
          Something went wrong
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          An unexpected error has occurred
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600">
          We’re sorry, but something went wrong. Please try again later or
          contact support.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button as="Link" href="/">
            Go back home
          </Button>

          <a href="/" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Error;
