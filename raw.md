#Sudoku Solver

##used Backtracking Algorithm

Solves a 9x9 Sudoku puzzle efficiently using backtracking.

Uses standard Sudoku rules for checking:

Each row must contain the numbers 1-9 without repetition.

Each column must contain the numbers 1-9 without repetition.

Each 3x3 sub-grid must contain the numbers 1-9 without repetition.


##Working
The algorithm works by using the backtracking technique:

1. It searches for an empty cell in the grid.

2. Tries placing numbers 1-9 in the empty cell.

3. After placing a number, it recursively tries to solve the rest of the grid.

4. If a conflict arises (row, column, or sub-grid clash), it backtracks by removing the number and trying the next one.

5. This process continues until the sudoku is solved



