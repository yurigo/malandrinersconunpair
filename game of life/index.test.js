import { expect, test, describe } from 'vitest'
import { draw } from './index.js'


test('draw', () => {
    const grid = [
        [0, 0],
        [0, 0]
    ]

    expect(draw(grid)).toBe(`  \n  \n`)
})

test('draw', () => {
    const grid = [
        [0, 1],
        [1, 0]
    ]
    expect(draw(grid)).toBe(` X\nX \n`)
})

test('draw', () => {
    const grid = [
        [0, 1, 1],
        [1, 0, 1],
        [0, 0, 1],
    ]
    expect(draw(grid)).toBe(` XX\nX X\n  X\n`)
})