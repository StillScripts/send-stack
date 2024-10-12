import { describe, expect, it } from 'bun:test'

import { noPlural } from '@/lib/utils'

describe('noPlural', () => {
	it('should remove the plural suffix', () => {
		expect(noPlural('cats')).toBe('cat')
	})
	it('should remove the plural suffix for words ending in "ies"', () => {
		expect(noPlural('cities')).toBe('city')
	})
	it('should not remove the "ie" suffix for excluded words', () => {
		expect(noPlural('movies')).toBe('movie')
	})
})
