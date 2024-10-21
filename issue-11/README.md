# Sudoku Solver

This project is a Java program designed to solve a standard 9x9 Sudoku puzzle. The puzzle is represented as a 2D array, where empty cells are indicated by the `.` character. The solution must comply with Sudoku rules, ensuring that each digit from 1-9 appears exactly once in each row, column, and 3x3 sub-box.

## Table of Contents
- [Problem Statement](#problem-statement)
- [Approach](#approach)
- [How To Run](#how-to-run)
- [Example Input](#example-input)
- [Example Output](#example-output)
- [Challenges Faced](#challenges-faced)
- [Conclusion](#conclusion)
- [License](#license)

## Problem Statement
The goal is to fill the empty cells of the Sudoku board, represented as a 2D array of characters, ensuring the following conditions:
1. Each digit 1-9 must occur exactly once in each row.
2. Each digit 1-9 must occur exactly once in each column.
3. Each digit 1-9 must occur exactly once in each of the 9 3x3 sub-boxes.

The input is guaranteed to have only one valid solution.

## Approach
To solve the Sudoku puzzle, the program employs a backtracking algorithm:
1. **Grid Representation**: The Sudoku board is represented as a 2D character array. The `.` character represents empty cells.
2. **Backtracking Logic**: 
   - The program recursively searches for the first empty cell (denoted by `.`).
   - For each empty cell, it attempts to place each digit from 1 to 9, checking if the placement is valid according to Sudoku rules.
   - If a valid number can be placed, it proceeds to the next empty cell. If it cannot fill the cell, it backtracks by resetting the cell and trying the next number.
3. **Safety Check**: A separate function checks whether placing a number in a particular cell violates any Sudoku rules.

## How To Run
1. Clone this repository or download the `Sudoku.java` file.
2. Compile the Java program:
    ```bash
    javac Sudoku.java
    ```
3. Run the program:
    ```bash
    java Sudoku
    ```

You can modify the input grid in the `main()` method with your own Sudoku puzzle.

## Example Input
Here is an example Sudoku board:

```java
String[][] board = {
    {"5", "3", ".", ".", "7", ".", ".", ".", "."},
    {"6", ".", ".", "1", "9", "5", ".", ".", "."},
    {".", "9", "8", ".", ".", ".", ".", "6", "."},
    {"8", ".", ".", ".", "6", ".", ".", ".", "3"},
    {"4", ".", ".", "8", ".", "3", ".", ".", "1"},
    {"7", ".", ".", ".", "2", ".", ".", ".", "6"},
    {".", "6", ".", ".", ".", ".", "2", "8", "."},
    {".", ".", ".", "4", "1", "9", ".", ".", "5"},
    {".", ".", ".", ".", "8", ".", ".", "7", "9"}
};
```

## Example Output
The program will solve the puzzle and print the solved grid as follows:

```
5 3 4 6 7 8 9 1 2 
6 7 2 1 9 5 3 4 8 
1 9 8 3 4 2 5 6 7 
8 5 9 7 6 1 4 2 3 
4 2 6 8 5 3 7 9 1 
7 1 3 9 2 4 8 5 6 
9 6 1 5 3 7 2 8 4 
2 8 7 4 1 9 6 3 5 
3 4 5 2 8 6 1 7 9
```

If no solution is possible, it will output:
```
No solution exists
```

## Challenges Faced
- **Challenge 1**: Handling invalid placements during the backtracking process.
  - **Solution**: Implemented a robust `safe` method to validate placements before recursion.
  
- **Challenge 2**: Ensuring the algorithm correctly handles multiple empty cells.
  - **Solution**: Used recursive calls to navigate through each empty cell systematically.

## Conclusion
The implemented backtracking algorithm effectively solves Sudoku puzzles while adhering to the rules of the game. The solution is efficient and tested against various scenarios to ensure reliability.
