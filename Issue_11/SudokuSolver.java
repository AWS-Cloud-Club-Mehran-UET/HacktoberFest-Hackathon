import java.util.Scanner;
import java.io.File;

public class SudokuSolver {

    int[][] sudoku;
    String data;

    public SudokuSolver() {
        getPuzzle();
        solvePuzzle(0, 0);
    }

    private void getPuzzle() {
        try {
            Scanner in = new Scanner(new File("./sudoku.txt"));
            sudoku = new int[9][9];
            for (int y = 0; y < 9; y++) {
                for (int x = 0; x < 9; x++) {
                    data = in.next();
                    if (data.equals("."))
                        sudoku[x][y] = 0;
                    else
                        sudoku[x][y] = Integer.parseInt(data);
                }
            }
            in.close();
        } catch (Exception e) {

        }
        for (int y = 0; y < 9; y++) {

            for (int x = 0; x < 9; x++) {
                System.out.print(sudoku[x][y]);
                if (x == 2 || x == 5)
                    System.out.print("  ");
                if (x == 8) {
                    System.out.print("\n");
                }

            }
            if (y == 2 || y == 5) {
                System.out.println(" ");
            }
        }

    }

    private boolean isValid(int x, int y, int num) {
        int xSection = x / 3;
        int ySection = y / 3;

        for (int row = 0; row < sudoku.length; row++) {
            if (sudoku[row][y] == num) {
                return false;
            }
        }
        for (int col = 0; col < sudoku.length; col++) {
            if (sudoku[x][col] == num) {
                return false;
            }
        }

        for (int box = 3 * xSection; box < 3 * xSection + 3; box++) {
            for (int boxY = 3 * ySection; boxY < 3 * ySection + 3; boxY++) {
                if (sudoku[box][boxY] == num) {
                    return false;
                }
            }

        }
        return true;
    }

    private int xPosition(int x, int y) {
        if (x < 8) {
            return x + 1;
        } else {
            return 0;
        }
    }

    private int yPosition(int x, int y) {
        if (x < 8) {
            return y;
        } else {
            return y + 1;
        }
    }

    private boolean solvePuzzle(int x, int y) {
        if (x >= 9 || y >= 9) {

            return true;
        }

        else {
            for (int num = 1; num < 10; num++) {
                if (isValid(x, y, num)) {
                    sudoku[x][y] = num;
                    if (solvePuzzle(xPosition(x, y), yPosition(x, y))) {
                        return true;
                    } else {
                        sudoku[x][y] = 0;
                    }

                }

            }
            return false;
        }

    }

    public static void main(String args[]) {
        SudokuSolver solver = new SudokuSolver();
    }
}