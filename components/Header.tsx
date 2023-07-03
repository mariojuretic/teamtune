"use client";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useBoardStore } from "@/store/BoardStore";

import logo from "@/assets/logo.png";

export default function Header() {
  const [searchTerm, setSearchTerm] = useBoardStore((state) => [
    state.searchTerm,
    state.setSearchTerm,
  ]);

  return (
    <header className="grid grid-cols-3 items-center gap-x-8 bg-slate-500/10 px-8 py-4">
      <div>
        <div className="relative h-12 w-72">
          <Image
            src={logo}
            alt="Logo"
            fill
            className="object-contain object-left"
          />
        </div>
      </div>

      <form className="flex items-center space-x-4 rounded-md bg-white px-4 py-2 shadow-sm">
        <MagnifyingGlassIcon className="h-5 w-5 shrink-0" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-1 bg-transparent text-sm outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" hidden>
          Search
        </button>
      </form>

      <div className="flex justify-end">
        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-white shadow-sm">
          <Image
            src="https://api.dicebear.com/6.x/open-peeps/png?seed=mariojuretic"
            alt="Avatar"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>
    </header>
  );
}
