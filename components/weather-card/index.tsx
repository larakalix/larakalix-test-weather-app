import { clsx } from "clsx"
import { WeatherAPIResponse } from "@/types/weather.api"
import { WeatherCardLocation } from "./childs/location"
import { WeatherCardTemperature } from "./childs/temperature"
import { WeatherCardInformation } from "./childs/info"

type Props = {
    weather: WeatherAPIResponse
}

export const WeatherCard = ({ weather }: Props) => {
    const { location, current } = weather;

    return (
        <section data-testid="weather-card" className={clsx("w-full rounded-md p-6 text-white shadow-lg", {
            "bg-slate-500": current.is_day === 1,
            "bg-slate-900": current.is_day === 0
        })}>
            <WeatherCardLocation location={location} current={current} />

            <WeatherCardTemperature current={current} />

            <WeatherCardInformation current={current} />
        </section >
    )
}