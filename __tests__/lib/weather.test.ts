import { getWeatherByCity } from "@/lib/weather"

const originalEnv = process.env

describe("getWeatherByCity", () => {
    beforeEach(() => {
        jest.resetModules()

        process.env = {
            ...originalEnv,
            API_KEY: "test-api-key",
            API_URL: "https://api.weatherapi.com/v1/current.json",
        }

        global.fetch = jest.fn()
    })

    afterEach(() => {
        process.env = originalEnv
        jest.restoreAllMocks()
    })

    it("returns empty result when city is not provided", async () => {
        const result = await getWeatherByCity()

        expect(result).toEqual({
            weather: null,
            error: null,
        })

        expect(global.fetch).not.toHaveBeenCalled()
    })

    it("returns empty result when city is empty", async () => {
        const result = await getWeatherByCity("   ")

        expect(result).toEqual({
            weather: null,
            error: null,
        })

        expect(global.fetch).not.toHaveBeenCalled()
    })

    it("returns an error when API env variables are missing", async () => {
        process.env.API_KEY = ""
        process.env.API_URL = ""

        const result = await getWeatherByCity("London")

        expect(result).toEqual({
            weather: null,
            error: "Weather API key is missing.",
        })

        expect(global.fetch).not.toHaveBeenCalled()
    })

    it("returns weather data when API response is successful", async () => {
        const weatherMock = {
            location: {
                name: "London",
                region: "City of London",
                country: "United Kingdom",
            },
            current: {
                temp_c: 18,
                humidity: 70,
                is_day: 1,
                condition: {
                    text: "Cloudy",
                    icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
                    code: 1003,
                },
            },
        }

            ; (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => weatherMock,
            })

        const result = await getWeatherByCity("London")

        expect(result).toEqual({
            weather: weatherMock,
            error: null,
        })

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.weatherapi.com/v1/current.json?key=test-api-key&q=London"
        )
    })

    it("returns an error when city is not found", async () => {
        ; (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({
                error: {
                    message: "No matching location found.",
                },
            }),
        })

        const result = await getWeatherByCity("WrongCity")

        expect(result).toEqual({
            weather: null,
            error: "City WrongCity not found. Please try another city.",
        })
    })

    it("returns an error when fetch throws", async () => {
        ; (global.fetch as jest.Mock).mockRejectedValueOnce(
            new Error("Network error")
        )

        const result = await getWeatherByCity("London")

        expect(result).toEqual({
            weather: null,
            error: "Network error",
        })
    })
})