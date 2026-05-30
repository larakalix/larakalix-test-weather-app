import { render, screen } from "@testing-library/react"
import { WeatherCard } from "@/components/weather-card"
import type { WeatherAPIResponse } from "@/types/weather.api"

const createWeatherMock = (
    overrides?: Partial<WeatherAPIResponse>
): WeatherAPIResponse =>
    ({
        location: {
            name: "London",
            region: "City of London",
            country: "United Kingdom",
            lat: 51.52,
            lon: -0.11,
            tz_id: "Europe/London",
            localtime_epoch: 1710000000,
            localtime: "2026-05-30 10:00",
        },
        current: {
            last_updated_epoch: 1710000000,
            last_updated: "2026-05-30 10:00",
            temp_c: 18,
            temp_f: 64.4,
            is_day: 1,
            condition: {
                text: "Cloudy",
                icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                code: 1003,
            },
            wind_mph: 5,
            wind_kph: 8,
            wind_degree: 120,
            wind_dir: "SE",
            pressure_mb: 1012,
            pressure_in: 29.88,
            precip_mm: 0,
            precip_in: 0,
            humidity: 70,
            cloud: 50,
            feelslike_c: 18,
            feelslike_f: 64.4,
            vis_km: 10,
            vis_miles: 6,
            uv: 4,
            gust_mph: 7,
            gust_kph: 11,
            air_quality: {},
        },
        forecast: {
            forecastday: [],
        },
        alerts: {
            alert: [],
        },
        ...overrides,
    }) as WeatherAPIResponse

describe("WeatherCard", () => {
    it("renders the weather card container", () => {
        render(<WeatherCard weather={createWeatherMock()} />)

        expect(screen.getByTestId("weather-card")).toBeInTheDocument()
    })

    it("applies the day background when it is daytime", () => {
        render(
            <WeatherCard
                weather={createWeatherMock({
                    current: {
                        ...createWeatherMock().current,
                        is_day: 1,
                    },
                })}
            />
        )

        expect(screen.getByTestId("weather-card")).toHaveClass("bg-slate-500")
        expect(screen.getByTestId("weather-card")).not.toHaveClass("bg-slate-900")
    })

    it("applies the night background when it is nighttime", () => {
        render(
            <WeatherCard
                weather={createWeatherMock({
                    current: {
                        ...createWeatherMock().current,
                        is_day: 0,
                    },
                })}
            />
        )

        expect(screen.getByTestId("weather-card")).toHaveClass("bg-slate-900")
        expect(screen.getByTestId("weather-card")).not.toHaveClass("bg-slate-500")
    })

    it("renders the city name", () => {
        render(<WeatherCard weather={createWeatherMock()} />)

        expect(screen.getByTestId("weather-city")).toHaveTextContent("London")
    })

    it("renders the current temperature", () => {
        render(<WeatherCard weather={createWeatherMock()} />)

        expect(screen.getByTestId("weather-temperature")).toHaveTextContent(/18\s*°C/)
    })

    it("renders the humidity", () => {
        render(<WeatherCard weather={createWeatherMock()} />)

        expect(screen.getByTestId("weather-humidity")).toHaveTextContent(/70\s*%/)
    })

    it("renders the weather description", () => {
        render(<WeatherCard weather={createWeatherMock()} />)

        expect(screen.getByTestId("weather-description")).toHaveTextContent("Cloudy")
    })
})