### Hackathon Report: Sudoku Solver for Hacktoberfest - Team Lappucodes

*Project Overview:*
For the Hacktoberfest hackathon, our team Lappucodes was assigned the task of creating a program to solve a 9x9 Sudoku puzzle. The challenge required that each row, column, and 3x3 sub-grid contain the digits 1-9 exactly once, with the input containing empty cells represented by the '.' character.

*Challenges Faced:*

1. *Handling Empty Cells Efficiently:*
   The primary challenge was identifying an efficient way to fill in the empty cells without violating Sudoku’s constraints. As the board contained multiple empty spaces ('.'), the solution needed to backtrack when encountering invalid moves.
   
2. *Ensuring Uniqueness in Rows, Columns, and Sub-grids:*
   Ensuring that each number appears only once in each row, column, and 3x3 sub-grid required an approach that could quickly validate the placement of digits without recalculating too much data.

3. *Backtracking Optimization:*
   One of the issues we faced was determining when to backtrack. Without an efficient backtracking mechanism, the solver could get stuck trying invalid paths repeatedly, resulting in excessive computational time.

4. *Validating Input Constraints:*
   We needed to make sure that the program handled invalid input gracefully, ensuring the board dimensions were always 9x9 and the characters were either digits (1-9) or '.'.

*Algorithm Used:*
We implemented a *Backtracking Algorithm* to solve the Sudoku puzzle. Backtracking is a depth-first search algorithm that tries out different possibilities for empty cells and rolls back when a constraint is violated (i.e., when a number is repeated in the row, column, or sub-grid).

*Steps to Solve:*

1. *Find the Next Empty Cell:*
   We loop through the grid to locate an empty cell ('.'). Once we identify an empty cell, we attempt to fill it with a number from 1 to 9.

2. *Check if the Number is Valid:*
   For each number, we check if it can be placed in the current cell by ensuring it is not already present in the current row, column, and 3x3 sub-grid.

3. *Backtrack if Invalid:*
   If the number placement violates the Sudoku rules, we backtrack by resetting the cell to '.' and trying the next possible number.

4. *Recursive Solution:*
   Once a valid number is placed, the algorithm moves on to solve the next empty cell recursively. If we reach a point where no valid number can be placed, the algorithm backtracks to the previous step and tries a different number.

5. *Completion:*
   The recursion continues until all cells are filled, providing the solved Sudoku board as the output.

*Outcome:*
Using the backtracking algorithm, we successfully solved the provided Sudoku puzzles. The program adhered to the constraints of rows, columns, and sub-grids, ensuring the uniqueness of each number. Our solution was able to handle various test cases efficiently and returned the correct output for all scenarios.

*Conclusion:*
The Sudoku solver project was a valuable learning experience for our team. We tackled challenges related to recursion, backtracking, and constraint satisfaction. By using the backtracking algorithm, we were able to solve complex Sudoku puzzles effectively, contributing to the success of our Hacktoberfest project.
