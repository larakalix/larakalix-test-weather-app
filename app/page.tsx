
import { SearchBar } from "@/components/search-bar";
import { WeatherCard } from "@/components/weather-card";
import { getWeatherByCity } from "@/lib/weather";

export default async function Page({ searchParams }: {
  searchParams?: Promise<{
    city?: string;
  }>;
}) {
  const params = await searchParams;
  const city = params?.city || "";

  // Hacemos la consulta al endpoint de Next.js, ya que este es un componente server side
  // que nos permite hacer la consulta directamente, pero de igual manera podriamos utilizar
  // el hook `use` en un client component para realizar esta consulta
  const { error, weather } = await getWeatherByCity(city);

  return (
    <>
      <section className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Weather App
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Use this app to get the current weather information for any city
          around the world. Just enter the name of the city in the search bar
          below and click "Search".
        </p>
      </section>

      <SearchBar />

      {error ? (
        <section
          data-testid="error-message"
          className="w-full max-w-2xl rounded-md border border-red-200 bg-red-50 px-8 py-20 text-center text-red-600"
        >
          <p className="font-medium">Something went wrong</p>
          <p className="mt-1">{error}</p>
        </section>
      ) : !weather ? (
        <section
          data-testid="no-weather"
          className="w-full max-w-2xl rounded-md border border-slate-300 bg-white/60 p-8 text-center"
        >
          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            Search for a city
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Enter a city name to see the current weather.
          </p>
        </section>
      ) : (
        <WeatherCard weather={weather} />
      )}
    </>
  );
}
