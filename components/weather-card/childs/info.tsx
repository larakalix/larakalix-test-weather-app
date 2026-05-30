import { WeatherAPIResponse } from "@/types/weather.api"

type Props = {
    current: WeatherAPIResponse["current"]
}

export const WeatherCardInformation = ({ current }: Props) => {
    return (
        <div data-testid="weather-information" className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-md bg-white/10 p-4">
                <p className="text-sm text-slate-300">Humidity</p>

                <p
                    data-testid="weather-humidity"
                    className="mt-2 text-2xl font-semibold"
                >
                    {current.humidity}%
                </p>
            </div>

            <div className="rounded-md bg-white/10 p-4">
                <p className="text-sm text-slate-300">Feels like</p>

                <p className="mt-2 text-2xl font-semibold">
                    {Math.round(current.feelslike_c)}°C
                </p>
            </div>
        </div>
    )
}