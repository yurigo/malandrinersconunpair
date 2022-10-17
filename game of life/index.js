const ALIVE = 1;
const DEAD = 0;

export const numberOfAliveNeighbours = (grid, row, col) => {
    let count = 0

    count += (grid[row - 1] && grid[row - 1][col - 1]) ?? 0;
    count += (grid[row - 1] && grid[row - 1][col + 0]) ?? 0;
    count += (grid[row - 1] && grid[row - 1][col + 1]) ?? 0;

    count += (grid[row + 0] && grid[row + 0][col - 1]) ?? 0;
    //count += (grid[row + 0] && grid[row + 0][col + 0]) ?? 0;
    count += (grid[row + 0] && grid[row + 0][col + 1]) ?? 0;

    count += (grid[row + 1] && grid[row + 1][col - 1]) ?? 0;
    count += (grid[row + 1] && grid[row + 1][col + 0]) ?? 0;
    count += (grid[row + 1] && grid[row + 1][col + 1]) ?? 0;


    // const maxrow = grid.length - 1
    // const maxcol = grid[0].length - 1

    // if (row > 0) count += grid[row - 1][col]
    // if (row > 0 && col > 0) count += grid[row - 1][col - 1]
    // if (row > 0 && col < maxcol) count += grid[row - 1][col + 1]

    // if (col > 0) count += grid[row][col - 1]
    // if (col < maxcol) count += grid[row][col + 1]

    // if (row < maxrow) count += grid[row + 1][col]
    // if (row < maxrow && col > 0) count += grid[row + 1][col - 1]
    // if (row < maxrow && col < maxcol) count += grid[row + 1][col + 1]

    return count
}


/*
   1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
   2. Any live cell with more than three live neighbours dies, as if by overcrowding.
   3. Any live cell with two or three live neighbours lives on to the next generation.
   4. Any dead cell with exactly three live neighbours becomes a live cell.
*/

export const nextCellGeneration = (grid, row, col) => {
    const aliveNeighbours = numberOfAliveNeighbours(grid, row, col)

    if (grid[row][col] === ALIVE) {
        if (aliveNeighbours < 2) return DEAD;
        if (aliveNeighbours > 3) return DEAD;
        if (aliveNeighbours === 2 || aliveNeighbours === 3) return ALIVE;
    }
    else {
        if (aliveNeighbours === 3) return ALIVE;
    }

    return DEAD;
}

export const nextGeneration = (grid) => {
    return grid.map((row, i) => {
        return row.map((cell, j) => {
            return nextCellGeneration(grid, i, j)
        })
    })
}


