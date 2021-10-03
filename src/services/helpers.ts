export const returnToFixed = (value: number | string, digits: number): number => {
    if (typeof value === 'number') {
        return value > 1 ? Number(value.toFixed(digits)) : Number(value.toFixed(digits + 1))
    } else {
        const temp = Number(value)
        return temp > 1 ? Number(temp.toFixed(digits)) : Number(temp.toFixed(digits + 1))
    }
}

export const reduceValue = (arr: Array<number>) => {
    if (arr.length === 0) return 0

    return arr.reduce((acc, cur) => acc + cur, 0)
}

export const checkCost = (value: number, cost: number) => {
    if (cost === 0) return cost;
    const division = value / cost;

    return (division - 1) * 100;
};