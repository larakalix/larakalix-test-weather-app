import { getWeatherIconUrl } from "@/utils/icon.util";

describe("getWeatherIconUrl", () => {
    it("returns null when icon is not provided", () => {
        expect(getWeatherIconUrl()).toBeNull()
    })

    it("adds https when icon starts with //", () => {
        expect(
            getWeatherIconUrl("//cdn.weatherapi.com/weather/64x64/day/116.png")
        ).toBe("https://cdn.weatherapi.com/weather/64x64/day/116.png")
    })

    it("returns the original icon when it already has a protocol", () => {
        expect(
            getWeatherIconUrl("https://cdn.weatherapi.com/weather/64x64/day/116.png")
        ).toBe("https://cdn.weatherapi.com/weather/64x64/day/116.png")
    })
})