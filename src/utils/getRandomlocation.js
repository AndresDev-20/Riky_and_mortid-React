export const TOTAL_LOCATIONS = 126

const getRandomlocation = () => {
    return Math.floor(Math.random() * TOTAL_LOCATIONS) + 1
}

export default getRandomlocation
