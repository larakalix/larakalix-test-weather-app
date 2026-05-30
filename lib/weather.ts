'use server';

import type { WeatherAPIResponse } from "@/types/weather.api";

type WeatherResult = {
    weather: WeatherAPIResponse | null
    error: string | null
}

// Obtenemos el parametro en la URL para la busqueda de la ciudad
// Y obtenemos la definicion de las variables de entorno para la API
export async function getWeatherByCity(
    city?: string | null
): Promise<WeatherResult> {
    // En este caso, si el metodo no recibe un parametro de ciudad,
    // simplemente devolvemos una respuesta vacía
    if (!city || !city?.trim()) {
        return {
            weather: null,
            error: null,
        }
    }

    const apiKey = process.env.API_KEY || "";
    const apiUrl = process.env.API_URL || "https://api.weatherapi.com/v1/current.json";

    // Validamos que las variables de entorno necesarias para la API estén definidas
    // de lo contrario, respondemos con un error para indicar que la configuracion
    // es incorrecta y debemos definir las variables para poder utilizar el API
    if (!apiKey || !apiUrl)
        return {
            weather: null,
            error: "Weather API key is missing.",
        }

    try {
        // Consultamos el API de https://www.weatherapi.com/ para obtener la informacion
        // del clima de la ciudad recibida como argumento.
        const response = await fetch(`${apiUrl}?${new URLSearchParams({ key: apiKey, q: city }).toString()}`);

        // Si la respuesta no es exitosa, quiere decir que hay un error de alguna manera,
        // por ejemplo, la ciudad no fue encontrada, por lo que enviamos el error como respuesta
        if (!response.ok)
            return {
                weather: null,
                error: `City ${city} not found. Please try another city.`,
            }

        // En este caso, la respuesta si fue exitosa, por lo que extraemos los datos que queremos
        // enviar al cliente en la respuesta del endpoint
        const weather = await response.json() as WeatherAPIResponse;

        return {
            weather,
            error: null,
        }
    }
    catch (error) {
        return {
            weather: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again.",
        }
    }
}