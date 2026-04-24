// https://github.com/radashi-org/radashi/blob/61b4fe30401f30ceafc1b3508c43b6ef57ba9ffd/src/number/range.ts#L21
// https://github.com/orgs/radashi-org/discussions/177
// https://github.com/sodiray/radash/issues/331

/**
 * Range function equivalent to python's range function
 * @param startOrSize
 * @param end
 * @param step
 * @returns
 */
export function* range(
    startOrSize: number,
    end?: number,
    step: number = 1,
): Generator<number> {
    const start = end ? startOrSize : 0;
    const stop = end ?? startOrSize;

    if (step < 0 && start < stop) return;

    if (step < 0) {
        for (let i = start; i > stop; i += step) {
            yield i;
        }
    } else {
        for (let i = start; i < stop; i += step) {
            yield i;
        }
    }
}
