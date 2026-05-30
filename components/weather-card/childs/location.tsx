import { WeatherAPIResponse } from "@/types/weather.api"
import { getWeatherIconUrl } from "@/utils/icon.util"

type Props = {
    location: WeatherAPIResponse["location"]
    current: WeatherAPIResponse["current"]
}

export const WeatherCardLocation = ({ location, current }: Props) => {
    // Obtenemos la URL del icono, de la respuesta del API, usando
    // un util function para convertir la URL relativa que proporciona el API en una URL absoluta.
    const iconUrl = getWeatherIconUrl(current.condition.icon);

    return (
        <div className="flex items-start justify-between gap-4">
            <header>
                <h2 data-testid="weather-city" className="text-2xl font-semibold">
                    {location.name}
                </h2>

                <p data-testid="weather-location" className="text-sm text-slate-300">
                    {location.region
                        ? `${location.region}, ${location.country}`
                        : location.country}
                </p>
            </header>

            {iconUrl &&
                <img
                    src={iconUrl}
                    alt={current.condition.text}
                    className="size-12"
                />
            }
        </div>
    )
}