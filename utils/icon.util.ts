export const getWeatherIconUrl = (icon?: string) => {
    if (!icon) return null

    return icon.startsWith("//") ? `https:${icon}` : icon
}