// Definimos el componente como 'client componnent' para poder usar custom hooks
// como `useRouter` y eventos de formulario.

'use client';

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const SearchBar = () => {
    // Con este hook obtenemos un objeto que nos permitira hacer un push
    // al URL del navegador, para actualizar el dato de busqueda con la ciudad
    // que obtenemos del formulario.
    const router = useRouter();

    // Esta function se ejecuta en el evento onSubmit del formulario,
    // lo que nos permite obtener el valor del input y actualizar el URL del navegador
    const handleSearch = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const city = formData.get("city") as string;

        // Actualizamos el URL con el valor, en caso de existir,
        // de lo contrario, volvemos al URL raiz sin query params.
        router.push(city ? `?city=${encodeURIComponent(city)}` : "/");
    };

    return (
        <div className="w-full mt-6">
            <form className="w-full flex flex-col md:flex-row justify-center items-center gap-2" onSubmit={handleSearch}>
                <input
                    type="text"
                    name="city"
                    placeholder="ex: London"
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