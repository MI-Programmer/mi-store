"use client";

import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="space-x-1" type="button">
      &larr; <span className="font-semibold text-indigo-600">Back</span>
    </button>
  );
};

export default BackButton;
