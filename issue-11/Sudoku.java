public class Sudoku {
    static int n = 9;
    static boolean solved(int[][] grid, int row, int col) {
        if (row == n - 1 && col == n)
            return true;
        if (col == n) {
            row++;
            col = 0;
        }
        if (grid[row][col] != 0)
            return solved(grid, row, col + 1);
        for (int num = 1; num <= 9; num++) {
            if (safe(grid, row, col, num)) {
                grid[row][col] = num;

                if (solved(grid, row, col + 1))
                    return true;
            }
            grid[row][col] = 0;
        }
        return false;
    }
    static void print(int[][] grid) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(grid[i][j] + " ");
            }
            System.out.println();
        }
    }
    static boolean safe(int[][] grid, int row, int col, int num) {
        for (int x = 0; x < n; x++)
            if (grid[row][x] == num)
                return false;
        for (int x = 0; x < n; x++)
            if (grid[x][col] == num)
                return false;
        int startr = row - row % 3;
        int startc = col - col % 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (grid[i + startr][j + startc] == num)
                    return false;
        return true;
    }
    public static void main(String[] args) {
        int[][] grid = {
            { 5, 3, 0, 0, 7, 0, 0, 0, 0 },
            { 6, 0, 0, 1, 9, 5, 0, 0, 0 },
            { 0, 9, 8, 0, 0, 0, 0, 6, 0 },
            { 8, 0, 0, 0, 6, 0, 0, 0, 3 },
            { 4, 0, 0, 8, 0, 3, 0, 0, 1 },
            { 7, 0, 0, 0, 2, 0, 0, 0, 6 },
            { 0, 6, 0, 0, 0, 0, 2, 8, 0 },
            { 0, 0, 0, 4, 1, 9, 0, 0, 5 },
            { 0, 0, 0, 0, 8, 0, 0, 7, 9 }
        };
        if (solved(grid, 0, 0)) {
            print(grid);
        } else {
            System.out.println("No solution exists");
        }
    }
}
