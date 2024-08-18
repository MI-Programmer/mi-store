import Link from "next/link";

interface PaginationProps {
  page: number;
  filter: string;
  getItemsLength: Function;
}

const Pagination = async ({
  page,
  filter,
  getItemsLength,
}: PaginationProps) => {
  const productsLength = await getItemsLength(filter);
  const amountPages = Math.ceil(productsLength / 8);

  if (!amountPages || amountPages === 1) return;

  return (
    <nav aria-label="Page navigation example" className="mt-10 text-center">
      <ul className="inline-flex h-10 -space-x-px text-base">
        <li>
          <Link
            href={`?page=${page > 1 ? page - 1 : page}`}
            className="ms-0 flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Previous
          </Link>
        </li>

        {[...Array(amountPages)].map((_, index) => (
          <li key={index}>
            <Link
              href={`?page=${index + 1}`}
              className={`flex h-10 items-center justify-center border border-gray-300 bg-white px-4 leading-tight ${index + 1 === page ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
            >
              {index + 1}
            </Link>
          </li>
        ))}

        <li>
          <Link
            href={`?page=${page === amountPages ? page : page + 1}`}
            className="flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
