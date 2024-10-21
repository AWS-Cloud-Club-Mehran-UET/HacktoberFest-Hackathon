#include <iostream>
#include <vector>

using namespace std;

class Solution
{
public:
    // starting function of the class Solutiton where the pointer for board object(which is a 9x9 vector) is passed, in turn solve function is called with that board object
    void solveSudoku(vector<vector<char>> &board)
    {
        solve(board);
    }

private:
    // in this function all the rows are iterated in outer loop
    // in inner loop all the columns are iterated
    // then values that have . in them are checked because they are the ones that need to be solved
    // validity of all the values from 1 to 9 is checked at that place and whichever number is valid it is placed at that position
    bool solve(vector<vector<char>> &board)
    {
        for (int row = 0; row < 9; ++row)
        {
            for (int col = 0; col < 9; ++col)
            {
                if (board[row][col] == '.')
                {
                    for (char c = '1'; c <= '9'; ++c)
                    {
                        if (isValid(board, row, col, c))
                        {
                            board[row][col] = c;
                            if (solve(board))
                            {
                                return true;
                            }
                            else
                            {
                                board[row][col] = '.';
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    // 
    bool isValid(vector<vector<char>> &board, int row, int col, char c)
    {
        for (int i = 0; i < 9; ++i)
        {
            if (board[row][i] == c || board[i][col] == c ||
                board[row / 3 * 3 + i / 3][col / 3 * 3 + i % 3] == c)
            {
                return false;
            }
        }
        return true;
    }
};

int main()
{
    vector<vector<char>> board = {
        {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
        {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
        {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
        {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
        {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
        {'7', '.', '.', '.', '2', '.', '.', '.', '.'},
        {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
        {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
        {'.', '.', '.', '.', '8', '.', '.', '7', '9'}};

    Solution().solveSudoku(board);

    for (const auto &row : board)
    {
        for (const auto &cell : row)
        {
            cout << cell << " ";
        }
        cout << endl;
    }

    return 0;
}