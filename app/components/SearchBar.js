
"use client"

import { useRouter } from 'next/navigation';

export default function SearchBar({ actionUrl, search }) {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = event.target.search.value;
    // router.push(`${actionUrl}?q=${encodeURIComponent(search)}`);
    router.push(`?q=${encodeURIComponent(search)}`);
  };

  return (
    // <form onSubmit={handleSubmit} className="flex mb-6 self-start w-[100%] md:w-[50%]">
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        name="search"
        // value={search}
        placeholder="Search products..."
        className="border border-gray-300 rounded-lg py-2 px-4 flex-grow"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg py-2 px-4 ml-2"
      >
        Search
      </button>
    </form>
  );
}
