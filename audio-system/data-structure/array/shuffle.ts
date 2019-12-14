/**
 * Shuffles original passed array. Returns it.
 * @param array Array to shuffle.
 */
export function shuffle<T>(array: T[]): T[] {
    let size = array.length;

    while (size) {
        let index = Math.floor(Math.random() * size--);

        [array[size], array[index]] = [array[index], array[size]];
    }

    return array;
}