import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export const useSearchBar = () => {
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

    return {
        handleSearch,
    }
};