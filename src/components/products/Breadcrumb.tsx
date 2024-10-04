import Link from "next/link";

interface BreadcrumbProps {
  name: string;
  category: string;
}

const backslash = (
  <svg
    fill="currentColor"
    width={16}
    height={20}
    viewBox="0 0 16 20"
    aria-hidden="true"
    className="h-5 w-4 text-gray-300"
  >
    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
  </svg>
);

const Breadcrumb = ({ name, category }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div className="flex items-center">
            <Link
              href="/products"
              className="mr-2 text-sm font-medium text-gray-900"
            >
              Products
            </Link>

            {backslash}
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <Link
              href={`/products?filter=${category}`}
              className="mr-2 text-sm font-medium capitalize text-gray-900"
            >
              {category}
            </Link>

            {backslash}
          </div>
        </li>

        <li className="text-sm">
          <p className="font-medium text-gray-500 hover:text-gray-600">
            {name}
          </p>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
