// Definimos el componente como 'client componnent' para poder usar custom hooks
// como `useRouter` y eventos de formulario.

'use client';

import { useSearchBar } from "./use-search-bar";

export const SearchBar = () => {
    const { handleSearch } = useSearchBar();

    return (
        <div className="w-full mt-6">
            <form className="w-full flex flex-col md:flex-row justify-center items-center gap-2" onSubmit={handleSearch}>
                <input
                    type="text"
                    name="city"
                    placeholder="Search city, ex: London"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full max-w-none md:max-w-[100px] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Search
                </button>
            </form>
        </div>
    );
}