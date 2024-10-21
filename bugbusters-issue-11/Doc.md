Sudoku Solver Documentation

1. Introduction

This project solves a 9x9 Sudoku puzzle using a backtracking algorithm.
The goal is to fill the grid such that each row, column, and 3x3 sub-grid
contains all digits from 1 to 9 exactly once.

2. Problem Description

A partially filled 9x9 grid is provided where empty cells are marked with .. The solution must:

	.	Ensure each row contains the digits 1-9 without repetition.
	.	Ensure each column contains the digits 1-9 without repetition.
	.	Ensure each 3x3 sub-grid contains the digits 1-9 without repetition.

3. Solution Overview

We use a backtracking approach to solve the puzzle:

	1.	Find empty cells (.).
	2.	Try numbers 1-9 for each empty cell.
	3.	Use a helper function to check if placing a number is valid.
	4.	Recursively attempt to solve the rest of the puzzle. If a number doesn’t work, backtrack and try another.

4. Code Structure

	•	isValid(board, row, col, num)
	         Checks if a number can be placed in a given cell by verifying the row, column, and 3x3 sub-grid.
	•	solve(board) 
	         Recursively fills the board using backtracking.

Example Code:
def solveSudoku(board):
    def isValid(board, row, col, num):
        # Code for validation
    def solve(board):
        # Code for backtracking
    solve(board)