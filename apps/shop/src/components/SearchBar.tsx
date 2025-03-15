"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { MdSearch } from "react-icons/md";

export const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;

    // todo: show matching results in dropdown

    if (searchQuery) {
      router.push(`products?search=${searchQuery}`);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="search"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <MdSearch className="cursor-pointer" aria-label="search icon" size={18}/>
    </form>
  );
};
