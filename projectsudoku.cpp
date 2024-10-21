 #include <iostream>
#include <vector>

using namespace std;

class LappuCodesSudokuPremiumSolver {
public:
    void solveLappuSudoku(vector<vector<char>>& board) {
        solve(board);
    }

    void printBoard(const vector<vector<char>>& board) {
        for (const auto& row : board) {
            for (const auto& cell : row) {
                cout << cell << " ";
            }
            cout << endl;
        }
    }
private:
    bool solve(vector<vector<char>>& board) {
        for (int row = 0; row < 9; ++row) {
            for (int col = 0; col < 9; ++col) {
                if (board[row][col] == '.') {
                    for (char num = '1'; num <= '9'; ++num) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = '.';
                        }
                    }
return false;
                }
            }
        }
        return true;
    }

    bool isValid(vector<vector<char>>& board, int row, int col, char num) {
        for (int i = 0; i < 9; ++i) {
            if (board[row][i] == num || board[i][col] == num || 
                board[row / 3 * 3 + i / 3][col / 3 * 3 + i % 3] == num) {
                return false;
            }
        }
        return true;
    }
};
int main() {
    vector<vector<char>> board = {  
        {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
        {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
        {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
        {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
        {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
        {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
        {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
        {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
        {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
    };

    LappuCodesSudokuPremiumSolver solver;
    cout << "The given Sudoku Board by HacktoberFest:" << endl;
    solver.printBoard(board);
    solver.solveLappuSudoku(board);
    cout << "The Board LappuCodes solved:" << endl;
    solver.printBoard(board);
	return 0;
}