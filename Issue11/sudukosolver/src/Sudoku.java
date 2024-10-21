public class Sudoku {

    static int N = 9;

    // Solve the Sudoku problem
    static boolean solveSudoku(int[][] grid, int row, int col) {

        if (row == N - 1 && col == N)
            return true;

        if (col == N) {
            row++;
            col = 0;
        }

        if (grid[row][col] != 0)
            return solveSudoku(grid, row, col + 1);

        for (int num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
                grid[row][col] = num;

                if (solveSudoku(grid, row, col + 1))
                    return true;
            }

            // Backtrack if solution is not found
            grid[row][col] = 0;
        }

        return false;
    }

    // function to print the grid
    static void print(int[][] grid) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(grid[i][j] + " ");
            System.out.println();
        }
    }

    // Check if placing the number in a given position is valid
    static boolean isSafe(int[][] grid, int row, int col, int num) {
        for (int x = 0; x < N; x++) {
            if (grid[row][x] == num || grid[x][col] == num)
                return false;
        }

        int startRow = row - row % 3, startCol = col - col % 3;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] == num)
                    return false;
            }
        }

        return true;
    }

    // Convert input 2D array of strings to 2D integer grid
    static int[][] convertStringArrayToGrid(String[][] input) {
        int[][] grid = new int[N][N];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                grid[i][j] = input[i][j].equals(".") ? 0 : Integer.parseInt(input[i][j]); // '.' represents empty cells
            }
        }
        return grid;
    }

    // Driver Code
    public static void main(String[] args) {
        // 2D array of strings representing the Sudoku grid where '.' is used for empty cells
        String[][] input = {{"5","3",".",".","7",".",".",".","."},
        {"6",".",".","1","9","5",".",".","."},
        {".","9","8",".",".",".",".","6","."},
        {"8",".",".",".","6",".",".",".","3"},
        {"4",".",".","8",".","3",".",".","1"},
        {"7",".",".",".","2",".",".",".","6"},
        {".","6",".",".",".",".","2","8","."},
        {".",".",".","4","1","9",".",".","5"},
        {".",".",".",".","8",".",".","7","9"}};

        int[][] grid = convertStringArrayToGrid(input);

        if (solveSudoku(grid, 0, 0))
            print(grid);
        else
            System.out.println("No Solution exists");
    }
}