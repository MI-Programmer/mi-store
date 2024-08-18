"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
  filterOptions: { value: string; label: string }[];
  name?: string;
  isSelect?: boolean;
}

const Filter = ({ filterOptions, name, isSelect }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("filter") ?? filterOptions[0].value;

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("filter", filter);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  if (isSelect)
    return (
      <div className="flex items-center gap-4">
        {name && (
          <label htmlFor="filter" className="text-base font-medium">
            {name}
          </label>
        )}

        <select
          value={activeFilter}
          id="filter"
          onChange={(e) => handleFilter(e.target.value)}
          className="inputSelect bg-white"
        >
          {filterOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );

  return (
    <div className="border-grey-200 bg-grey-0 flex gap-1 rounded-md border p-1 shadow-sm">
      {filterOptions.map(({ value, label }) => (
        <button
          key={value}
          className={`rounded-md border-none px-2 py-1 font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-indigo-50 disabled:cursor-not-allowed ${
            activeFilter === value
              ? "bg-indigo-600 text-indigo-50"
              : "bg-grey-0"
          }`}
          disabled={activeFilter === value}
          onClick={() => handleFilter(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
