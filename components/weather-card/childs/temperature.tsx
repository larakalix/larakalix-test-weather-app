import { WeatherAPIResponse } from "@/types/weather.api"

type Props = {
    current: WeatherAPIResponse["current"]
}

export const WeatherCardTemperature = ({ current }: Props) => {
    return (
        <section className="my-4">
            <p
                data-testid="weather-temperature"
                className="text-4xl font-bold tracking-tight"
            >
                {Math.round(current.temp_c)}°C
            </p>

            <p
                data-testid="weather-description"
                className="text-md capitalize text-slate-300"
            >
                {current.condition.text}
            </p>
        </section>
    )
}