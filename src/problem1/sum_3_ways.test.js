const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./sum_3_ways')

describe('3 ways to Sum to N', () => {
	// ARRANGE
	const testCases = [
		{ n: 1, expected: 1 }, // normal
		{ n: 5, expected: 15 }, // normal
		{ n: 10, expected: 55 }, // normal
		{ n: 100, expected: 5050 }, //large numbers
		{ n: 0, expected: 0 }, // 0 case
		{ n: -5, expected: 0 }, // negative
	]

	// ACT
	testCases.forEach((testCase, index) => {
		const { n, expected } = testCase

		test(`Test case ${index + 1} - sum_to_n_a(${n})`, () => {
			expect(sum_to_n_a(n)).toBe(expected) // ASSERT
		})

		test(`Test case ${index + 1} - sum_to_n_b(${n})`, () => {
			expect(sum_to_n_b(n)).toBe(expected) // ASSERT
		})

		test(`Test case ${index + 1} - sum_to_n_c(${n})`, () => {
			expect(sum_to_n_c(n)).toBe(expected) // ASSERT
		})
	})
})
