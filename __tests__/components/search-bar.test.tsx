import { fireEvent, render, screen } from "@testing-library/react"
import { SearchBar } from "./../../components/search-bar/index"
import { useSearchBar } from "./../../components/search-bar/use-search-bar"

jest.mock("./../../components/search-bar/use-search-bar", () => ({
    useSearchBar: jest.fn(),
}))

const useSearchBarMock = useSearchBar as jest.Mock

describe("SearchBar", () => {
    const handleSearchMock = jest.fn()

    beforeEach(() => {
        handleSearchMock.mockClear()

        useSearchBarMock.mockReturnValue({
            handleSearch: handleSearchMock,
        })
    })

    it("renders the city input", () => {
        render(<SearchBar />)

        expect(
            screen.getByPlaceholderText("Search city, ex: London")
        ).toBeInTheDocument()
    })

    it("renders the search button", () => {
        render(<SearchBar />)

        expect(
            screen.getByRole("button", { name: /search/i })
        ).toBeInTheDocument()
    })

    it("allows the user to type a city", () => {
        render(<SearchBar />)

        const input = screen.getByPlaceholderText("Search city, ex: London")

        fireEvent.change(input, {
            target: {
                value: "London",
            },
        })

        expect(input).toHaveValue("London")
    })

    it("calls handleSearch when the form is submitted", () => {
        render(<SearchBar />)

        const input = screen.getByPlaceholderText("Search city, ex: London")
        const form = input.closest("form")

        expect(form).not.toBeNull()

        fireEvent.change(input, {
            target: {
                value: "London",
            },
        })

        fireEvent.submit(form as HTMLFormElement)

        expect(handleSearchMock).toHaveBeenCalledTimes(1)

    })
})