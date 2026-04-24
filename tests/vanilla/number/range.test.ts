import { expect, test } from "bun:test";
import { range } from "@/vanilla";

// Stealing tests from python's source code - https://github.com/python/cpython/blob/42d645a7e81e0a5e6e0d35e222a8520450ac28ef/Lib/test/test_range.py#L46

test("Testing Ranges", () => {
    expect([...range(3)]).toEqual([0, 1, 2]);
    expect([...range(1, 5)]).toEqual([1, 2, 3, 4]);
    expect([...range(0)]).toEqual([]);
    expect([...range(-3)]).toEqual([]);
    expect([...range(1, 10, 3)]).toEqual([1, 4, 7]);
    expect([...range(5, -5, -3)]).toEqual([5, 2, -1, -4]);

    const a = 10,
        b = 100,
        c = 50;

    expect([...range(a, a + 2)]).toEqual([a, a + 1]);
    expect([...range(a + 2, a, -1)]).toEqual([a + 2, a + 1]);
    expect([...range(a + 4, a, -2)]).toEqual([a + 4, a + 2]);

    const seq = [...range(a, b, c)];
    expect(seq).toContain(a);
    expect(seq).not.toContain(b);
    expect(seq).toHaveLength(2);
});
