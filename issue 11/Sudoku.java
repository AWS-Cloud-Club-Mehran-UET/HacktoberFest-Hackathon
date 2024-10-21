import java.util.Scanner;

public class Sudoku {
    static int N = 9;
    static boolean solveSudoku(String grid[][], int R, int C)
    {
        if (R == N - 1 && C == N)
            return true;
        if (C == N) {
            R++;
            C = 0;
        }
        if (!grid[R][C].equals("."))
            return solveSudoku(grid, R, R + 1);
        for (int num = 1; num < 10; num++) {
              String  nums =Integer.toString(num);
            if (isSafe(grid, R, C, nums)) {
                grid[R][C] = nums;
                if (solveSudoku(grid, R, C + 1))
                    return true;
            }
            grid[R][C] =".";
        }
        return false;
    }
    static void print(int[][] grid)
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(grid[i][j] + " ");
            System.out.println();
        }
    }
    static boolean isSafe(String [][] grid, int R, int C, String num)
    {
        for (int x = 0; x <= 8; x++)
        {
            if (grid[R][x].equals(num))
                return false;
        }
        for (int x = 0; x <= 8; x++) {
            if (grid[x][C].equals(num))
                return false;
        }
        int startRow = R - R % 3, startCol
                = R - R % 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol].equals(num))
                    return false;
        return true;
    }
    public static String[][] takeBoardInput() {
        Scanner scanner = new Scanner(System.in);
        String[][] board = new String[9][9];
        System.out.println("Instructions");
        System.out.println("1: Enter the Sudoku board row by row (9x9)");
        System.out.println("2: Separate each value with space");
        System.out.println("3: Use '.' for empty cells \n\n");
        for (int i = 0; i < 9; i++) {
            System.out.println("Enter row " + (i + 1) + ":");
            String[] row = scanner.nextLine().split(" ");
            if (row.length != 9) {
                System.out.println("Invalid row input. Please enter exactly 9 elements.");
                i--;
            } else {
                board[i] = row;
            }
        }
        return board;
    }
    public static void displayBoard(String[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args)
    {
        String[][] board = new String[9][9];
        board = takeBoardInput();
        System.out.println("The Sudoku Board you entered is:");
        displayBoard(board);
        System.out.println();
        System.out.println("Solved Sudoku Board");
        if (solveSudoku(board, 0, 0))
            displayBoard(board);
        else
            System.out.println("No Solution exists");
    }
}