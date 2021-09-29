export const returnToFixed = (value: number | string, digits: number) => {
    if (typeof value === 'number') {
        return value > 1 ? value.toFixed(digits) : value.toFixed(digits + digits)
    } else {
        const temp = Number(value)
        return temp > 1 ? temp.toFixed(digits) : temp.toFixed(digits + digits)
    }
}