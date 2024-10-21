

def solveSudoku(board):
    def isValid(board, row, col, num):
        #Checking row 
        for i in range(9):
            if board[row][i] == num:
                return False
        
        #Checking column
        for i in range(9):
            if board[i][col] == num:
                return False
        
        #Checking each sub box
        boxrow = (row // 3) * 3
        boxcol = (col // 3) * 3
        
        for i in range(3):
            for j in range(3):
                if board[boxrow + i][boxcol + j] == num:
                    return False
        
        return True


    def solve(board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == '.':
                    for num in map(str, range(1, 10)):  
                        if isValid(board, row, col, num):
                            board[row][col] = num
                            if solve(board):
                                return True


                         # Backtrack if no solution is found   
                            board[row][col] = '.'  
                    return False
        return True
    
    solve(board)
    return board

#Input Board
board = [["5","3",".",".","7",".",".",".","."],
         ["6",".",".","1","9","5",".",".","."],
         [".","9","8",".",".",".",".","6","."],
         ["8",".",".",".","6",".",".",".","3"],
         ["4",".",".","8",".","3",".",".","1"],
         ["7",".",".",".","2",".",".",".","6"],
         [".","6",".",".",".",".","2","8","."],
         [".",".",".","4","1","9",".",".","5"],
         [".",".",".",".","8",".",".","7","9"]]

solveSudoku(board)

# Output the solved board
for row in board:
    print(row)