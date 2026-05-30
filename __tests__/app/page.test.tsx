import { render, screen } from "@testing-library/react"
import { getWeatherByCity } from "./../../lib/weather"
import Page from "@/app/page"

jest.mock("./../../lib/weather", () => ({
    getWeatherByCity: jest.fn(),
}))

jest.mock("./../../components/search-bar/index", () => ({
    SearchBar: () => <form data-testid="search-bar" />,
}))

jest.mock("./../../components/weather-card/index", () => ({
    WeatherCard: ({ weather }: { weather: { location: { name: string } } }) => (
        <section data-testid="weather-card">{weather.location.name}</section>
    ),
}))

const getWeatherByCityMock = getWeatherByCity as jest.MockedFunction<
    typeof getWeatherByCity
>

describe("Page", () => {
    beforeEach(() => {
        getWeatherByCityMock.mockReset()
    })

    it("renders empty state when city is not provided", async () => {
        getWeatherByCityMock.mockResolvedValueOnce({
            weather: null,
            error: null,
        })

        render(
            await Page({
                searchParams: Promise.resolve({}),
            })
        )

        expect(screen.getByTestId("search-bar")).toBeInTheDocument()
        expect(screen.getByTestId("no-weather")).toBeInTheDocument()
        expect(screen.getByText(/search for a city/i)).toBeInTheDocument()
    })

    it("renders error state when weather request fails", async () => {
        getWeatherByCityMock.mockResolvedValueOnce({
            weather: null,
            error: "City not found.",
        })

        render(
            await Page({
                searchParams: Promise.resolve({
                    city: "wrong-city",
                }),
            })
        )

        expect(getWeatherByCityMock).toHaveBeenCalledWith("wrong-city")
        expect(screen.getByTestId("error-message")).toBeInTheDocument()
        expect(screen.getByText("City not found.")).toBeInTheDocument()
    })

    it("renders weather card when weather exists", async () => {
        getWeatherByCityMock.mockResolvedValueOnce({
            weather: {
                location: {
                    name: "London",
                },
            } as Awaited<ReturnType<typeof getWeatherByCity>>["weather"],
            error: null,
        })

        render(
            await Page({
                searchParams: Promise.resolve({
                    city: "London",
                }),
            })
        )

        expect(getWeatherByCityMock).toHaveBeenCalledWith("London")
        expect(screen.getByTestId("weather-card")).toBeInTheDocument()
        expect(screen.getByText("London")).toBeInTheDocument()
    })
})